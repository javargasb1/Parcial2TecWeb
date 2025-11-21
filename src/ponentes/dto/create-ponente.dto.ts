import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePonenteDto {
  @IsInt()
  cedula: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsIn(['Interno', 'Invitado'])
  tipoPonente: string;

  @IsString()
  @IsNotEmpty()
  especialidad: string;
}
