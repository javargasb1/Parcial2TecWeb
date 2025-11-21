import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuditoriosService } from './auditorios.service';
import { CreateAuditorioDto } from './dto/create-auditorio.dto';

@Controller('auditorios')
export class AuditoriosController {
  constructor(private readonly auditoriosService: AuditoriosService) {}

  @Post()
  crear(@Body() dto: CreateAuditorioDto) {
    return this.auditoriosService.crearAuditorio(dto);
  }

  @Get()
  findAll() {
    return this.auditoriosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.auditoriosService.findById(id);
  }
}
