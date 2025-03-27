import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator";

export class CreateCommentDto {

    @ApiProperty({
            description: 'Here is going to be the content of the twitt',
        })
    @IsNotEmpty()
    @MinLength(3)
    @Transform(({ value }) => value.trim()) // Quita espacios antes de validar
    @IsString()
    content: string;

    @ApiProperty({
        description: 'Here is the Twitt ID',
    })
    
    @IsUUID()
    @IsNotEmpty()
    @IsString()
    idTwitt: string;

    @ApiProperty({
        description: 'Here is going to be the name of the user',
    })
    @IsNotEmpty()
    @IsUUID()
    id:string;

    
}

