// Server configurations
const serverConfig = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_SA_PASSWORD,
    server: process.env.MSSQL_SERVER,
    database: process.env.DATABASE,
    options: {
        enableArithAbort: true,
        trustServerCertificate: true,
    }
};

module.exports = serverConfig;