import { IsOptional } from 'class-validator';

export class QueryDto {
  @IsOptional()
  limit?: number;

  @IsOptional()
  skip?: number;

  @IsOptional()
  query?: string;
}
