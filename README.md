# COMP-4513 Assignment 1, Formula 1 Data API

## Overview
This assignment creates an F1 data API for querying. Some of the data includes: circuits, constructors, drivers, races, and results; which is is returned in JSON format.

### Basic Link:
https://comp-4513-f1-api-assignment-1.onrender.com/api/circuits

### Example:

#### Request: 

[/api/drivers/leclerc](https://comp-4513-f1-api-assignment-1.onrender.com/api/drivers/leclerc)
Exact URL:
https://comp-4513-f1-api-assignment-1.onrender.com/api/drivers/leclerc 

#### Response:

```json
[
  {
    "driverId":844,
    "driverRef":"leclerc",
    "number":16,
    "code":"LEC",
    "forename":"Charles",
    "surname":"Leclerc",
    "dob":"1997-10-16",
    "nationality":"Monegasque",
    "url":"http://en.wikipedia.org/wiki/Charles_Leclerc"
  }
]
```

## Built with:
NodeJS, Express, Render - https://comp-4513-f1-api-assignment-1.onrender.com

## API Endpoints:

| [/api/circuits] | Returns all the circuits |
|---|---|
| [/api/circuits/ref] | Returns just the specified circuit. |
| [/api/circuits/season/year] | Returns the circuits used in a given season. |
| [/api/constructors] | Returns all the constructors. |
| [/api/constructors/ref] | Returns just the specified constructor.|
| [/api/drivers] | Returns all the drivers |
| [/api/drivers/ref] | Returns just the specified driver |
/api/drivers/search/substring
Returns the drivers whose surname (case insensitive) begins with the provided substring, e.g., /api/drivers/search/sch
/api/drivers/race/raceId
Returns the drivers within a given race, e.g., /api/drivers/race/1106
/api/races/raceId
Returns just the specified race. Don’t provide the foreign key for the circuit; instead provide the circuit name, location, and country.
/api/races/season/year
Returns the races within a given season ordered by round, e.g., /api/races/season/2020
/api/races/season/year/round
Returns a specific race within a given season specified by the round number, e.g., to return the 4th race in the 2022 season: /api/races/season/2022/4
/api/races/circuits/ref
Returns all the races for a given circuit (use the circuitRef field), ordered by year, e.g. /api/races/circuits/monza


## Project Files:

| File | Description |
|---|---|
| f1-server.js | The F1 data server/API, which listens for requests. |
| f1-router.js (in scripts folder) | Handles the routes and returns the appropriate data in JSON.|

## Test Links:
https://comp-4513-f1-api-assignment-1.onrender.com/api/circuits
https://comp-4513-f1-api-assignment-1.onrender.com/api/circuits/monza
https://comp-4513-f1-api-assignment-1.onrender.com/api/circuits/calgary

https://comp-4513-f1-api-assignment-1.onrender.com/api/constructors
https://comp-4513-f1-api-assignment-1.onrender.com/api/constructors/ferrari

https://comp-4513-f1-api-assignment-1.onrender.com/api/drivers
Note: Made the driverRef (the following test link), Case **Insensitive**.
https://comp-4513-f1-api-assignment-1.onrender.com/api/drivers/Norris
https://comp-4513-f1-api-assignment-1.onrender.com/api/drivers/norris
https://comp-4513-f1-api-assignment-1.onrender.com/api/drivers/connolly
https://comp-4513-f1-api-assignment-1.onrender.com/api/drivers/search/sch
https://comp-4513-f1-api-assignment-1.onrender.com/api/drivers/search/xxxxx
https://comp-4513-f1-api-assignment-1.onrender.com/api/drivers/race/1069

https://comp-4513-f1-api-assignment-1.onrender.com/api/races/1034
https://comp-4513-f1-api-assignment-1.onrender.com/api/races/season/2021
https://comp-4513-f1-api-assignment-1.onrender.com/api/races/season/1800
https://comp-4513-f1-api-assignment-1.onrender.com/api/races/season/2020/5
https://comp-4513-f1-api-assignment-1.onrender.com/api/races/season/2020/100
https://comp-4513-f1-api-assignment-1.onrender.com/api/races/circuits/7
Note: the original test links given (previous one included) had a circuitRef that was a number. However, circuitRef is a string, so I created new test cases.
https://comp-4513-f1-api-assignment-1.onrender.com/api/races/circuits/monza
https://comp-4513-f1-api-assignment-1.onrender.com/api/races/circuits/monza/season/2015/2022
https://comp-4513-f1-api-assignment-1.onrender.com/api/races/circuits/monza/season/2022/2022

https://comp-4513-f1-api-assignment-1.onrender.com/api/results/1106
https://comp-4513-f1-api-assignment-1.onrender.com/api/results/driver/max_verstappen
https://comp-4513-f1-api-assignment-1.onrender.com/api/results/driver/connolly
https://comp-4513-f1-api-assignment-1.onrender.com/api/results/drivers/sainz/seasons/2021/2022
https://comp-4513-f1-api-assignment-1.onrender.com/api/results/drivers/sainz/seasons/2035/2022

https://comp-4513-f1-api-assignment-1.onrender.com/api/qualifying/1106

https://comp-4513-f1-api-assignment-1.onrender.com/api/standings/drivers/1120
https://comp-4513-f1-api-assignment-1.onrender.com/api/standings/constructors/1120
https://comp-4513-f1-api-assignment-1.onrender.com/api/standings/constructors/asds
