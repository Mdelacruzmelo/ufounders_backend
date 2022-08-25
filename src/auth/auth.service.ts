import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt'

import { CreateUserDto } from './dto/create-user-dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {

    try {

      const { password } = createUserDto
      const user = this.userRepository.create({
        ...createUserDto,
        password: bcrypt.hashSync(password, 10)
      })

      await this.userRepository.save(user)
      delete user.password

      return user

    } catch (error) {

      console.log('~ error', error)
      this.handleDBErrors(error)

    }
  }

  private handleDBErrors(error: any): never {
    if (error.code === 11000) {
      throw new BadRequestException("Email already exists")
    }
    throw new InternalServerErrorException("Server error, please contact support.")
  }

}
