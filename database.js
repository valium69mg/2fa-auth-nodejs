const {Client} = require('pg');

// CREATE CLIENT
module.exports.createClient = async function () {
  const client = new Client({
      user: 'postgres',
      password: 'admin',
      host: 'localhost',
      port: 5432,
      database: 'authenticator_nodejs',
    });
  return client;
};

// USERS

// CREATE USERS TABLE
module.exports.createUsersTable = async function (client) {
  try {
    const response = await client.query("CREATE TABLE IF NOT EXISTS users ( \
      userid SERIAL NOT NULL, \
      mail varchar(255) NOT NULL, \
      password varchar(255) NOT NULL, \
      created_at DATE DEFAULT CURRENT_DATE, \
      token varchar(25)' \
      PRIMARY KEY (userid) \
      );"
    );
    return response;
  }catch(err){
    return err;
  }finally {
    client.end();
  }
};

// CREATE USER
module.exports.createUser = async function (mail,password,token,client) {
  try {
    const response = await client.query("INSERT INTO users (mail,password,token) \
        VALUES ($1,$2,$3)",[mail,password,token]
    );
    return response;
  }catch(err){
    return err;
  }finally {
    client.end();
  }
};

// VERIFY USER
module.exports.verifyUser = async function (mail,password,client) {
  try {
    const response = await client.query("SELECT * FROM users WHERE mail=$1 AND password=$2",
    [mail,password]
    );
    if (response.rowCount === 1) {return true}
  }catch(err) {
    return false;
  }finally {
    client.end();
  }
};

// READ USER
module.exports.getAllUsers = async function (client) {
  try {
    const response = await client.query("SELECT * FROM users");
    return response.rows;
  }catch(err) {
    return err;
  }finally{
    client.end();
  }
};

// READ USER PASSWORD
module.exports.getUserHash = async function (mail,client) {
  try {
    const response = await client.query("SELECT password FROM users WHERE mail = $1",
    [mail]
    );
    return response.rows[0].password;
  }catch(err) {
    return err;
  }finally {
    client.end();
  }
};

// UPDATE USER
module.exports.updateUserPassword = async function (mail,newPassword,client) {
  try {
    const response = await client.query(
      "UPDATE users \
      SET password = $1 \
      WHERE mail = $2",
      [newPassword,mail]
    );
    return true;
  }catch(err) {
    return err;
  }finally {
    client.end();
  }
};

// UPDATE USER TOKEN
module.exports.updateUserToken = async function (mail,newToken,client) {
  try {
    const response = await client.query("UPDATE users SET token = $1 WHERE mail = $2",[newToken,mail]);
    return true;
  }catch(err) {
    return err;
  }finally {
    client.end();
  }
};

// DELETE USER
module.exports.deleteUser = async function (mail,client) {
  try {
    const response = await client.query("DELETE FROM users WHERE mail=$1",[mail]);
    return true;
  }catch(err){
    return err;
  }finally{
    client.end();
  }
};