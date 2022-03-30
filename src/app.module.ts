import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AnnouncementModule} from './announcement/announcement.module'
import { Announcement } from './announcement/announcement-entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "qwertyuiop",
      database: "annonces",
      entities: [Announcement],
      synchronize: true
  }),
    AnnouncementModule,
    MulterModule.register({
      dest : './files'
    })
  ],
})
export class AppModule {}
