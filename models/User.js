const { response } = require('express');
const databaseController = require('../database.js');


// CREATE TABLE 
module.exports.createUsersTable = async function () {
    const client = await databaseController.createClient();
    await client.connect();
    const response = await databaseController.createUsersTable(client);
    return response;
};

// CREATE USER 
module.exports.createUser = async function (mail,password,token) {
    const client = await databaseController.createClient();
    await client.connect();
    const response = await databaseController.createUser(mail,password,token,client);
    return response;
};

//VERIFY USER
module.exports.verifyUser = async function (mail,password) {
    const client = await databaseController.createClient();
    await client.connect();
    const response = await databaseController.verifyUser(mail,password,client);
    if (response === true) {return true}
    return false;
};

// READ USERS
module.exports.getAllUsers = async function () {
    const client = await databaseController.createClient();
    await client.connect();
    const response = await databaseController.getAllUsers(client);
    if (response instanceof Error) {
        return Error;
    } else {
        return response;
    }
};

// READ USER PASSWORD
module.exports.getUserHash = async function (mail) {
    const client = await databaseController.createClient();
    await client.connect();
    const response = await databaseController.getUserHash(mail,client);
    if (response instanceof Error) {
        return Error;
    } else {
        return response;
    }
};

// UPDATE USER
module.exports.updateUserPassword = async function (mail,newPassword) {
    const client = await databaseController.createClient();
    await client.connect();
    // ENCRYPT PASSWORD

    const response = await databaseController.updateUserPassword(mail,newPassword,client);
    if (response instanceof Error) {
        return Error;
    } else {
        return true;
    }
};

// UPDATE USER TOKEN
module.exports.updateUserToken = async function (mail,newToken) {
    const client = await databaseController.createClient();
    await client.connect();
    const response = await databaseController.updateUserToken(mail,newToken,client);
    if (response instanceof Error) {
        return Error;
    } else {
        return true;
    }
};

// DELETE USER
module.exports.deleteUser = async function (mail) {
    const client = await databaseController.createClient();
    await client.connect();
    const response = await databaseController.deleteUser(mail,client);
    if (response instanceof Error) {
        return Error;
    } else {
        return true;
    }
};