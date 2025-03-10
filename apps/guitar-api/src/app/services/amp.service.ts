import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Amp } from '../schemas/amp.schema';
import { Knob } from '../schemas/knob.schema';
import { validateObjectId } from '../utils';

@Injectable()
export class AmpService {
  constructor(
    @InjectModel(Amp.name) private ampModel: Model<Amp>,
    @InjectModel(Knob.name) private knobModel: Model<Knob>
  ) {}

  async create(ampData: Amp): Promise<Amp> {
    return new this.ampModel({ ...ampData, knobs: ampData.knobs || [] }).save();
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
}
