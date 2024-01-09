import fs from 'fs';
import getConnection from './connection';
import { getPendingMigrations, validateConnection } from './core';

// Execute migrations
// ------------------
(async function execute() {
  console.log('\u001b[1m\u001b[36m' + '\nRunning migrations\u001b[0m');

  const connection = getConnection();

  if(!(await validateConnection())) {
    console.log('Error: Could not connect to the database.');
    connection.destroy();
    return;
  }

  const pending = await getPendingMigrations();

  if(pending.length < 1) {
    console.log('Database already up to date!');
    connection.destroy();
    return;
  }

  try {
    for(let i = 0; i < pending.length; i++) {
      console.log('Running migration: ' + pending[i].name); 
      const content = fs.readFileSync(pending[i].path, {encoding: 'utf-8'});
      await connection.raw(content);
      await connection.raw(`INSERT INTO migration(createdAt, version, file) VALUES(?, ?, ?)`, [new Date(), pending[i].version, pending[i].name]);
    }
    connection.destroy();
  }
  catch(error: any) {
    connection.destroy();
    console.log('Error: ', error.message);
    console.log('Cleanup might be needed, migrations are not run in a transaction!');
  }
}());
