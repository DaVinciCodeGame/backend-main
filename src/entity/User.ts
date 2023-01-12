import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type UserConstructorArguments = {
  username: string;
  profileImageUrl?: string;
  kakaoId?: number;
};

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  readonly userId!: number;

  @Column({ length: 20, nullable: false })
  username!: string;

  @Column()
  profileImageUrl?: string;

  @Column({ default: 0 })
  score?: number;

  @Column({ type: 'bigint' })
  kakaoId?: number;

  constructor(arg: UserConstructorArguments) {
    if (arg) {
      this.username = arg.username;
      this.kakaoId = arg.kakaoId;
      this.profileImageUrl = arg.profileImageUrl;
    }
  }
}
