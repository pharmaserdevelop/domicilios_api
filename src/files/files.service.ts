import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as SFTPClient from 'ssh2-sftp-client';
import { ConfigService } from '@nestjs/config';
import path from 'path';

@Injectable()
export class FilesService {
  private sftp: SFTPClient;

  constructor(private configService: ConfigService) {
    this.sftp = new SFTPClient();
  }

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const host = this.configService.get<string>('SFTP_HOST');
    const port = this.configService.get<number>('SFTP_PORT');
    const user = this.configService.get<string>('SFTP_USER');
    const password = this.configService.get<string>('SFTP_PASSWORD');
    const remotePath = this.configService.get<string>('SFTP_PATH');

    const remoteFilePath = `${remotePath}/${folder}/${file.originalname}`;

    try {
      await this.sftp.connect({
        host,
        port,
        username: user,
        password,
      });

      await this.sftp.put(file.buffer, remoteFilePath);

      return file.originalname;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Could not upload file to SFTP server');
    } finally {
      await this.sftp.end();
    }
  }

  async downloadFile(filename: string): Promise<string> {
    const host = this.configService.get<string>('SFTP_HOST');
    const port = this.configService.get<number>('SFTP_PORT');
    const user = this.configService.get<string>('SFTP_USER');
    const password = this.configService.get<string>('SFTP_PASSWORD');
    const remotePath = this.configService.get<string>('SFTP_PATH');

    const tempPath = path.join(__dirname, '..', 'temp', filename); // Ruta temporal

    try {
      await this.sftp.connect({
        host,
        port,
        username: user,
        password,
      });

      // Verifica si el archivo existe en el SFTP
      const fileExists = await this.sftp.exists(`${remotePath}/${filename}`);
      if (!fileExists) {
        throw new Error('File not found on SFTP server');
      }

      // Descargar archivo desde SFTP
      await this.sftp.get(`${remotePath}/${filename}`, tempPath);

      return tempPath; // Retorna la ruta temporal del archivo
    } catch (error) {
      console.error('Error downloading file:', error);
      throw new InternalServerErrorException(
        'Could not download file from SFTP server',
      );
    } finally {
      await this.sftp.end();
    }
  }
}
