import { Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BaseService } from '../services';

export class BaseController<T> {
  constructor(private readonly service: BaseService<T>) {}

  @Post()
  create(@Body() data: Omit<T, '_id'>): Promise<T> {
    return this.service.create(data);
  }

  @Get()
  findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<T | null> {
    return this.service.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<T>): Promise<T | null> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<T | null> {
    return this.service.delete(id);
  }
}
