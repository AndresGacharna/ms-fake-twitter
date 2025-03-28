import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { error } from 'console';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService

  ){}


  async create(createUserDto: CreateUserDto) {
    
    try {

      const {password, ...userData}= createUserDto

      const user = this.userRepository.create({

        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user)

      delete user.password

      return {
        ...user,
        token: this.getJwtToken({id: user.id})
      };

      
    } catch (error) {
      this.handleDBErrors(error)
    }
  }


  async login(loginUserDto:LoginUserDto){

    const {password, email} = loginUserDto

    const user = await this.userRepository.findOne({
      where:{ email},
      select: {email: true, password:true, id:true}    //PARA REVISAR LA INFORMACION DEL PERFIL SE PUEDE HACER ESTO OJO REVISAR
    })

    if (!user)
      throw new UnauthorizedException('Credentials not valid')

    if(!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials not valid')
    console.log(user)
    return {
      ...user,
      token: this.getJwtToken({id: user.id})
    };

  }

  async getAllUsers(): Promise<User[]>{
    return await this.userRepository.find();

  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    if (updateUserDto.password){
      updateUserDto.password= bcrypt.hashSync(updateUserDto.password, 10);
    }
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto
    });

    if(!user) throw new NotFoundException(`User with id ${id} not found`);
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('dominó2')
    }
  }

  async getOneById(id: string): Promise<User | null> {
    if (!id) throw new BadRequestException(error);
    return await this.userRepository.findOneBy({ id:id });
  }
  

  private getJwtToken(payload: JwtPayload){
    console.log("payload a firmar:", payload)
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error:any):never{
    if(error.code === '23505')
      throw new BadRequestException(error.detail);

    console.log(error)

    throw new InternalServerErrorException('Please check server logs')
  }
}
