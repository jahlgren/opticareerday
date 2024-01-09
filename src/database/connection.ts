import knex, { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

let connection: Knex|null = null;

export default function getConnection() {
  if(connection)
    return connection;
  
  connection = knex({
    client: 'mysql2',
    connection: {
      host :  process.env.DB_HOST,
      port : parseInt(`${process.env.DB_PORT}`) || 3306,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME,
      multipleStatements: true,
      decimalNumbers: true
    }
  });

  return connection;
}
