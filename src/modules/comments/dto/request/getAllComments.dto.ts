import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

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
}
