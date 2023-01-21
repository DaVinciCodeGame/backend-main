import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

export type UserConstructorArguments = {
  username: string;
  profileImageUrl: string;
  kakaoId: number;
};

@Entity()
export class User {
  @ObjectIdColumn({ generated: true })
  readonly userId!: ObjectID;

  @Column({ nullable: false })
  username!: string;

  @Column()
  profileImageUrl!: string;

  @Column({ default: 0 })
  score?: number;

  @Column()
  kakaoId!: number;

  constructor(arg: UserConstructorArguments) {
    if (arg) {
      this.username = arg.username;
      this.kakaoId = arg.kakaoId;
      this.profileImageUrl = arg.profileImageUrl;
    }
  }
}
