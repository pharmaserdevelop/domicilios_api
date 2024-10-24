import { Controller, Get, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('preview/:filename')
  async previewImage(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    try {
      const tempPath = await this.filesService.downloadFile(filename);

      // Enviar archivo como respuesta
      res.sendFile(tempPath, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error al enviar la imagen');
        } else {
          // Eliminar archivo temporal después de enviar
          fs.unlink(tempPath, (unlinkErr) => {
            if (unlinkErr)
              console.error('Error al eliminar archivo temporal:', unlinkErr);
          });
        }
      });
    } catch (error) {
      console.error('Error en la descarga:', error);
      res.status(500).send(error.message);
    }
  }
}
