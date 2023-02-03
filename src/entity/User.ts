import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// HACK: 더 나은 정의 방법 찾아볼 것
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly userId!: number;

  @Column()
  username!: string;

  @Column()
  profileImageUrl!: string;

  @Column({ type: 'bigint' })
  kakaoId!: number;

  @Column({ default: 0 })
  score!: number;

  @Column({ nullable: true })
  ranking?: number;

  @Column({ nullable: true })
  prevRanking?: number;

  @Column({ type: 'varchar', nullable: true })
  refreshToken?: string | null;
}
