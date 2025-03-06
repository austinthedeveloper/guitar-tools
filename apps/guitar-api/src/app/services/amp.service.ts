import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(ampData: Amp): Promise<Amp> {
    return new this.ampModel({ ...ampData, knobs: ampData.knobs || [] }).save();
  }

  async useAmp(id: string): Promise<AmpUsage> {
    const ampUsage = await this.ampUsageModel
      .findById(id)
      .populate('ampId')
      .exec();
    return ampUsage;
  }

  async createAmpUsage(data: AmpUsage): Promise<AmpUsage> {
    const ampUsage = await new this.ampUsageModel(data).save();
    return this.populateAmpUsage(ampUsage);
  }
  async findAllUsage(
    userId: string,
    populateUser = false
  ): Promise<AmpUsage[]> {
    const ampUsages: AmpUsage[] = await this.ampUsageModel
      .find({ createdById: userId })
      .populate(populateUser ? 'createdBy' : '') // Optional user population
      .exec();

    return Promise.all(ampUsages.map((usage) => this.populateAmpUsage(usage)));
  }
  async updateAmpUsage(id: string, data: AmpUsage): Promise<AmpUsage> {
    const updatedUsage = await this.ampUsageModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updatedUsage) throw new NotFoundException('Amp Usage not found');

    return this.populateAmpUsage(updatedUsage);
  }

  async getAmpUsage(id: string, populateUser = false): Promise<AmpUsage> {
    const query = this.ampUsageModel.findOne({ _id: id });

    if (populateUser) {
      query.populate('createdBy', 'displayName email');
    }

    return query.exec();
  }
  private async populateAmpUsage(ampUsage: AmpUsage): Promise<any> {
    const amp = ampUsage.ampId
      ? await this.ampModel.findById(ampUsage.ampId).exec()
      : null;
    return {
      ...ampUsage.toObject(),
      ampId: ampUsage.ampId, // Ensure ampId stays as a string
      amp, // Attach populated amp
    };
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

  async update(id: string, ampData: Amp): Promise<Amp> {
    return this.ampModel
      .findByIdAndUpdate(
        id,
        { ...ampData, knobs: ampData.knobs },
        { new: true }
      )
      .exec();
  }

  async delete(id: string): Promise<Amp> {
    return this.ampModel.findByIdAndDelete(id).exec();
  }

  async getKnobs(): Promise<Knob[]> {
    return this.knobModel.find().exec();
  }
}
