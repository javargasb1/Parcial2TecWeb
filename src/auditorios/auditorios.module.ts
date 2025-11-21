import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuditoriosService } from './auditorios.service';
import { AuditoriosController } from './auditorios.controller';
import { Auditorio } from './entities/auditorio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auditorio])],
  controllers: [AuditoriosController],
  providers: [AuditoriosService],
  exports: [AuditoriosService],
})
export class AuditoriosModule {}
