import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Evento } from './entities/evento.entity';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { Ponente } from '../ponentes/entities/ponente.entity';
import { Auditorio } from '../auditorios/entities/auditorio.entity';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepo: Repository<Evento>,

    @InjectRepository(Ponente)
    private readonly ponenteRepo: Repository<Ponente>,

    @InjectRepository(Auditorio)
    private readonly auditorioRepo: Repository<Auditorio>,
  ) {}

  // crearEvento():
  // duracionHoras positiva
  // si ponente es Invitado, descripcion >= 50 chars
  async crearEvento(dto: CreateEventoDto) {
    if (dto.duracionHoras <= 0) {
      throw new BadRequestException('La duración del evento debe ser positiva');
    }

    const ponente = await this.ponenteRepo.findOne({
      where: { id: dto.ponenteId },
    });
    if (!ponente) {
      throw new NotFoundException(`Ponente ${dto.ponenteId} no existe`);
    }

    if (ponente.tipoPonente === 'Invitado' && dto.descripcion.length < 50) {
      throw new BadRequestException(
        'Si el ponente es Invitado, la descripción debe tener al menos 50 caracteres',
      );
    }

    let auditorio: Auditorio | null = null;

    if (dto.auditorioId !== undefined) {
      auditorio = await this.auditorioRepo.findOne({
        where: { id: dto.auditorioId },
      });
      if (!auditorio) {
        throw new NotFoundException(`Auditorio ${dto.auditorioId} no existe`);
      }
    }

    const evento = this.eventoRepo.create({
      titulo: dto.titulo,
      descripcion: dto.descripcion,
      fecha: new Date(dto.fecha),
      duracionHoras: dto.duracionHoras,
      estado: 'Propuesto',
      ponente,
      auditorio: auditorio ?? null,
    });

    return this.eventoRepo.save(evento);
  }

  // aprobarEvento(id):
  // Solo puede aprobarse si tiene auditorio asignado
  async aprobarEvento(id: number) {
    const evento = await this.eventoRepo.findOne({
      where: { id },
      relations: ['auditorio'],
    });

    if (!evento) {
      throw new NotFoundException(`Evento ${id} no existe`);
    }

    if (!evento.auditorio) {
      throw new BadRequestException(
        'No se puede aprobar el evento porque no tiene auditorio asignado',
      );
    }

    evento.estado = 'Aprobado';
    return this.eventoRepo.save(evento);
  }

  // eliminarEvento(id):
  // No se puede eliminar si ya está aprobado
  async eliminarEvento(id: number) {
    const evento = await this.eventoRepo.findOne({ where: { id } });

    if (!evento) {
      throw new NotFoundException(`Evento ${id} no existe`);
    }

    if (evento.estado === 'Aprobado') {
      throw new BadRequestException(
        'No se puede eliminar un evento que ya está aprobado',
      );
    }

    await this.eventoRepo.remove(evento);
    return { message: 'Evento eliminado' };
  }

  async findEventoById(id: number) {
    const evento = await this.eventoRepo.findOne({
      where: { id },
      relations: ['ponente', 'auditorio', 'asistentes'],
    });

    if (!evento) {
      throw new NotFoundException(`Evento ${id} no existe`);
    }

    return evento;
  }

  async findAll() {
    return this.eventoRepo.find({
      relations: ['ponente', 'auditorio'],
    });
  }
}
