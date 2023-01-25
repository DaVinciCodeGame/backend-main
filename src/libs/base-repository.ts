import { EntityTarget, ObjectLiteral } from 'typeorm';
import mysqlDataSource from '../config/mysql';

export default abstract class Repository<E extends ObjectLiteral> {
  protected readonly repository;

  constructor(entity: EntityTarget<E>) {
    this.repository = mysqlDataSource.getRepository(entity);
  }
}
