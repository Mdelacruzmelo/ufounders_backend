import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios, { AxiosInstance } from 'axios';
import { Client } from 'src/clients/entities/client.entity';
import { Client as ClientInterface } from './interfaces/client-response.interface';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<Client>
  ) { }

  private readonly axios: AxiosInstance = axios

  async seedDatabase() {

    // Fetch data
    const { data } = await this.axios.get<ClientInterface[]>(
      'https://6f7smj4fdc.execute-api.us-east-1.amazonaws.com/default/techJobMission'
    )
    if (!data)
      throw new InternalServerErrorException(
        `Could not fill the database. Please contact support`
      )

    // Clean table after i get the data
    this.clientModel.deleteMany()

    // Insert multiple clients
    this.clientModel.insertMany(data)

    return `Database reinitialized successfully`

  }

}
