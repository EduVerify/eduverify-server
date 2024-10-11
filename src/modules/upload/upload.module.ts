import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Define where to save the file
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const sanitizedOriginalName = file.originalname
            .split('.')[0]
            .replace(/\s+/g, '-'); // replace spaces with dashes
          const fileExt = extname(file.originalname);
          const fileName = `${sanitizedOriginalName}-${uniqueSuffix}${fileExt}`;
          callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
