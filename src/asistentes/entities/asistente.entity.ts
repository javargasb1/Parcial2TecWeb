import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Evento } from '../../eventos/entities/evento.entity';

@Entity('asistentes')
export class Asistente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nombre: string;

  @Column()
  codigoEstudiante: string;

  @Column()
  email: string;

  @ManyToOne(() => Evento, (evento) => evento.asistentes, {
    onDelete: 'CASCADE',
  })
  evento: Evento;
}
