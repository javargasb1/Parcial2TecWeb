import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateAuditorioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsInt()
  @Min(1)
  capacidad: number;

  @IsString()
  @IsNotEmpty()
  ubicacion: string;
}
