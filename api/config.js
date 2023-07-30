// Server configurations
const serverConfig = {
    user: process.env.USER,
    password: process.env.MSSQL_SA_PASSWORD,
    server: process.env.MSSQL_SERVER,
    database: process.env.DATABASE,
    port: parseInt(process.env.MSSQL_PORT),
    options: {
        enableArithAbort: true,
        trustServerCertificate: true,
    }
};

module.exports = serverConfig;