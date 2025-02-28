import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Pedal } from '../schemas/pedal.schema';
import { PedalBoard } from '../schemas/pedal-board.schema';

@Injectable()
export class PedalService {
  constructor(
    @InjectModel(Pedal.name) private pedalModel: Model<Pedal>,
    @InjectModel(PedalBoard.name) private pedalBoardModel: Model<PedalBoard>
  ) {}

  /** ✅ Create a new Pedal (Base configuration, no values) */
  async createPedal(pedalData: any): Promise<Pedal> {
    return new this.pedalModel({
      ...pedalData,
      knobs: pedalData.knobs || [],
    }).save();
  }

  /** ✅ Get all Pedals */
  async findAllPedals(userId: string, populateUser = false): Promise<Pedal[]> {
    let config = userId ? { createdById: userId } : {};
    const query = this.pedalModel.find(config);
    if (populateUser) {
      query.populate('createdBy', 'displayName email');
    }

    return query.exec();
  }

  /** ✅ Get a single Pedal by ID */
  async findOnePedal(id: string, populateUser = false): Promise<Pedal> {
    const query = this.pedalModel.findOne({ _id: id });

    if (populateUser) {
      query.populate('createdBy', 'displayName email');
    }

    return query.exec();
  }

  /** ✅ Update a Pedal (only updates knob names, not values) */
  async updatePedal(id: string, pedalData: any): Promise<Pedal> {
    return this.pedalModel
      .findByIdAndUpdate(id, pedalData, { new: true })
      .exec();
  }

  /** ✅ Delete a Pedal */
  async deletePedal(id: string): Promise<Pedal> {
    return this.pedalModel.findByIdAndDelete(id).exec();
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

    return new this.pedalBoardModel({
      name,
      createdById,
      pedals: formattedPedals,
    }).save();
  }

  /** ✅ Get all Pedal Boards (Including Order) */
  async getPedalBoards(
    userId: string,
    populateUser = false
  ): Promise<PedalBoard[]> {
    let config = userId ? { createdById: userId } : {};

    const query = this.pedalBoardModel.find(config).populate({
      path: 'pedals.pedalId',
      model: 'Pedal', // Ensure this is correct
    });
    if (populateUser) {
      query.populate('createdBy', 'displayName email');
    }

    return query.exec();
  }
}
