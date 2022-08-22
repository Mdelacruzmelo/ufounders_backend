import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    ClientsModule,
    MongooseModule.forRoot('mongodb+srv://mario:mario123456@ufounders-db.d72zqjx.mongodb.net/?retryWrites=true&w=majority')
  ],

})
export class AppModule { }
