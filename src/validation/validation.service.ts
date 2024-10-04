import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class ValidationService {
  constructor() {}

  validateMinLength(value: string, minLength: number, fieldName: string): void {
    if (value.length < minLength) {
      throw new BadRequestException(
        `${fieldName} must have at least ${minLength} characters.`,
      );
    }
  }

  async validateEntityExists(
    repository: Repository<any>,
    id: number,
    entityName: string,
  ): Promise<void> {
    const entity = await repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`${entityName} con id ${id} not found.`);
    }
  }

  async validateUniqueField(
    repository: Repository<any>,
    fieldName: string,
    value: string,
    entityName: string,
  ): Promise<void> {
    const exists = await repository.findOne({ where: { [fieldName]: value } });
    if (exists) {
      throw new BadRequestException(
        `${entityName} with ${fieldName} "${value}"  exist.`,
      );
    }
  }

  async handleDBrrors(error: any) {
    if (error.errno === 1062) {
      throw new BadRequestException(error.sqlMessage);
      console.log(error);
      throw new InternalServerErrorException('Please check server error');
    }
  }
}
