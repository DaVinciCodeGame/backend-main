import { EntityTarget, ObjectLiteral } from 'typeorm';
import dataSource from '../config/typeorm';

export default abstract class MySqlRepository<E extends ObjectLiteral> {
  protected readonly repository;

  constructor(entity: EntityTarget<E>) {
    this.repository = dataSource.getRepository(entity);
  }
}
