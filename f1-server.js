/**
 * The following is an F1 data api/server for querying.  
 */

//Making sure to use/"require" express and .env file.
const express = require('express');
require('dotenv').config();

//Create an Express App
const app = express();

//Set up for route handling
const router = require('./scripts/f1-router');
router.handleCircuits(app);
router.handleConstructors(app);
router.handleDrivers(app);
router.handleQualifying(app);
router.handleRaces(app);
router.handleResults(app);
router.handleStandings(app);

//Using Express to listen to port
let port = process.env.PORT;
app.listen(port, () => {
    console.log("F1 Server running at port:" + port);
});