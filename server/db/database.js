var pgp = require('pg-promise')({})
const pgpConfig = {
  host: process.env.PGHOST || 'localhost',
  user: process.env.PGUSER || 'mapengel', // postgres
  password: process.env.PGPASS || 'postgres',
  database: process.env.PGDATABASE || 'postgres',
  port: process.env.PGPORT || 5432
}

const db = pgp(pgpConfig)

module.exports = db
