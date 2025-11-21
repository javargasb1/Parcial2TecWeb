import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ponente } from './entities/ponente.entity';
import { CreatePonenteDto } from './dto/create-ponente.dto';
import { UpdatePonenteDto } from './dto/update-ponente.dto';

@Injectable()
export class PonentesService {
  constructor(
    @InjectRepository(Ponente)
    private readonly ponenteRepo: Repository<Ponente>,
  ) {}

  // crearPonente():
  // - Interno -> email termina en .edu
  // - Invitado -> email válido: contiene "@" y algo después de "@"
  async crearPonente(dto: CreatePonenteDto) {
    if (dto.tipoPonente === 'Interno') {
      if (!dto.email.endsWith('.edu')) {
        throw new BadRequestException(
          'Ponente interno debe tener email terminado en .edu',
        );
      }
    } else if (dto.tipoPonente === 'Invitado') {
      const parts = dto.email.split('@');
      if (parts.length !== 2 || !parts[1].includes('.')) {
        throw new BadRequestException(
          'Email de ponente invitado debe contener "@" y un dominio válido',
        );
      }
    }

    const ponente = this.ponenteRepo.create(dto);
    return this.ponenteRepo.save(ponente);
  }

  async findPonenteById(id: number) {
    const ponente = await this.ponenteRepo.findOne({
      where: { id },
      relations: ['eventos'],
    });

    if (!ponente) {
      throw new NotFoundException(`Ponente ${id} no existe`);
    }

    return ponente;
  }

  // eliminarPonente(id):
  // - No se puede eliminar si tiene eventos asociados.
  async eliminarPonente(id: number) {
    const ponente = await this.ponenteRepo.findOne({
      where: { id },
      relations: ['eventos'],
    });

    if (!ponente) {
      throw new NotFoundException(`Ponente ${id} no existe`);
    }

    if (ponente.eventos && ponente.eventos.length > 0) {
      throw new BadRequestException(
        'No se puede eliminar el ponente porque tiene eventos asociados',
      );
    }

    await this.ponenteRepo.remove(ponente);
    return { message: 'Ponente eliminado' };
  }

  async findAll() {
    return this.ponenteRepo.find();
  }
}
