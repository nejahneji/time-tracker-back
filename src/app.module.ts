import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Period } from './entities/Period';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'tracker',
      entities: [Period],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Period]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
