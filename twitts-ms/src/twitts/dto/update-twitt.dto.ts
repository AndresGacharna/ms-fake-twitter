//import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateTwittDto } from './create-twitt.dto';

export class UpdateTwittDto extends PartialType(CreateTwittDto) {}
