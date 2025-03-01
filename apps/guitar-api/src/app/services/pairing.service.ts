import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Pairing } from '../schemas/pairing.schema';
import { Amp, AmpUsage, PedalBoard } from '../schemas';
import { AmpService } from './amp.service';

@Injectable()
export class PairingService {
  constructor(
    @InjectModel(Pairing.name) private pairingModel: Model<Pairing>,
    @InjectModel(PedalBoard.name) private pedalBoardModel: Model<PedalBoard>,
    @InjectModel(Amp.name) private ampModel: Model<Amp>,
    @InjectModel(AmpUsage.name) private ampUsageModel: Model<AmpUsage>,
    private ampService: AmpService
  ) {}

  /** ✅ Create a pairing between an amp and a pedalboard */
  async createPairing(
    ampUsageId: string,
    pedalBoardId: string,
    createdById: string
  ): Promise<Pairing> {
    const pairing = await new this.pairingModel({
      ampUsageId: new Types.ObjectId(ampUsageId),
      pedalBoardId: new Types.ObjectId(pedalBoardId),
      createdById,
    }).save();
    return await this.populatedPairing(pairing);
  }

  /** ✅ Get all pairings for a user */
  async getPairings(userId: string): Promise<Pairing[]> {
    const pairings: Pairing[] = await this.pairingModel
      .find({ createdById: userId })
      .populate('createdBy', 'displayName email')
      .exec();

    // ✅ Use Promise.all to resolve all async operations before returning the result
    const populatedPairings = await Promise.all(
      pairings.map(async (pairing) => this.populatedPairing(pairing))
    );

    return populatedPairings;
  }

  async getPairing(pairingId: string): Promise<Pairing> {
    const pairing: Pairing = await this.pairingModel
      .findOne({ _id: pairingId })
      .populate('createdBy', 'displayName email')
      .exec();

    // ✅ Use Promise.all to resolve all async operations before returning the result
    return await this.populatedPairing(pairing);
  }

  async populatedPairing(pairing: Pairing): Promise<Pairing> {
    const pedalBoard = pairing.pedalBoardId
      ? await this.pedalBoardModel.findById(pairing.pedalBoardId).exec()
      : null;
    const ampUsage = pairing.ampUsageId
      ? await this.ampService.getAmpUsage(pairing.ampUsageId.toString())
      : null;

    return {
      ...pairing.toObject(),
      pedalBoard,
      ampUsage,
    };
  }

  /** ✅ Delete a pairing */
  async deletePairing(id: string, userId: string): Promise<Pairing> {
    return this.pairingModel
      .findOneAndDelete({ _id: id, createdById: userId })
      .exec();
  }
}
