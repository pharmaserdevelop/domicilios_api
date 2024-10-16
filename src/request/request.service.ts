import { Injectable } from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { AddressessService } from 'src/addresses/addresses.service';

@Injectable()
export class RequestsService {
  constructor(
    private readonly filesService: FilesService,
    private readonly addressesService: AddressessService,
  ) {}
  async handleSignatureUpload(file: Express.Multer.File, addressId: string) {
    const filename = await this.filesService.uploadFile(file, 'SoporteDom');
    await this.addressesService.updateSignature(addressId, filename);
    return { message: 'signature success', filename };
  }

  async handleImageUpload(file: Express.Multer.File, addressId: string) {
    const filename = await this.filesService.uploadFile(file, 'Imagenes');
    return { message: 'Image success', filename };
  }
}
