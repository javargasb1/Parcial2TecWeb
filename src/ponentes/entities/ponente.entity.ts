import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Evento } from '../../eventos/entities/evento.entity';

@Entity('ponentes')
export class Ponente {
  @PrimaryGeneratedColumn('increment')
  id: number; // Long-Autogenerado

  @Column('int')
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  tipoPonente: string; // 'Interno' | 'Invitado'

  @Column()
  especialidad: string;

  @OneToMany(() => Evento, (evento) => evento.ponente)
  eventos: Evento[];
}
