import { Client } from 'pg';

async function checkDb() {
  // Connect to default postgres db to create ours
  const client = new Client({
    connectionString: 'postgres://dante:123456@localhost:5432/postgres'
  });

  try {
    await client.connect();
    console.log('✅ Connected to Postgres server successfully.');
    
    const res = await client.query("SELECT 1 FROM pg_database WHERE datname='otonom_fabrika'");
    if (res.rowCount === 0) {
      console.log('Database does not exist. Creating...');
      await client.query('CREATE DATABASE otonom_fabrika');
      console.log('✅ Database created.');
    } else {
      console.log('✅ Database already exists.');
    }
  } catch (err: any) {
    console.error('❌ Failed to connect to Postgres:', err.message);
  } finally {
    await client.end();
  }
}

checkDb();
