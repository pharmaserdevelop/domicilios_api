import { Injectable } from '@nestjs/common';
import { CreateUserOriginDto } from './dto/create-user-origin.dto';
import { UpdateUserOriginDto } from './dto/update-user-origin.dto';

@Injectable()
export class UserOriginService {
  create(createUserOriginDto: CreateUserOriginDto) {
    return 'This action adds a new userOrigin';
  }

  findAll() {
    return `This action returns all userOrigin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userOrigin`;
  }

  update(id: number, updateUserOriginDto: UpdateUserOriginDto) {
    return `This action updates a #${id} userOrigin`;
  }

  remove(id: number) {
    return `This action removes a #${id} userOrigin`;
  }
}
