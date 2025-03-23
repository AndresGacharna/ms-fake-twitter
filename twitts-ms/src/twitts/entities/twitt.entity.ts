import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Twitt {

    @ApiProperty({
        example: "550e8400-e29b-41d4-a716-446655440000",
        description: "Identificador único del tweet",
        format: "uuid"
    })
    @PrimaryGeneratedColumn('uuid')
    twitt_id: string;

    @ApiProperty({
        example: "Este es mi primer tweet!",
        description: "Contenido del tweet",
        minLength: 1
    })
    @Column('text', {
        nullable: false
    })
    content: string;

    @ApiProperty({
        example: "2024-02-21T15:30:00Z",
        description: "Fecha y hora en que se creó el tweet",
        type: String
    })
    @CreateDateColumn({ type: 'timestamp', precision: 0 }) // el timestamp es para tiempo más exacto diferente a date
    createdAt: Date;

    @ApiProperty({
        example: "2024-02-21T15:30:00Z",
        description: "Fecha y hora en que se edita el tweet",
        type: String
    })
    @Column({ type: 'timestamp', precision: 0, nullable: true, default: null })
    EditedAt: Date | null;


    @ApiProperty({
        example: false,
        description: "Indica si el tweet ha sido editado o no",
        default: false
    })
    @Column('bool', {
        default: false
    })
    isEdited: boolean;

    @Column('text', {
        nullable: false
    })
    fullName: string;

}

