module.exports={
    HOST: 'localhost',
    PORT: '1434',
    USER: 'sqlCrud',
    PASSWORD: '123456',
    DB: 'sqlCrud_db',
    dialect: 'mssql',
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};