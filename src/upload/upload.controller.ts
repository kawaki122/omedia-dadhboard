import { Controller, Get, Param, Post, Query, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('upload')
export class UploadController {
    constructor(
    ) { }

    @Get(':name')
    getFile(@Param('name') name, @Res() res: Response) {
        try {
            if(name) {
                const file = createReadStream(join(process.cwd(), `./uploads/${name}`));
                file.pipe(res);
            } else {
                return ''
            }
        } catch (e) {
            return ''
        }
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads'
        })
    }))
    upload(@UploadedFile() file: Express.Multer.File) {
        console.log(file)
        return file.filename
    }
}
