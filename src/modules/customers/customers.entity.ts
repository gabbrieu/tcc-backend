import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comments } from '../comments/comments.entity';

export enum GenderEnum {
  MASCULINO = 'MASCULINO',
  FEMININO = 'FEMININO',
  NÃO_INFORMADO = 'NÃO INFORMADO',
}

export enum PriorityEnum {
  VERY_LOW = 'VERY_LOW',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

@Entity()
export class Customers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nome da pessoa' })
  @Column()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Celular de uma pessoa' })
  @Column()
  @Length(11)
  cellphone: string;

  @ApiProperty({ description: 'Gênero de uma pessoa', enum: GenderEnum })
  @Column({
    enum: GenderEnum,
    enumName: 'GenderEnum',
    type: 'enum',
  })
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @ApiProperty({ description: 'Documento de uma pessoa' })
  @Column()
  @IsString()
  document: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Cidade de uma pessoa' })
  city: string;

  @ApiProperty({ description: 'Nome da rua da pessoa' })
  @Column()
  @IsString()
  street: string;

  @ApiProperty({ description: 'Nome do bairro da pessoa' })
  @Column()
  @IsString()
  district: string;

  @ApiProperty({ description: 'Número da casa da pessoa' })
  @Column({ name: 'house_number' })
  @IsString()
  houseNumber: string;

  @ApiProperty({
    description:
      'Um texto grande aonde pode ser inserido informações adicionais sobre a pessoa',
  })
  @Column({ type: 'text' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Status da pessoa, desativada ou não' })
  @Column()
  @IsBoolean()
  status: boolean;

  @ApiProperty({ description: 'Data de nascimento da pessoa' })
  @Column({ name: 'birth_date' })
  @IsDateString()
  birthDate: string;

  @ApiProperty({ description: 'Indica a coluna na qual o cliente está' })
  @Column()
  @IsNumber()
  @Min(1)
  @Max(5)
  column: number;

  @ApiPropertyOptional({ description: 'Email da pessoa' })
  @Column({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Indica a ordem dos registros' })
  @Column()
  @IsNumber()
  order: number;

  @ApiProperty({ description: 'Data de criação do registro' })
  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_date',
    default: () => 'LOCALTIMESTAMP',
  })
  createdAt: string;

  @ApiProperty({ description: 'Data de atualização do registro' })
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_date',
    default: () => 'LOCALTIMESTAMP',
  })
  updatedAt: string;

  @ApiProperty({
    description: 'Nível de prioridade',
    enum: PriorityEnum,
    enumName: 'PriorityEnum',
  })
  @Column({
    type: 'enum',
    enum: PriorityEnum,
    enumName: 'PriorityEnum',
  })
  @IsEnum(PriorityEnum)
  priority: PriorityEnum;

  @ApiProperty({
    description: 'Comentários',
    type: () => Comments,
    isArray: true,
  })
  @IsUUID(undefined, { each: true })
  @OneToMany(() => Comments, (comment) => comment.customer)
  comments: Comments[];
}
