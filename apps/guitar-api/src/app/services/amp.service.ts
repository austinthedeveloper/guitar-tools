import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Amp } from '../schemas/amp.schema';
import { Knob } from '../schemas/knob.schema';
import { AmpUsage } from '../schemas/amp-usage.schema';
import { validateObjectId } from '../utils';

@Injectable()
export class AmpService {
  constructor(
    @InjectModel(Amp.name) private ampModel: Model<Amp>,
    @InjectModel(Knob.name) private knobModel: Model<Knob>,
    @InjectModel(AmpUsage.name) private ampUsageModel: Model<AmpUsage>
  ) {}

  async create(ampData: any): Promise<Amp> {
    return new this.ampModel({ ...ampData, knobs: ampData.knobs || [] }).save();
  }
  async createAmpUsage(data: any): Promise<AmpUsage> {
    return new this.ampUsageModel(data).save();
  }

  async useAmp(id: string): Promise<AmpUsage> {
    const ampUsage = await this.ampUsageModel
      .findById(id)
      .populate('ampId')
      .exec();
    return ampUsage;
  }

  async findAllUsage(
    userId: string,
    populateUser = false
  ): Promise<AmpUsage[]> {
    const ampUsages: AmpUsage[] = await this.ampUsageModel
      .find({ createdById: userId })
      .populate('createdBy', 'displayName email')
      .exec();

    // ✅ Use Promise.all to fetch amp details separately
    const populatedAmpUsages = await Promise.all(
      ampUsages.map(async (usage) => {
        const amp = usage.ampId
          ? await this.ampModel.findById(usage.ampId).exec()
          : null;

        return {
          ...usage.toObject(),
          ampId: usage.ampId, // Keep ampId as a string
          amp: amp, // Attach full amp details
          knobValues: Object.fromEntries(usage.knobValues || new Map()),
        };
      })
    );

    return populatedAmpUsages;
  }

  async getAmpUsage(id: string, populateUser = false): Promise<AmpUsage> {
    const query = this.ampUsageModel.findOne({ _id: id });

    if (populateUser) {
      query.populate('createdBy', 'displayName email');
    }

    return query.exec();
  }

  async findAll(userId: string, populateUser = false): Promise<Amp[]> {
    const query = this.ampModel.find({ createdById: userId });

    if (populateUser) {
      query.populate('createdBy', 'displayName email'); // Only return displayName & email
    }

    return query.exec();
  }

  async findOne(id: string, populateUser = false): Promise<Amp> {
    const query = this.ampModel.findById(validateObjectId(id));

    if (populateUser) {
      query.populate('createdBy', 'displayName email');
    }

    return query.exec();
  }

  async update(id: string, ampData: any): Promise<Amp> {
    return this.ampModel.findByIdAndUpdate(id, ampData, { new: true }).exec();
  }

  async delete(id: string): Promise<Amp> {
    return this.ampModel.findByIdAndDelete(id).exec();
  }

  async getKnobs(): Promise<Knob[]> {
    return this.knobModel.find().exec();
  }
}
