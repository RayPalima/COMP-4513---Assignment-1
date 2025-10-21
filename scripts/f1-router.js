/** 
 * The following is a router that handles the routes and returns the appropriate data in JSON.
*/

//Making sure to use/"require" express and .env file.
const supa = require('@supabase/supabase-js');
require('dotenv').config();

//Initializing connection Supabase database (including Url & Key).
const supaUrl = process.env.SUPABASE_URL || 'https://gxrnaymgawdvwwgqzzty.supabase.co';
const supaAnonKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4cm5heW1nYXdkdnd3Z3F6enR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4NzYyMDMsImV4cCI6MjA3NjQ1MjIwM30.vsiIduM81WnULdpLZbYBQtvSpeAQ16DQ6djGvkfdUNU';
const supabase = supa.createClient(supaUrl, supaAnonKey);

//Handles the proper formating of error message in JSON.
const jsonMessage = (msg) => {
    return { error : msg };
};

//Handles all the routes that start with "circuits" (most of it goes through circuits table). Returns data on all circuits, and a specific circuit based on circuitRef and year. 
const handleCircuits = (app) => {
  app.get("/api/circuits", async (req, res) => {
  const { data, error } = await supabase
    .from("circuits")
    .select()
  res.send(data);
  });

  app.get("/api/circuits/:ref", async (req, res) => {
    const { data, error } = await supabase
      .from("circuits")
      .select()
      .eq("circuitRef", req.params.ref.toLowerCase())
    if (data.length > 0) {
      res.send(data);
    }else{
      res.json(jsonMessage(`Circuit: ${req.params.ref}, not found`));
    }
  });

  app.get("/api/circuits/season/:year", async (req, res) => {
    const { data, error } = await supabase
      .from("races")
      .select("year, round, circuits (circuitId, circuitRef, name, location, country, url)")
      .eq("year", req.params.year)
    if (data.length > 0) {
      res.send(data);
    }else{
      res.json(jsonMessage(`No circuits found in the year:${req.params.year}`));
    }
  });
}

//Handles all the routes that start with "constructors" (all of it goes through the constructors table). Returns data on all constructors, and a specific constructor based on constructorRef. 
const handleConstructors = (app) => {
  app.get("/api/constructors", async (req, res) => {
    const { data, error } = await supabase
      .from("constructors")
      .select();
    res.send(data);
  });

  app.get("/api/constructors/:ref", async (req, res) => {
    const { data, error } = await supabase
      .from("constructors")
      .select()
      .eq("constructorRef", req.params.ref.toLowerCase());
    if (data.length > 0) {
      res.send(data);
    }else{
      res.json(jsonMessage(`The Constructor:${req.params.ref} was not found`));
    }
  });
}

//Handles all the routes that start with "drivers" (most of it goes through drivers table). Returns data on all drivers, specific drivers from driverRef and raceId, and searches for drivers as well.
const handleDrivers = (app) => {
  app.get("/api/drivers", async (req, res) => {
    const { data, error } = await supabase
      .from("drivers")
      .select()
    res.send(data);
  });

  //Note: I made the following Case insensitive.
  app.get("/api/drivers/:ref", async (req, res) => {
    const { data, error } = await supabase
      .from("drivers")
      .select()
      .eq("driverRef", req.params.ref.toLowerCase());
    if (data.length > 0) {
      res.send(data);
    }else{
      res.json(jsonMessage(`The driver, ${req.params.ref}, was not found`));
    }
  });

  app.get("/api/drivers/search/:substring", async (req, res) => {
    const { data, error } = await supabase
      .from("drivers")
      .select()
      .ilike("surname", `${req.params.substring}%`)
    if (data.length > 0) {
      res.send(data);
    }else{
      res.json(jsonMessage(`No drivers found with the query:${req.params.substring}`));
    }
  });

  app.get("/api/drivers/race/:raceId", async (req, res) => {
    const { data, error } = await supabase
      .from("results")
      .select("drivers(*), races (name), raceId")
      .eq("raceId", req.params.raceId);
    if (data.length > 0) {
      res.send(data);
    }else{
      res.json(jsonMessage(`No drivers found with the raceId:${req.params.raceId}`));
    }
  });

}

//Handles all the routes that start with "races" (most of it goes through races table). Returns data on races. This includes specific races from raceId, year, year and round, and circuitRef (with year start and end parameters as well).
const handleRaces = (app) => {
  app.get("/api/races/:raceId", async (req, res) => {
    const { data, error } = await supabase
      .from("races")
      .select("raceId, round, name, date, url, circuits (name, location, country)")
      .eq("raceId", req.params.raceId);
    if (data.length > 0) {
      res.send(data);
    }else{
      res.json(jsonMessage(`No Race found, with raceId:${req.params.raceId}`));
    }
  });

  app.get("/api/races/season/:year", async (req, res) => {
    const { data, error } = await supabase
      .from("races")
      .select("*, circuits (name, location, country)")
      .eq("year", req.params.year)
      .order("round", { ascending: true });
    if (data.length > 0) {
      res.send(data);
    }else{
      res.json(jsonMessage(`No Race found, with the year:${req.params.year}`));
    }
  });

  app.get("/api/races/season/:year/:round", async (req, res) => {
    const { data, error } = await supabase
      .from("races")
      .select("raceId, round, name, date, year, url, circuits (name, location, country)")
      .eq("year", req.params.year)
      .eq("round", req.params.round);
    if (data.length > 0) {
      res.send(data);
    }else{
      res.json(jsonMessage(`No Race found with the year: ${req.params.year}, and round:${req.params.round}.`));
    }
  });

  app.get("/api/races/circuits/:ref", async (req, res) => {
    const { data, error } = await supabase
      .from("races")
      .select("raceId, year, circuits!inner (circuitRef, name, location)")
      .eq("circuits.circuitRef", req.params.ref)
      .order("year", { ascending: true });
    if (data.length > 0) {
      res.send(data);
    }else{
      res.json(jsonMessage(`No Race found with the ref:${req.params.ref}.`));
    }
  });

  app.get("/api/races/circuits/:ref/season/:start/:end", async (req, res) => {
    const { data, error } = await supabase
      .from("races")
      .select("*, circuits!inner (name, location, country)")
      .eq("circuits.circuitRef", req.params.ref)
      .gte("year", req.params.start)
      .lte("year", req.params.end)
    if (req.params.start > req.params.end){
      res.json(jsonMessage(`Invalid Range, end year is earlier than the start year.`));
    }else if(data.length > 0){
      res.send(data);
    }else{
      res.json(jsonMessage(`No Race found with the ref:${req.params.ref}, and in between ${req.params.start} to ${req.params.end}.`));
    }
  });
}

//Handles all the routes that start with "results" (all of it goes through Results table). Returns data on race results. This includes specific races from raceId, and driverRef (with year start and end parameters).
const handleResults = (app) => {
  app.get("/api/results/:raceId", async (req, res) => {
    const { data, error } = await supabase
      .from("results")
      .select("*, drivers!inner (driverRef, code, forename, surname), races!inner (name, round, year, date), constructors!inner (name, constructorRef, nationality)")
      .eq("raceId", req.params.raceId)
      .order("grid", { ascending: true });
    if (data.length > 0) {
      res.send(data);
    }else{
      res.json(jsonMessage(`No Race found with the raceId:${req.params.raceId}.`));
    }
  });

  app.get("/api/results/driver/:ref", async (req, res) => {
    const { data, error } = await supabase
      .from("results")
      .select("*, drivers!inner (driverRef, forename, surname), races!inner (name, round, year, date), constructors!inner (name, constructorRef, nationality)")
      .eq("drivers.driverRef", req.params.ref)
    if (data.length > 0) {
      res.send(data);
    }else{
      res.json(jsonMessage(`No race found with the driver ref:${req.params.ref}.`));
    }
  });

  app.get("/api/results/drivers/:ref/seasons/:start/:end", async (req, res) => {
  const { data, error } = await supabase
    .from("results")
    .select("*, drivers!inner (driverRef, forename, surname), races!inner (raceId, name, year, round), constructors!inner (name, constructorRef, nationality)")
    .eq("drivers.driverRef", req.params.ref)
    .gte("races.year", req.params.start)
    .lte("races.year", req.params.end)
    if (req.params.start > req.params.end){
      res.json(jsonMessage(`Invalid Range, end year is earlier than the start year.`));
    }else if(data.length > 0){
      res.send(data);
    }else{
      res.json(jsonMessage(`No Race found with the driver ref:${req.params.ref}, and in between ${req.params.start} to ${req.params.end}.`));
    }
  });
}

//Handles all the routes that start with "qualifying" (all of it goes through qualifying table). Returns data on qualifying using raceId.
const handleQualifying = (app) => {
  app.get("/api/qualifying/:raceId", async (req, res) => {
    const { data, error } = await supabase
      .from("qualifying")
      .select("*, drivers!inner (driverRef, code, forename, surname), races!inner (name, round, year, date), constructors!inner (name, constructorRef, nationality)")
      .eq("raceId", req.params.raceId)
      .order("position", { ascending: true });
    if (data.length > 0) {
      res.send(data);
    }else{
      res.json(jsonMessage(`No race found with the raceId:${req.params.raceId}.`));
    }
});
}

//Handles all the routes that start with "standings" (all of it goes through driver or constructors standing table). Returns standing's data for both drivers and constructors based on the raceId.
const handleStandings = (app) => {{
  app.get("/api/standings/drivers/:raceId", async (req, res) => {
    const { data, error } = await supabase
      .from("driverStandings")
      .select("*, drivers!inner (driverRef, code, forename, surname)")
      .eq("raceId", req.params.raceId)
      .order("position", { ascending: true });
    if (data.length > 0) {
      res.send(data);
    }else{
      res.json(jsonMessage(`No race found with the raceId:${req.params.raceId}.`));
    }
  });

  app.get("/api/standings/constructors/:raceId", async (req, res) => {
    const { data, error } = await supabase
      .from("constructorStandings")
      .select("*,  constructors!inner (name, constructorRef, nationality)")
      .eq("raceId", req.params.raceId)
      .order("position", { ascending: true });
    if (error){
      res.json(jsonMessage(`Gave letters instead of numbers for raceId:${req.params.raceId}.`));
    }
    else if (data.length > 0) {
      res.send(data);
    }else{
      res.json(jsonMessage(`No race found with the raceId:${req.params.raceId}.`));
    }
  });
}}

//Exports the module.
module.exports = {
  handleCircuits,
  handleConstructors,
  handleDrivers,
  handleQualifying,
  handleRaces,
  handleResults,
  handleStandings
};