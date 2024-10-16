import { Injectable } from '@nestjs/common';
import * as SFTPClient from 'ssh2-sftp-client';
import { ConfigService } from '@nestjs/config';

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
}
