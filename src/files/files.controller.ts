import { Controller, Get, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { Response } from 'express';
import * as fs from 'fs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorater';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Auth()
  @Get('preview/:filename')
  @ApiOperation({ summary: 'preview image of a file' })
  @ApiResponse({
    status: 201,
    description: 'Preview image successfully found',
  })
  async previewImage(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    try {
      const tempPath = await this.filesService.downloadFile(filename);

      res.sendFile(tempPath, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error al enviar la imagen');
        } else {
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
