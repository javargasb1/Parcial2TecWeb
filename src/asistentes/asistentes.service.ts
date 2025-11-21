import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Asistente } from './entities/asistente.entity';
import { CreateAsistenteDto } from './dto/create-asistente.dto';
import { Evento } from '../eventos/entities/evento.entity';

@Injectable()
export class AsistentesService {
  constructor(
    @InjectRepository(Asistente)
    private readonly asistenteRepo: Repository<Asistente>,

    @InjectRepository(Evento)
    private readonly eventoRepo: Repository<Evento>,
  ) {}

  // registrarAsistente(eventoId, asistente):
  // - no puede haber dos asistentes con el mismo email en un mismo evento
  // - no puede superarse la capacidad del auditorio del evento
  async registrarAsistente(eventoId: number, dto: CreateAsistenteDto) {
    const evento = await this.eventoRepo.findOne({
      where: { id: eventoId },
      relations: ['auditorio', 'asistentes'],
    });

    if (!evento) {
      throw new NotFoundException(`Evento ${eventoId} no existe`);
    }

    if (!evento.auditorio) {
      throw new BadRequestException(
        'El evento no tiene auditorio asignado, no se pueden registrar asistentes',
      );
    }

    // Regla: no repetir email en el mismo evento
    const emailYaUsado =
      evento.asistentes?.some((a) => a.email === dto.email) ?? false;
    if (emailYaUsado) {
      throw new BadRequestException(
        'Ya existe un asistente con ese email en este evento',
      );
    }

    // Regla: capacidad del auditorio
    const capacidad = evento.auditorio.capacidad;
    const inscritos = evento.asistentes?.length ?? 0;

    if (inscritos >= capacidad) {
      throw new BadRequestException(
        'No se pueden registrar más asistentes, el auditorio está lleno',
      );
    }

    const asistente = this.asistenteRepo.create({
      ...dto,
      evento,
    });

    return this.asistenteRepo.save(asistente);
  }

  async findAsistentesByEvento(eventoId: number) {
    const evento = await this.eventoRepo.findOne({
      where: { id: eventoId },
      relations: ['asistentes'],
    });

    if (!evento) {
      throw new NotFoundException(`Evento ${eventoId} no existe`);
    }

    return evento.asistentes;
  }

  // helper para debug
  async findAll() {
    return this.asistenteRepo.find();
  }
}
