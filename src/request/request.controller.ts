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

  @Post('upload/support')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSupport(
    @UploadedFile() file: Express.Multer.File,
    @Body('addressId') addressId: string,
  ) {
    if (!file) {
      return { message: 'No se recibió ningún archivo' };
    }
    return this.requestsService.handleSupportUpload(file, addressId);
  }

  @Post('upload/payment-support')
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

    // Llamada al método para manejar la carga y actualización
    return this.requestsService.handlePaymentSupportUpload(
      file,
      debtIds,
      updateDebtDto,
    );
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

  @Get('images/support/:filename')
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
          // Eliminar el archivo temporal después de enviarlo
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
