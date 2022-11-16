const express = require('express');
const mariadb = require('mariadb');
const lodash = require('lodash');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || '3000'

const app = express();

// Middleware
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Start listening
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

var host = "localhost";
var user = "root";
var pass = "campoalto";
var database = "sources";

app.post("/", (request, response) => {
    switch (request.body.mode) {
        case "create":
            createRecord(request, response);
            break;
        case "readOne":
            readOneRecord(request, response);
            break;
        case "read":
            readRecord(request, response);
            break;
        case "update":
            updateRecord(request, response);
            break;
        case "delete":
            deleteRecord(request, response);
            break;
        default:
            response.status(200).json({ "status": false, "message": "something went wrong with routing " });
            break;
    }
})

function createRecord(request, response) {
    mariadb.createConnection({
        host: host,
        database: database,
        user: user,
        password: pass
    }).then(connection => {
        connection.beginTransaction()
            .then(() => {
                return connection.query("INSERT INTO source (title, link) VALUES (?,?);", [request.body.title, request.body.link])
            }).then((result) => {
                console.log("Affected Row: " + result.affectedRows)
                console.log("Insert ID: " + result.insertId)
                console.log("Warning status: " + result.warningStatus)
                connection.commit();
                response.status(200).json({
                    "status": true,
                    "message": "Record inserted",
                    "data": result
                });
            }).catch((error) => {
                console.log(error.message);
                connection.rollback();
            });
    }).catch(error => {
        response.status(200).json({ "status": false, "message": error.message });
    })
}

// Return one source record from the DB
function readOneRecord(request, response) {
    var result = "";
    mariadb.createConnection({
        host: host,
        database: database,
        user: user,
        password: pass
    }).then(connection => {
        result = connection.query("SELECT * FROM source WHERE id = ? ", [request.body.sourceId]);
        lodash.difference(result['meta'])
        return result;
    }).then((result) => {
        console.log("complete")
        response.status(200).json({ status: true, "data": result });
    }).catch((error) => {
        response.status(200).json({ "status": false, "message": error.message });
    })
}

// Return all source records from the DB
function readRecord(request, response) {
    var result = "";
    mariadb.createConnection({
        host: host,
        database: database,
        user: user,
        password: pass
    }).then(connection => {
        result = connection.query("SELECT * FROM source");
        lodash.difference(result['meta'])
        return result;
    }).then((result) => {
        console.log("complete")
        response.status(200).json({ "data": result });
    }).catch((error) => {
        response.status(200).json({ "status": false, "message": error.message });
    })
}

// Update one source record from the DB
function updateRecord(request, response) {
    mariadb.createConnection({
        host: host,
        database: database,
        user: user,
        password: pass
    }).then(connection => {
        connection.beginTransaction()
            .then(() => {
                return connection.query("UPDATE source SET title=? , link=? WHERE id = ?  ", [request.body.title, request.body.link, request.body.sourceId]);
            }).then((result) => {
                // some data we want to aquire . 
                console.log("Affected Row : " + result.affectedRows);
                console.log("Insert id : " + result.insertId);
                console.log("warning status : " + result.warningStatus);
                connection.commit();
                response.status(200).json({ "status": true, "message": "record updated" });
            }).catch((error) => {
                console.log(error.message);
                connection.rollback();
            });
    }).catch(error => {
        response.status(200).json({ "status": false, "message": error.message });
    })
}

function deleteRecord(request, response) {
    mariadb.createConnection({
        host: host,
        database: database,
        user: user,
        password: pass
    }).then(connection => {
        connection.beginTransaction()
            .then(() => {
                return connection.query("DELETE FROM source WHERE id = ? ", [request.body.sourceId]);
            }).then((result) => {
                // some data we want to aquire . 
                console.log("Affected Row : " + result.affectedRows);
                console.log("Insert id : " + result.insertId);
                console.log("warning status : " + result.warningStatus);
                connection.commit();
                response.status(200).json({ "status": true, "message": "record deleted" });
            }).catch((error) => {
                console.log(error.message);
                connection.rollback();
            });
    }).catch(error => {
        response.status(200).json({ "status": false, "message": error.message });
    })
}