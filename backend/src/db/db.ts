import Pool from 'pg-pool';
//import pg from "pg";


export const pool = new Pool({
    host: 'rc1b-51my6ghf2y18to8j.mdb.yandexcloud.net',
    user: 'cnrprod-team-27512',
    database: 'cnrprod-team-27512',
    password: 'geejohpaeXiewachooB4ohzaig3Voomu',
    port: 6432,
    ssl: {
      rejectUnauthorized: false,
  },
  });

/*
export const client = new pg.Client ({
  host: 'rc1b-51my6ghf2y18to8j.mdb.yandexcloud.net',
  user: 'cnrprod-team-27512',
  database: 'cnrprod-team-27512',
  password: 'geejohpaeXiewachooB4ohzaig3Voomu',
  port: 5432,
}); 

client
  .connect()
  .then(() => console.log('connected'))
  .catch((err) => console.error('connection error', err.stack))*/
