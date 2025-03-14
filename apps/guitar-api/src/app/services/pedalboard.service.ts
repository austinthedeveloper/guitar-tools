import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PedalBoard } from '../schemas/pedal-board.schema';
import { Amp } from '../schemas/amp.schema';
import { BaseService } from './base-entity.service';
import { Pedal } from '../schemas';
import { PedalService } from './pedal.service';
import { AiPedalSettings } from '../models';

@Injectable()
export class PedalboardService extends BaseService<PedalBoard> {
  constructor(
    @InjectModel(PedalBoard.name)
    public readonly pedalBoardModel: Model<PedalBoard>,
    @InjectModel(Pedal.name) private pedalModel: Model<Pedal>,
    @InjectModel(Amp.name) private readonly ampModel: Model<Amp>,
    private pedalService: PedalService
  ) {
    super(pedalBoardModel);
  }

  protected async populateFields(pedalBoard: PedalBoard): Promise<PedalBoard> {
    const populatedPedals = await Promise.all(
      pedalBoard.pedals.map(async (entry) => {
        const pedal = entry.pedalId
          ? await this.pedalModel.findById(entry.pedalId).exec()
          : null;

        if (!pedal) {
          return null; // ✅ Skip null pedals
        }

        return {
          _id: entry._id,
          pedalId: entry.pedalId,
          order: entry.order,
          knobValues: entry.knobValues,
          pedal: pedal.toObject(), // ✅ Attach populated pedal data
        };
      })
    );

    // ✅ Filter out null values (deleted pedals)
    const filteredPedals = populatedPedals.filter((pedal) => pedal !== null);

    // ✅ Remove orphaned pedals **directly in MongoDB** (Avoids `VersionError`)
    await this.pedalBoardModel
      .findOneAndUpdate(
        { _id: pedalBoard._id },
        {
          $pull: {
            pedals: {
              pedalId: { $nin: populatedPedals.map((p) => p?.pedalId) },
            },
          },
        }, // Remove pedals not in populated list
        { new: true }
      )
      .exec();

    return {
      ...pedalBoard.toObject(),
      pedals: filteredPedals,
    };
  }

  /** ✅ Create a Pedal Board Setup */
  async createPedalBoard(
    name: string,
    createdById: string,
    pedals: {
      pedalId: string;
      order: number;
      knobValues: Record<string, number>;
    }[]
  ): Promise<PedalBoard> {
    const formattedPedals = pedals.map((pedal) => ({
      pedalId: new Types.ObjectId(pedal.pedalId),
      order: pedal.order,
      knobValues: pedal.knobValues,
    }));

    const newPedalBoard = await new this.pedalBoardModel({
      name,
      createdById,
      pedals: formattedPedals,
    }).save();

    return this.populateFields(newPedalBoard);
  }

  /** ✅ Get all Pedal Boards (Including Order) */
  async getPedalBoards(
    userId: string,
    populateUser = false
  ): Promise<PedalBoard[]> {
    let config = userId ? { createdById: userId } : {};

    const pedalBoards = await this.pedalBoardModel.find(config).exec();

    const populatedPedalBoards = await Promise.all(
      pedalBoards.map((pedalBoard) => this.populateFields(pedalBoard))
    );

    if (populateUser) {
      return this.pedalBoardModel.populate(populatedPedalBoards, {
        path: 'createdBy',
        select: 'displayName email',
      });
    }

    return populatedPedalBoards;
  }
  async getPedalBoardById(id: string): Promise<PedalBoard> {
    const pedalBoard = await this.pedalBoardModel.findById(id).exec();
    return this.populateFields(pedalBoard);
  }

  async addPedalToPedalboard(
    pairingId: string,
    pedalData: AiPedalSettings,
    userId: string
  ) {
    // Find existing pedal
    let pedal: Pedal = await this.pedalService.findPedalByName(
      userId,
      pedalData.name
    );

    // Create pedal if not found
    if (!pedal) {
      const mappedPedal = {
        name: pedalData.name,
        type: pedalData.type,
        knobs: Object.keys(pedalData.settings),
      } as Pedal;
      pedal = await this.pedalService.createPedal(mappedPedal, userId);
    }

    // Add to pedalboard
    return this.updatePedalboardWithPedal(
      pairingId,
      pedal._id as string,
      pedalData.settings
    );
  }
  async updatePedalboardWithPedal(
    pairingId: string,
    pedalId: string,
    knobValues: any
  ): Promise<PedalBoard> {
    const pedalBoard = await this.pedalBoardModel.findById(pairingId);

    if (!pedalBoard) {
      throw new Error('Pedalboard not found');
    }

    // Determine the order for the new pedal
    const maxOrder =
      pedalBoard.pedals.length > 0
        ? Math.max(...pedalBoard.pedals.map((p) => p.order))
        : 0;

    // Add the new pedal with an incremented order
    pedalBoard.pedals.push({
      pedalId: new Types.ObjectId(pedalId),
      order: maxOrder + 1,
      knobValues, // Default empty knob values, user can edit later
    });

    await pedalBoard.save();

    return this.populateFields(pedalBoard);
  }

  async deletePedalFromBoard(pedalboardId: string, pedalId: string) {
    await this.pedalBoardModel
      .updateOne(
        { _id: new Types.ObjectId(pedalboardId) },
        { $pull: { pedals: { _id: new Types.ObjectId(pedalId) } } }
      )
      .exec();
    return this.getPedalBoardById(pedalboardId);
  }
}
