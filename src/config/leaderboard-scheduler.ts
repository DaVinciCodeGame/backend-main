import schedule from 'node-schedule';
import mysqlDataSource from './mysql';

const job = schedule.scheduleJob('0 * * * *', async () => {
  mysqlDataSource.manager.query(`UPDATE user u
    INNER JOIN(
      SELECT userId, score, RANK() OVER(ORDER BY score DESC, scoreUpdatedAt) as rn
      FROM user
    ) r
    ON r.userId = u.userId
    SET
      u.prevRanking = IF(u.ranking IS NULL, r.rn, u.ranking),
      u.ranking = r.rn;`);
});

export default job;
