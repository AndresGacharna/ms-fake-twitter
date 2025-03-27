import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRetweetDto } from './dto/create-retweet.dto';
import { Retweet } from './entities/retweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class RetweetsService {
  constructor(
    @InjectRepository(Retweet)
    private readonly retweetRepository: Repository<Retweet>
  ){}

  async create(createRetweetDto:CreateRetweetDto) {
    try {
      const retweet= this.retweetRepository.create({
        ...createRetweetDto,
      });

      await this.retweetRepository.save(retweet);
      return retweet;

    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findAll(paginationDto:PaginationDto) {
    const {limit=10, offset=0} = paginationDto;

    return this.retweetRepository.find({
      take: limit,
      skip: offset
    })

  }

  async findOne(id:string) {
    
        let retweet: Retweet;
    
        retweet = await this.retweetRepository.findOneBy({idTwitt:id})
    
        if (!retweet) 
          throw new NotFoundException(`Twitt with id ${id} not found`)
        return retweet;
      }


    async findUserRetweets(id: string, paginationDto: PaginationDto) {
      const { limit = 10, offset = 0 } = paginationDto;
    
      return this.retweetRepository.find({
        where: { id: id }, // Filtra los retweets por usuario
        take: limit,
        skip: offset,
        order: { createdAt: 'DESC' }
      });
    }
  
  async countRetweets(id: string): Promise<number> {
    
    const count = await this.retweetRepository
      .createQueryBuilder('tw')
      .where('tw.idTwitt = :id', { id })  // Usamos :id como parámetro seguro
      .getCount();  // Contamos los registros que coinciden
    
    if (count === 0) 
      return 0;
    
    return count;
  }
      

  async remove(id: string) {
    const retweet= await this.findOne(id);
    await this.retweetRepository.remove(retweet);
  }


  private handleDBErrors(error:any):never{
    if(error.code === '23505')
      throw new BadRequestException(error.detail);

    console.log(error)

    throw new InternalServerErrorException('Please check server logs')
  }
}
