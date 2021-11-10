import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBooleanString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetAllRequestDto {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Quantidade de registros a serem obtidos',
  })
  @Transform(({ value }) => parseInt(value))
  take?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Quantidade de registros a serem ignorados',
  })
  @Transform(({ value }) => parseInt(value))
  skip?: number = 0;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Filtrar pela coluna do Kanban',
  })
  @Transform(({ value }) => parseInt(value))
  column?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Filtrar pelo nome do cliente',
  })
  name?: string;

  @ApiPropertyOptional({
    description: `Filtrar por status ('true' ou 'false'). Default = true`,
  })
  @IsOptional()
  @IsBooleanString()
  status?: string = 'true';
}
