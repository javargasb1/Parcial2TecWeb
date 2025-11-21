import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateEventoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsDateString()
  fecha: string;

  @IsInt()
  @Min(1)
  duracionHoras: number;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsInt()
  ponenteId: number;

  @IsOptional()
  @IsInt()
  auditorioId?: number;
}
