import { PartialType } from '@nestjs/mapped-types';
import { CreatePonenteDto } from './create-ponente.dto';

export class UpdatePonenteDto extends PartialType(CreatePonenteDto) {}
