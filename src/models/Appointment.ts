import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// este  arquivo serve para descrever um agendamento. Sempre quando for utilizar

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('time with time zone')
  date: Date;
}

export default Appointment;
