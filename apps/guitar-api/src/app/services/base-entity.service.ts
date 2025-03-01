import { Model, FilterQuery } from 'mongoose';

export class BaseService<T> {
  constructor(private readonly model: Model<T>) {}

  // Override in child services for population logic
  protected async populateFields(entity: T): Promise<any> {
    return entity;
  }

  async create(data: any): Promise<T> {
    const item = (await new this.model(data).save()) as T;
    return this.populateFields(item);
  }

  async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
    const items = await this.model.find(filter).exec();
    return Promise.all(items.map((item) => this.populateFields(item)));
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    const item = await this.model.findOne(filter).exec();
    return item ? this.populateFields(item) : null;
  }

  // ✅ New findById method (simplifies queries by _id)
  async findById(id: string): Promise<T | null> {
    const item = await this.model.findById(id).exec();
    return item ? this.populateFields(item) : null;
  }

  async update(id: string, data: any): Promise<T | null> {
    const updatedItem = await this.model
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    return updatedItem ? this.populateFields(updatedItem) : null;
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
