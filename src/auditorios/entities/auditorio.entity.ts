import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Evento } from '../../eventos/entities/evento.entity';

@Entity('auditorios')
export class Auditorio {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nombre: string;

  @Column('int')
  capacidad: number;

  @Column()
  ubicacion: string;

  @OneToMany(() => Evento, (evento) => evento.auditorio)
  eventos: Evento[];
}
