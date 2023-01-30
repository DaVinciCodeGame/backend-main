import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// HACK: 더 나은 정의 방법 찾아볼 것
@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  readonly roomId!: number;

  @Column()
  roomName!: string;

  @Column()
  maxMembers!: number;

  @Column({ default: false })
  isPlaying!: boolean;

  @Column()
  isPrivate!: boolean;

  @Column({ nullable: true })
  password?: string;
}
