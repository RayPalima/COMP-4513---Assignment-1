# COMP-4513 Assignment 1, Formula 1 Data API

## Overview
This assignment creates an F1 data API for querying. Some of the data includes: circuits, constructors, drivers, races, and results; which is is returned in JSON format.

### Example:

#### Request: 

[/api/drivers/leclerc](https://comp-4513-f1-api-assignment-1.onrender.com/api/drivers/leclerc)
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
NodeJS, Express, Render

## API Endpoints:

## API Endpoints:
