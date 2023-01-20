import { EntityTarget, ObjectLiteral } from 'typeorm';
import dataSource from '../config/mongodb';

export default abstract class Repository<E extends ObjectLiteral> {
  protected readonly repository;

  constructor(entity: EntityTarget<E>) {
    this.repository = dataSource.getRepository(entity);
  }
}
