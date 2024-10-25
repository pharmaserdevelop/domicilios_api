import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserOriginService } from './user-origin.service';
import { CreateUserOriginDto } from './dto/create-user-origin.dto';
import { UpdateUserOriginDto } from './dto/update-user-origin.dto';

@Controller('user-origin')
export class UserOriginController {
  constructor(private readonly userOriginService: UserOriginService) {}

  @Post()
  create(@Body() createUserOriginDto: CreateUserOriginDto) {
    return this.userOriginService.create(createUserOriginDto);
  }

  @Get()
  findAll() {
    return this.userOriginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userOriginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserOriginDto: UpdateUserOriginDto) {
    return this.userOriginService.update(+id, updateUserOriginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userOriginService.remove(+id);
  }
}
