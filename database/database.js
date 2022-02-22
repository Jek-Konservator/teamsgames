let Datastore = require("nedb");
let dataRooms = new Datastore({filename: "./database/datafile/rooms.db", autoload: true});
let dataUsers = new Datastore({filename: "./database/datafile/users.db", autoload: true});

dataRooms.loadDatabase();
dataUsers.loadDatabase();

module.exports ={
    dataRooms,
    dataUsers,
}