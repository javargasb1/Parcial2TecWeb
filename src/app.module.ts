import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PonentesModule } from './ponentes/ponentes.module';
import { AuditoriosModule } from './auditorios/auditorios.module';
import { EventosModule } from './eventos/eventos.module';
import { AsistentesModule } from './asistentes/asistentes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // para el parcial está bien
      }),
    }),

    PonentesModule,
    AuditoriosModule,
    EventosModule,
    AsistentesModule,
  ],
})
export class AppModule {}
