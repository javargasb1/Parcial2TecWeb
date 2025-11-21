import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAsistenteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  codigoEstudiante: string;

  @IsEmail()
  email: string;
}
