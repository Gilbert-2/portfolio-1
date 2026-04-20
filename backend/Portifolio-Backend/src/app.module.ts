import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { ContactModule } from './contact/contact.module';
import { ProjectsModule } from './projects/projects.module';
import { BlogModule } from './blog/blog.module';
import { ResumeModule } from './resume/resume.module';
import { HireModule } from './hire/hire.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AboutModule } from './about/about.module';
import { join, extname } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') !== 'production',
        ssl: false,
      }),
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 10,
        },
      ],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        index: false,
        redirect: false,
      },
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        storage: diskStorage({
          destination: (req, file, cb) => {
          
            const baseUploadPath = './uploads';
            
          
            let uploadPath = baseUploadPath;
            
            if (req.originalUrl.includes('/projects')) {
              uploadPath = join(baseUploadPath, configService.get('uploadPaths.projects', 'projects'));
            } else if (req.originalUrl.includes('/blog')) {
              uploadPath = join(baseUploadPath, configService.get('uploadPaths.blog', 'blog'));
            } else if (req.originalUrl.includes('/resume')) {
              uploadPath = join(baseUploadPath, configService.get('uploadPaths.resume', 'resume'));
            }
            
          
            if (!fs.existsSync(uploadPath)) {
              fs.mkdirSync(uploadPath, { recursive: true });
            }
            
            cb(null, uploadPath);
          },
          filename: (req, file, cb) => {
           
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            
            return cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
        fileFilter: (req, file, cb) => {
         
          const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
          if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
          } else {
            cb(new Error('Unsupported file type'), false);
          }
        },
        limits: {
          fileSize: 1024 * 1024 * 5, 
        },
      }),
    }),
    AuthModule,
    EmailModule,
    ContactModule,
    ProjectsModule,
    BlogModule,
    HireModule,
    ResumeModule,
    AnalyticsModule,
    DashboardModule,
    AboutModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}