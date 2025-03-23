import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTwittDto } from './dto/create-twitt.dto';
import { UpdateTwittDto } from './dto/update-twitt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Twitt } from './entities/twitt.entity';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class TwittsService {
  constructor(
    @InjectRepository(Twitt)
    private readonly twittRepository: Repository<Twitt>,
  ){}
  async create(createTwittDto: CreateTwittDto) {

    try {
      const twitt = this.twittRepository.create({
        ...createTwittDto,
      });
      await this.twittRepository.save(twitt);
      return twitt;


    } catch (error) {
      throw new InternalServerErrorException('dominó')
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
  
    return await this.twittRepository
      .createQueryBuilder('twitt')
      .select([
        'twitt', // Selecciona todos los campos de Twitt
        'twitt.fullName'
      ])
      .take(limit)
      .skip(offset)
      .orderBy('twitt.createdAt', 'DESC') // Ordena por fecha de creación
      .getMany();
  }

  async findOne(term:string) {

    let twitt: Twitt;

    if(isUUID(term)){
      twitt = await this.twittRepository.findOneBy({twitt_id:term})
    } else{
      const queryBuilder = this.twittRepository.createQueryBuilder('tw');
      twitt = await queryBuilder
      .where(`content ILIKE :term`,{
        term: `%${term}%`
      }).getOne();
    }

    if (!twitt) 
      throw new NotFoundException(`Twitt with id ${term} not found`)
    return twitt;
  }

  async update(id: string, updateTwittDto: UpdateTwittDto) {

    const currentTimestamp: Date = new Date();
    const offset = 5; // Diferencia de +5 horas entre el sistema y PostgreSQL
    currentTimestamp.setHours(currentTimestamp.getHours() + offset);

    const twitt = await this.twittRepository.preload({
      twitt_id: id,
      EditedAt: currentTimestamp,
      ...updateTwittDto
    });

    if(!twitt) throw new NotFoundException(`Twitt with id ${id} not found`);
    try {
      return await this.twittRepository.save(twitt);
    } catch (error) {
      throw new InternalServerErrorException('dominó2')
    }
  }

  async remove(id: string) {
    const twitt = await this.findOne(id);
    await this.twittRepository.remove(twitt);

  }

  hello(object){
    
    if(object) return console.log('Recibí fase 2:', object);
    
    return console.log('Oppps algo salió mal')
    
  }
}
