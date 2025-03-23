import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateTwittDto {

    @ApiProperty({
            description: 'Here is going to be the content of the twitt',
        })
    @IsNotEmpty()
    @MinLength(3)
    @Transform(({ value }) => value.trim()) // Quita espacios antes de validar
    @IsString()
    content: string;

    @ApiProperty({
        description: 'Here is going to be the content of the twitt',
    })
    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    fullName:string;
}




