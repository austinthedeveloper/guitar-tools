import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Amp } from '../schemas/amp.schema';
import { Knob } from '../schemas/knob.schema';
import { AmpUsage } from '../schemas/amp-usage.schema';

@Injectable()
export class AmpService {
  constructor(
    @InjectModel(Amp.name) private ampModel: Model<Amp>,
    @InjectModel(Knob.name) private knobModel: Model<Knob>,
    @InjectModel(Knob.name) private ampUsageModel: Model<AmpUsage>
  ) {}

  async create(ampData: any): Promise<Amp> {
    return new this.ampModel({ ...ampData, knobs: ampData.knobs || [] }).save();
  }

  async useAmp(ampUsageData: any): Promise<AmpUsage> {
    return new this.ampUsageModel(ampUsageData).save();
  }

  async findAll(): Promise<Amp[]> {
    return this.ampModel.find().exec();
  }

  async findOne(id: string): Promise<Amp> {
    return this.ampModel.findById(id).exec();
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
