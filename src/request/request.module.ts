import { Module } from '@nestjs/common';
import { RequestsService } from './request.service';
import { RequestsController } from './request.controller';
import { AddressessModule } from '../addresses/addresses.module';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [RequestsController],
  providers: [RequestsService],
  exports: [RequestsService],
  imports: [AddressessModule, FilesModule],
})
export class RequestModule {}
