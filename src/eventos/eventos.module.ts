import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { Evento } from './entities/evento.entity';
import { Ponente } from '../ponentes/entities/ponente.entity';
import { Auditorio } from '../auditorios/entities/auditorio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evento, Ponente, Auditorio])],
  controllers: [EventosController],
  providers: [EventosService],
  exports: [EventosService],
})
export class EventosModule {}
