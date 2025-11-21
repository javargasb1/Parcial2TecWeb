import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AsistentesService } from './asistentes.service';
import { AsistentesController } from './asistentes.controller';
import { Asistente } from './entities/asistente.entity';
import { Evento } from '../eventos/entities/evento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asistente, Evento])],
  controllers: [AsistentesController],
  providers: [AsistentesService],
  exports: [AsistentesService],
})
export class AsistentesModule {}
