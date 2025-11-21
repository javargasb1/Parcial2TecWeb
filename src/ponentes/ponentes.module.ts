import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PonentesService } from './ponentes.service';
import { PonentesController } from './ponentes.controller';
import { Ponente } from './entities/ponente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ponente])],
  controllers: [PonentesController],
  providers: [PonentesService],
  exports: [PonentesService],
})
export class PonentesModule {}
