import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PedalBoard } from '../schemas/pedal-board.schema';
import { Amp } from '../schemas/amp.schema';
import { BaseService } from './base-entity.service';
import { Pedal } from '../schemas';

@Injectable()
export class PedalboardService extends BaseService<PedalBoard> {
  constructor(
    @InjectModel(PedalBoard.name)
    public readonly pedalBoardModel: Model<PedalBoard>,
    @InjectModel(Pedal.name) private pedalModel: Model<Pedal>,
    @InjectModel(Amp.name) private readonly ampModel: Model<Amp>
  ) {
    super(pedalBoardModel);
  }

  protected async populateFields(pedalBoard: PedalBoard): Promise<PedalBoard> {
    const populatedPedals = await Promise.all(
      pedalBoard.pedals.map(async (entry) => {
        const pedal = entry.pedalId
          ? await this.pedalModel.findById(entry.pedalId).exec()
          : null;

        return {
          pedalId: entry.pedalId, // Keep original ID
          order: entry.order,
          knobValues: entry.knobValues,
          pedal: pedal.toObject(), // ✅ Attach populated pedal data
        };
      })
    );

    return {
      ...pedalBoard.toObject(),
      pedals: populatedPedals,
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
}
