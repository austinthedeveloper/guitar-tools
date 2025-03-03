import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PedalUsage } from '../schemas';
import { Pedal } from '../schemas/pedal.schema';

@Injectable()
export class PedalService {
  constructor(
    @InjectModel(Pedal.name) private pedalModel: Model<Pedal>,
    @InjectModel(PedalUsage.name) private pedalUsageModel: Model<PedalUsage>
  ) {}

  async createPedal(createPedalDto: any, userId: string) {
    try {
      const pedal = new this.pedalModel({
        ...createPedalDto,
        knobs: createPedalDto.knobs || [],
        createdById: userId,
      });
      return await pedal.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('You have already created this pedal');
      }
      throw error;
    }
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

  async findAllPedalUsage(
    userId: string,
    populateUser = false
  ): Promise<PedalUsage[]> {
    let config = userId ? { createdById: userId } : {};
    const query = this.pedalUsageModel.find(config);
    if (populateUser) {
      query.populate('createdBy', 'displayName email');
    }

    return query.exec();
  }

  async createPedalUsage(dto: any, createdById: string): Promise<PedalUsage> {
    const pedal = await this.pedalModel.findById(dto.pedalId);
    if (!pedal) throw new NotFoundException('Pedal not found');

    const pedalUsage = new this.pedalUsageModel({
      name: dto.name,
      pedalId: dto.pedalId,
      knobs: dto.knobs,
      createdById,
    });

    return pedalUsage.save();
  }
}
