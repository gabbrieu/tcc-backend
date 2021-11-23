import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllCommentsRequestDto {
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
  @IsString()
  @ApiPropertyOptional({
    description: 'Obter todos os comentários por ID de um cliente',
  })
  customerId?: string;
}
