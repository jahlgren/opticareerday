import fs from 'fs';
import path from 'path';
import getConnection from './connection.js';

const migrationsPath = path.resolve('./src/database/migrations');

export type MigrationFile = {
  name: string,
  path: string,
  version: number
};

export type MigrationRow = {
  id: number,
  createdAt: string,
  version: number,
  file: string
};

export async function validateConnection() {
  const connection = getConnection();
  try {
    await connection.raw('SELECT 1');
    return true;
  }
  catch(e) {
    console.log(e);
    return false;
  }
}

async function getMigrationFiles() {
  const files: MigrationFile[] = fs.readdirSync(migrationsPath).map(file => ({
    name: file,
    path: migrationsPath + '/' + file,
    version: parseInt(file)
  })).sort((a, b) => a.version - b.version);
  return files;
}

async function getLatestMigrationInfo() {
  const connection = getConnection();
  try {
    const rows = await connection<MigrationRow>('migration').select().orderBy('id', 'desc').limit(1);
    if(rows.length === 1)
      return rows[0];
  }
  catch {
    await createMigrationsTable();
  }
  return null;
}

async function createMigrationsTable() {
  console.log('No migrations table found, creating one...');
  const connection = getConnection();
  await connection.raw(`
    CREATE TABLE migration (
      id        INT NOT NULL AUTO_INCREMENT,
      createdAt DATETIME NOT NULL,
      version   INT NOT NULL,
      file      VARCHAR(255) NOT NULL,
      PRIMARY KEY (id)
    )
    DEFAULT CHARACTER SET utf8mb4 ENGINE=InnoDB;
  `);
}

export async function getPendingMigrations() {
  const migrations = await getMigrationFiles();
  const last = await getLatestMigrationInfo();
  return migrations.filter(migration => !last || migration.version > last.version);
}
