// Server configurations
const serverConfig = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: {
        enableArithAbort: true
    }
};

module.exports = serverConfig;