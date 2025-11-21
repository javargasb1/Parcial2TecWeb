import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Auditorio } from './entities/auditorio.entity';
import { CreateAuditorioDto } from './dto/create-auditorio.dto';
import { UpdateAuditorioDto } from './dto/update-auditorio.dto';

@Injectable()
export class AuditoriosService {
  constructor(
    @InjectRepository(Auditorio)
    private readonly auditorioRepo: Repository<Auditorio>,
  ) {}

  // crearAuditorio():
  // - capacidad > 0
  async crearAuditorio(dto: CreateAuditorioDto) {
    if (dto.capacidad <= 0) {
      throw new BadRequestException(
        'La capacidad del auditorio debe ser mayor a cero',
      );
    }

    const auditorio = this.auditorioRepo.create(dto);
    return this.auditorioRepo.save(auditorio);
  }

  async findAll() {
    return this.auditorioRepo.find();
  }

  async findById(id: number) {
    const auditorio = await this.auditorioRepo.findOne({ where: { id } });
    if (!auditorio) {
      throw new NotFoundException(`Auditorio ${id} no existe`);
    }
    return auditorio;
  }
}
