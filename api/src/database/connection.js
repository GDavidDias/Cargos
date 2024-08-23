const mysql = require('mysql2/promise');
require('dotenv').config();
//console.log(process.env);

const dbSettingsLocal = {
    host:'localhost',
    user:process.env.LOCALUSERDB,
    password: process.env.LOCALPASSWORDDB,
    port: process.env.LOCALPORT,
    database: process.env.LOCALDATABASE
};

const dbSettingsRemoto = {
    host:process.env.REMOTOHOSTDB,
    user:process.env.REMOTOUSERDB,
    password: process.env.REMOTOPASSWORDDB,
    database: process.env.REMOTODATABASE,
    timezone: 'local'
}

const pool = mysql.createPool(dbSettingsLocal);

module.exports = pool;
