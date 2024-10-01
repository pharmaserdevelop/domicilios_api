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
        `${fieldName} debe tener al menos ${minLength} caracteres.`,
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
      throw new NotFoundException(`${entityName} con id ${id} no encontrado.`);
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
        `${entityName} con ${fieldName} "${value}" ya existe.`,
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
