import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ClientsModule]
})
export class SeedModule { }
