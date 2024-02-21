import sql from 'mssql';
import dotenv from 'dotenv';
import logger from './logger.js';
dotenv.config();
const {SQL_USER, SQL_PASSWORD, SQL_SERVER, SQL_DB, SQL_SERVER_PORT, SQL_ENCRYPT, SQL_ENABLE_ARITH_ABORT, SQL_TRUST_SERVER_CERTIFICATE} = process.env;

const sqlConfig = {
    user: SQL_USER,
    password: SQL_PASSWORD,
    server: SQL_SERVER,
    database: SQL_DB,
    port: Number(SQL_SERVER_PORT),  //optional default is 1433  
    options: {
        encrypt:  Boolean(SQL_ENCRYPT), // true for azure & false for local dev
        trustServerCertificate: Boolean(SQL_TRUST_SERVER_CERTIFICATE) // true for local dev & false for azure
    }
}


let appPool;
let poolRequest;

try {
  appPool = await sql.connect(sqlConfig);
  poolRequest = () => appPool.request();
  if (appPool) {
    logger.info('Connected to SQL server');
  }
} catch (error) {
  logger.error('Failed to connect to SQL server:', error);
}

const closePool = async () => sql.close();

export { poolRequest, closePool,sql };
