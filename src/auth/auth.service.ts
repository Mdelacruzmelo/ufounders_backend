import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

import { LoginUserDto, CreateUserDto } from './dto';
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

  async login(loginUserDto: LoginUserDto) {

    try {

      const { password, email } = loginUserDto

      const user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true }
      })

      if (!user) {
        throw new UnauthorizedException("Credentials not valid")
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException("Credentials not valid")
      }

      delete user.username
      delete user.id
      // TODO: Crear la token

      return user

    } catch (error) {
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
