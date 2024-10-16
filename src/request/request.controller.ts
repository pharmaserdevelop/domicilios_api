import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequestsService } from './request.service';
import { Response } from 'express';

import { ConfigService } from '@nestjs/config';
import * as SFTPClient from 'ssh2-sftp-client';
@Controller('requests')
export class RequestsController {
  private sftp: SFTPClient;
  constructor(
    private readonly requestsService: RequestsService,
    private configService: ConfigService,
  ) {
    this.sftp = new SFTPClient();
  }
  @Post('upload/signature')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSignature(
    @UploadedFile() file: Express.Multer.File,
    @Body('addressId') addressId: string,
  ) {
    if (!file) {
      return { message: 'No se recibió ningún archivo' };
    }
    return this.requestsService.handleSignatureUpload(file, addressId);
  }

  @Post('upload/image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('addressId') addressId: string,
  ) {
    if (!file) {
      return { message: 'No se recibió ningún archivo' };
    }
    return this.requestsService.handleImageUpload(file, addressId);
  }

  @Get('images/:filename')
  async serveImage(@Param('filename') filename: string, @Res() res: Response) {
    const remotePath = this.configService.get<string>('SFTP_PATH');
    const filePath = `${remotePath}/${filename}`;
    try {
      await this.sftp.connect({
        host: this.configService.get<string>('SFTP_HOST'),
        port: this.configService.get<number>('SFTP_PORT'),
        username: this.configService.get<string>('SFTP_USER'),
        password: this.configService.get<string>('SFTP_PASSWORD'),
      });

      const fileBuffer = await this.sftp.get(filePath);

      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
      res.setHeader('Content-Type', 'application/octet-stream');

      res.send(fileBuffer);
    } catch (error) {
      console.error('Error connecting to SFTP:', error);
      return res.status(500).send('Error retrieving file');
    } finally {
      await this.sftp.end();
    }
  }
}
