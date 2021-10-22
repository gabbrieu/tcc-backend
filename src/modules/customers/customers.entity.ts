import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum GenderEnum {
  MASCULINO = 'MASCULINO',
  FEMININO = 'FEMININO',
  NÃO_INFORMADO = 'NÃO INFORMADO',
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
  @IsPhoneNumber('BR')
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
  @IsNumber()
  houseNumber: number;

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
}
