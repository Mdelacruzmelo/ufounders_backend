import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'
import { ClientsModule } from './clients/clients.module';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule,
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_CONNECTION_STRING,
      database: process.env.MONGODB_DATABASE,
      useUnifiedTopology: true,
      autoLoadEntities: true,
      synchronize: true,
    }),
    SeedModule,
    CommonModule,
    AuthModule
  ],

})
export class AppModule { }
