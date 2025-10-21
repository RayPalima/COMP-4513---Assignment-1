const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

const router = require('./scripts/f1-router');

router.handleCircuits(app);
router.handleConstructors(app);
router.handleDrivers(app);
router.handleQualifying(app);
router.handleRaces(app);
router.handleResults(app);
router.handleStandings(app);

const port = process.env.PORT;
app.listen(port, () => {
    console.log("F1 Server running at port= " + port);
});