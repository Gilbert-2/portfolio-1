// src/common/configs/multer.config.ts

import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';

export const multerConfig = {
  limits: {
    fileSize: 10 * 1024 * 1024, 
  },
  fileFilter: (req: any, file: any, cb: any) => {

    const allowedMimeTypes = [
      'image/jpeg', 
      'image/jpg', 
      'image/png', 
      'image/gif', 
      'application/pdf'
    ];
    
 
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type: ${file.mimetype}. Only jpg, jpeg, png, gif, and pdf are allowed.`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = './public/images/certificates';
      
      
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
      const extension = extname(file.originalname);
      cb(null, `certificate-${uniqueSuffix}${extension}`);
    },
  }),
};