import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
  async findAllPedals(): Promise<Pedal[]> {
    return this.pedalModel.find().exec();
  }

  /** ✅ Get a single Pedal by ID */
  async findOnePedal(id: string): Promise<Pedal> {
    return this.pedalModel.findById(id).exec();
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
    pedals: {
      pedalId: string;
      order: number;
      knobValues: Record<string, number>;
    }[]
  ): Promise<PedalBoard> {
    const pedalBoard = new this.pedalBoardModel({ name, pedals });
    return pedalBoard.save();
  }

  /** ✅ Get all Pedal Boards (Including Order) */
  async getPedalBoards(): Promise<PedalBoard[]> {
    return this.pedalBoardModel.find().populate('pedals.pedalId').exec();
  }
}
