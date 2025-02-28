import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Pairing } from '../schemas/pairing.schema';

@Injectable()
export class PairingService {
  constructor(
    @InjectModel(Pairing.name) private pairingModel: Model<Pairing>
  ) {}

  /** ✅ Create a pairing between an amp and a pedalboard */
  async createPairing(
    ampId: string,
    pedalBoardId: string,
    createdById: string
  ): Promise<Pairing> {
    return new this.pairingModel({
      ampId: new Types.ObjectId(ampId),
      pedalBoardId: new Types.ObjectId(pedalBoardId),
      createdById,
    }).save();
  }

  /** ✅ Get all pairings for a user */
  async getPairings(userId: string): Promise<Pairing[]> {
    return this.pairingModel
      .find({ createdById: userId })
      .populate('ampId pedalBoardId')
      .exec();
  }

  /** ✅ Delete a pairing */
  async deletePairing(id: string, userId: string): Promise<Pairing> {
    return this.pairingModel
      .findOneAndDelete({ _id: id, createdById: userId })
      .exec();
  }
}
