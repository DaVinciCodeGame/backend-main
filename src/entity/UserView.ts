import { ViewColumn, ViewEntity } from 'typeorm';
import { User } from './User';

@ViewEntity({
  expression: (dataSource) =>
    dataSource
      .createQueryBuilder()
      .select('userId')
      .addSelect('username')
      .addSelect('profileImageUrl')
      .addSelect('score')
      .addSelect('scoreUpdatedAt')
      .addSelect('RANK() OVER(ORDER BY score DESC, scoreUpdatedAt) as ranking')
      .from(User, 'user'),
})
export class UserView {
  @ViewColumn()
  readonly userId!: number;

  @ViewColumn()
  readonly username!: string;

  @ViewColumn()
  readonly profileImageUrl!: string;

  @ViewColumn()
  readonly score!: number;

  @ViewColumn()
  readonly ranking!: number;

  @ViewColumn()
  readonly scoreUpdatedAt!: Date;
}
