import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { AddressessService } from 'src/addresses/addresses.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DebtsService } from 'src/debts/debts.service';
import { UpdateDebtDto } from 'src/debts/dto/update-debt.dto';
import { PaymentSupport } from 'src/payment-support/entities/payment-support.entity';
import { Repository } from 'typeorm';
import { Debt } from 'src/debts/entities/debt.entity';

@Injectable()
export class RequestsService {
  constructor(
    private readonly debtsService: DebtsService,
    private readonly filesService: FilesService,
    private readonly addressesService: AddressessService,
    @InjectRepository(PaymentSupport)
    private readonly paymentSupportsRepository: Repository<PaymentSupport>,
  ) {}
  async handleSignatureUpload(file: Express.Multer.File, addressId: string) {
    const filename = await this.filesService.uploadFile(file, 'Firma');
    await this.addressesService.updateSignature(addressId, filename);
    return { message: 'signature success', filename };
  }

  async handleSupportUpload(file: Express.Multer.File, addressId: string) {
    const filename = await this.filesService.uploadFile(file, 'SoporteDom');
    await this.addressesService.updateSupport(addressId, filename);
    return { message: 'support success', filename };
  }

  async handlePaymentSupportUpload(
    file: Express.Multer.File,
    debtIds: string[],
    updateDebtDto: UpdateDebtDto,
  ) {
    try {
      const filename = await this.filesService.uploadFile(file, 'SoportePago');

      // Itera sobre cada debtId y guarda la relación con el archivo
      for (const debtId of debtIds) {
        const debtExists = await this.debtsService.findDebtById(debtId);
        if (!debtExists) {
          throw new NotFoundException(
            `Deuda con ID "${debtId}" no encontrada.`,
          );
        }

        // Procede a crear el registro en payment_support
        const paymentSupport = this.paymentSupportsRepository.create({
          debt: { id: debtId } as Debt,
          nameFile: filename,
          dateUpload: new Date(),
        });

        await this.paymentSupportsRepository.save(paymentSupport);

        // Actualiza el estado de la deuda
        await this.debtsService.updateDebtsState(debtId, updateDebtDto);
      }

      return { message: 'Payment support uploaded successfully', filename };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Error handling payment support upload',
        error.message || error,
      );
    }
  }

  async handleImageUpload(file: Express.Multer.File, addressId: string) {
    const filename = await this.filesService.uploadFile(file, 'Imagenes');
    return { message: 'Image success', filename };
  }
}
