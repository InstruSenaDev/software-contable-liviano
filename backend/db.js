const { Pool } = require('pg'); // Importar Pool desde pg, no pool

const pool = new Pool({
    user: 'postgres.avbcuctiwucxbufqvpzu',
    host: 'aws-0-us-west-1.pooler.supabase.com',
    database: 'postgres',
    password: 'vskMqqkVjQjqP21l',
    port: '6543',
});

pool.on('error', (err, client) => {
    console.error('Error inesperado en el pool de conexiones:', err);
    process.exit(-1);
});

module.exports = pool;
 