import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Pairing } from '../schemas/pairing.schema';
import { Amp, PedalBoard } from '../schemas';
import { AmpService } from './amp.service';
import { PedalService } from './pedal.service';
import { PedalboardService } from './pedalboard.service';

@Injectable()
export class PairingService {
  constructor(
    @InjectModel(Pairing.name) private pairingModel: Model<Pairing>,
    @InjectModel(PedalBoard.name) private pedalBoardModel: Model<PedalBoard>,
    @InjectModel(Amp.name) private ampModel: Model<Amp>,
    private ampService: AmpService,
    private pedalService: PedalService,
    private pedalboardService: PedalboardService
  ) {}

  /** ✅ Create a pairing between an amp and a pedalboard */
  async createPairing(payload: Pairing, createdById: string): Promise<Pairing> {
    const pairing = await new this.pairingModel({
      ...payload,
      createdById,
    }).save();

    return await this.populatedPairing(pairing);
  }

  async update(id: string, data: Pairing): Promise<Pairing> {
    const updatedItem = await this.pairingModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    return updatedItem ? this.populatedPairing(updatedItem) : null;
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
    const pedalboard = pairing.pedalboardId
      ? await this.pedalboardService.getPedalBoardById(pairing.pedalboardId)
      : null;
    const amp = pairing.ampId
      ? await this.ampService.findOne(pairing.ampId.toString())
      : null;
    const pairingObject: Pairing = pairing.toObject();
    const populatedPedals = await Promise.all(
      pairingObject.pedals.map(async (pedal) => {
        const pedalData = await this.pedalService.findOnePedal(
          pedal.pedalId.toString()
        );

        return {
          ...pedal, // ✅ Keep original pedal data
          pedal: pedalData || null, // ✅ Attach populated pedal data
          knobs: Object.fromEntries(pedal.knobs || new Map()), // ✅ Convert Map to Object
        };
      })
    );
    return {
      ...pairing.toObject(),
      pedalboard,
      amp,
      pedals: populatedPedals,
    };
  }

  /** ✅ Delete a pairing */
  async deletePairing(id: string, userId: string): Promise<Pairing> {
    return this.pairingModel
      .findOneAndDelete({ _id: id, createdById: userId })
      .exec();
  }
}
