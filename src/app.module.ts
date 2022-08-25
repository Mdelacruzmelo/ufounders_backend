import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'
import { ClientsModule } from './clients/clients.module';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.USER}:${process.env.PASS}@ufounders-db.d72zqjx.mongodb.net/?retryWrites=true&w=majority`
    ),
    SeedModule,
    CommonModule
  ],

})
export class AppModule { }
