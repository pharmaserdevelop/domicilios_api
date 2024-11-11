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
import { UpdateDebtDto } from 'src/debts/dto/update-debt.dto';
import * as fs from 'fs';
import * as path from 'path';
import { UpdateAddressesDto } from 'src/addresses/dto/update-addresses.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('requests')
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
  @ApiOperation({ summary: 'Upload a signature' })
  @ApiResponse({
    status: 201,
    description: 'the signature has been successfully uploaded.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid  data.' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadSignature(
    @UploadedFile() file: Express.Multer.File,
    @Body('addressId') addressId: string,
  ) {
    if (!file) {
      return { message: 'No se recibió ningún archivo' };
    }
    const updateAddressesDto = new UpdateAddressesDto();
    updateAddressesDto.state_name = 'entregado';
    return this.requestsService.handleSignatureUpload(
      file,
      addressId,
      updateAddressesDto,
    );
  }

  @Post('upload/support')
  @ApiOperation({ summary: 'Upload a support addresses' })
  @ApiResponse({
    status: 201,
    description: 'the support has been successfully uploaded.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid data.' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadSupport(
    @UploadedFile() file: Express.Multer.File,
    @Body('addressId') addressId: string,
  ) {
    if (!file) {
      return { message: 'No se recibió ningún archivo' };
    }
    const updateAddressesDto = new UpdateAddressesDto();
    updateAddressesDto.state_name = 'entregado';
    return this.requestsService.handleSupportUpload(
      file,
      addressId,
      updateAddressesDto,
    );
  }

  @Post('upload/payment-support')
  @ApiOperation({ summary: 'Upload a support payment' })
  @ApiResponse({
    status: 201,
    description: 'the support payment has been successfully uploaded.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid  data.' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadPaymentSupport(
    @UploadedFile() file: Express.Multer.File,
    @Body('debtIds') debtIds: string[],
  ) {
    if (!file) {
      return { message: 'No se recibió ningún archivo' };
    }

    const updateDebtDto = new UpdateDebtDto();
    updateDebtDto.state_debt = 'saldada';

    return this.requestsService.handlePaymentSupportUpload(
      file,
      debtIds,
      updateDebtDto,
    );
  }

  @Post('upload/image')
  @ApiOperation({ summary: 'Upload an evidence' })
  @ApiResponse({
    status: 201,
    description: 'the evidence has been successfully uploaded.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid  data.' })
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

  @Get('images/support/:filename')
  @ApiOperation({ summary: 'Search a evidence' })
  @ApiResponse({
    status: 201,
    description: 'Evidence has been successfully found.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid  data.' })
  async serveImage(@Param('filename') filename: string, @Res() res: Response) {
    const remotePath = this.configService.get<string>('SFTP_PATH');
    const filePath = path.join(remotePath, 'SoporteDom', filename);
    const tempPath = path.join(__dirname, 'temp', filename);

    if (!fs.existsSync(path.dirname(tempPath))) {
      fs.mkdirSync(path.dirname(tempPath), { recursive: true });
    }

    try {
      await this.sftp.connect({
        host: this.configService.get<string>('SFTP_HOST'),
        port: this.configService.get<number>('SFTP_PORT'),
        username: this.configService.get<string>('SFTP_USER'),
        password: this.configService.get<string>('SFTP_PASSWORD'),
      });

      await this.sftp.get(filePath, tempPath);

      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
      res.setHeader('Content-Type', 'application/octet-stream');

      res.sendFile(tempPath, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          return res.status(500).send('Error sending file');
        } else {
          fs.unlink(tempPath, (unlinkErr) => {
            if (unlinkErr)
              console.error('Error deleting temporary file:', unlinkErr);
          });
        }
      });
    } catch (error) {
      console.error('Error connecting to SFTP:', error);
      return res.status(500).send('Error retrieving file');
    } finally {
      await this.sftp.end();
    }
  }

  @Get('images/signature/:filename')
  @ApiOperation({ summary: 'Search a signature' })
  @ApiResponse({
    status: 201,
    description: 'Signature has been successfully found.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid  data.' })
  async serveImageSignature(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const remotePath = this.configService.get<string>('SFTP_PATH');
    const filePath = path.join(remotePath, 'Firma', filename);
    const tempPath = path.join(__dirname, 'temp', filename);

    if (!fs.existsSync(path.dirname(tempPath))) {
      fs.mkdirSync(path.dirname(tempPath), { recursive: true });
    }

    try {
      await this.sftp.connect({
        host: this.configService.get<string>('SFTP_HOST'),
        port: this.configService.get<number>('SFTP_PORT'),
        username: this.configService.get<string>('SFTP_USER'),
        password: this.configService.get<string>('SFTP_PASSWORD'),
      });

      await this.sftp.get(filePath, tempPath);

      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
      res.setHeader('Content-Type', 'application/octet-stream');

      res.sendFile(tempPath, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          return res.status(500).send('Error sending file');
        } else {
          fs.unlink(tempPath, (unlinkErr) => {
            if (unlinkErr)
              console.error('Error deleting temporary file:', unlinkErr);
          });
        }
      });
    } catch (error) {
      console.error('Error connecting to SFTP:', error);
      return res.status(500).send('Error retrieving file');
    } finally {
      await this.sftp.end();
    }
  }

  @Get('images/payment/:filename')
  @ApiOperation({ summary: 'Search a payment support' })
  @ApiResponse({
    status: 201,
    description: 'Payment support has been successfully found.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid  data.' })
  async serveImageSoporte(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const remotePath = this.configService.get<string>('SFTP_PATH');
    const filePath = path.join(remotePath, 'SoportePago', filename);
    const tempPath = path.join(__dirname, 'temp', filename);

    if (!fs.existsSync(path.dirname(tempPath))) {
      fs.mkdirSync(path.dirname(tempPath), { recursive: true });
    }

    try {
      await this.sftp.connect({
        host: this.configService.get<string>('SFTP_HOST'),
        port: this.configService.get<number>('SFTP_PORT'),
        username: this.configService.get<string>('SFTP_USER'),
        password: this.configService.get<string>('SFTP_PASSWORD'),
      });

      await this.sftp.get(filePath, tempPath);

      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
      res.setHeader('Content-Type', 'application/octet-stream');

      res.sendFile(tempPath, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          return res.status(500).send('Error sending file');
        } else {
          fs.unlink(tempPath, (unlinkErr) => {
            if (unlinkErr)
              console.error('Error deleting temporary file:', unlinkErr);
          });
        }
      });
    } catch (error) {
      console.error('Error connecting to SFTP:', error);
      return res.status(500).send('Error retrieving file');
    } finally {
      await this.sftp.end();
    }
  }
}
