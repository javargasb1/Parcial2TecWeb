import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Ponente } from '../../ponentes/entities/ponente.entity';
import { Auditorio } from '../../auditorios/entities/auditorio.entity';
import { Asistente } from '../../asistentes/entities/asistente.entity';

@Entity('eventos')
export class Evento {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column('int')
  duracionHoras: number;

  @Column()
  estado: string; // 'Propuesto' | 'Aprobado' | 'Rechazado'

  @ManyToOne(() => Ponente, (ponente) => ponente.eventos, {
    eager: true,
  })
  ponente: Ponente;

  @ManyToOne(() => Auditorio, (auditorio) => auditorio.eventos, {
    nullable: true,
    eager: true,
  })
  auditorio?: Auditorio | null;

  @OneToMany(() => Asistente, (asistente) => asistente.evento)
  asistentes: Asistente[];
}
