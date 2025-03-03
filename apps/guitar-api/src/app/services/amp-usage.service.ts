import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AmpUsage } from '../schemas/amp-usage.schema';
import { Amp } from '../schemas/amp.schema';
import { BaseService } from './base-entity.service';

@Injectable()
export class AmpUsageService extends BaseService<AmpUsage> {
  constructor(
    @InjectModel(AmpUsage.name) public readonly ampUsageModel: Model<AmpUsage>,
    @InjectModel(Amp.name) private readonly ampModel: Model<Amp>
  ) {
    super(ampUsageModel);
  }

  protected async populateFields(ampUsage: AmpUsage): Promise<any> {
    const amp = ampUsage.ampId
      ? await this.ampModel.findById(ampUsage.ampId).exec()
      : null;
    return {
      ...ampUsage.toObject(),
      ampId: ampUsage.ampId,
      amp,
      controlValues: Object.fromEntries(ampUsage.controlValues || new Map()),
    };
  }

  async findUserAmpUsages(userId: string): Promise<AmpUsage[]> {
    return this.findAll({ createdById: userId });
  }

  // ✅ Now we can simply call `findById(id)`
  async getAmpUsageById(id: string): Promise<AmpUsage | null> {
    return this.findById(id);
  }
}
