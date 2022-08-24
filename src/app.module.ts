import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ClientsModule } from './clients/clients.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ClientsModule,
    MongooseModule.forRoot('mongodb+srv://mario:mario123456@ufounders-db.d72zqjx.mongodb.net/?retryWrites=true&w=majority'),
    SeedModule
  ],

})
export class AppModule { }
