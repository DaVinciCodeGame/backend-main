import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

// HACK: 더 나은 정의 방법 찾아볼 것
@Entity()
export class Room {
  @PrimaryColumn()
  roomId!: number;

  @Column()
  roomName!: string;

  @Column()
  maxMembers!: number;

  @Column({ default: false })
  isPlaying!: boolean;

  @Column({ nullable: true })
  password?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
