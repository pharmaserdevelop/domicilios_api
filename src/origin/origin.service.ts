import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOriginDto } from './dto/create-origin.dto';
import { UpdateOriginDto } from './dto/update-origin.dto';
import { Origin } from './entities/origin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OriginService {
  constructor(
    @InjectRepository(Origin)
    private readonly originRepository: Repository<Origin>,
  ) {}

  async create(createOriginDto: CreateOriginDto): Promise<Origin> {
    try {
      const originEntity = this.originRepository.create(createOriginDto);
      return await this.originRepository.save(originEntity);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Failed to create origin',
        error.message,
      );
    }
  }

  async findAll(): Promise<Origin[]> {
    return await this.originRepository.find();
  }

  async findOne(originId: string): Promise<Origin> {
    const origin = await this.originRepository.findOne({
      where: { id: originId },
    });

    if (!origin) {
      throw new NotFoundException(`Origin with ID ${originId} not found`);
    }

    return origin;
  }

  async update(
    originId: string,
    updateOriginDto: UpdateOriginDto,
  ): Promise<Origin> {
    const origin = await this.findOne(originId);
    Object.assign(origin, updateOriginDto);

    try {
      return await this.originRepository.save(origin);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Failed to update origin',
        error.message,
      );
    }
  }

  async remove(originId: string): Promise<void> {
    const result = await this.originRepository.delete(originId);

    if (result.affected === 0) {
      throw new NotFoundException(`Origin with ID ${originId} not found`);
    }
  }
}
