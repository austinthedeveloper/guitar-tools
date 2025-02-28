import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Pairing } from '../schemas/pairing.schema';
import { Amp, PedalBoard } from '../schemas';

@Injectable()
export class PairingService {
  constructor(
    @InjectModel(Pairing.name) private pairingModel: Model<Pairing>,
    @InjectModel(PedalBoard.name) private pedalBoardModel: Model<PedalBoard>,
    @InjectModel(Amp.name) private ampModel: Model<Amp>
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
    const pairings: Pairing[] = await this.pairingModel
      .find({ createdById: userId })
      .populate('createdBy', 'displayName email')
      .exec();

    // ✅ Use Promise.all to resolve all async operations before returning the result
    const populatedPairings = await Promise.all(
      pairings.map(async (pairing) => {
        const pedalBoard = pairing.pedalBoardId
          ? await this.pedalBoardModel.findById(pairing.pedalBoardId).exec()
          : null;
        const amp = pairing.ampId
          ? await this.ampModel.findById(pairing.ampId).exec()
          : null;

        return {
          ...pairing.toObject(),
          pedalBoard,
          amp,
        };
      })
    );

    return populatedPairings;
  }

  /** ✅ Delete a pairing */
  async deletePairing(id: string, userId: string): Promise<Pairing> {
    return this.pairingModel
      .findOneAndDelete({ _id: id, createdById: userId })
      .exec();
  }
}
