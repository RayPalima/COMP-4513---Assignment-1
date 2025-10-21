const supa = require('@supabase/supabase-js');
require('dotenv').config();

const supaUrl = process.env.SUPABASE_URL || 'https://gxrnaymgawdvwwgqzzty.supabase.co';
const supaAnonKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4cm5heW1nYXdkdnd3Z3F6enR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4NzYyMDMsImV4cCI6MjA3NjQ1MjIwM30.vsiIduM81WnULdpLZbYBQtvSpeAQ16DQ6djGvkfdUNU';
const supabase = supa.createClient(supaUrl, supaAnonKey);

const jsonMessage = (msg) => {
    return { error : msg };
};

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

const handleDrivers = (app) => {
  app.get("/api/drivers", async (req, res) => {
    const { data, error } = await supabase
      .from("drivers")
      .select()
    res.send(data);
  });

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

  // app.get("/api/drivers/race/:raceId", async (req, res) => {
  //   const { data, error } = await supabase
  //     .from("results")
  //     .select("results")
  //     .eq("raceId", req.params.raceId);
  //   if (data.length > 0) {
  //     res.send(data);
  //   }else{
  //     res.json(jsonMessage(`No drivers found with the raceId:${req.params.raceId}`));
  //   }
  // });

}

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
      .select("raceId, round, name, date, year, url, circuits (name, location, country)")
      .eq("circuits.circuitRef", req.params.ref)
      .gte("year", req.params.start)
      .lte("year", req.params.end)
    res.send(data);
  });
}

const handleResults = (app) => {
  app.get("/api/results/:raceId", async (req, res) => {
    const { data, error } = await supabase
      .from("results")
      .select("resultId, number, grid, position, points, laps, time, drivers!inner (driverRef, code, forename, surname), races!inner (raceId, name, round, year, date), constructors!inner (name, constructorRef, nationality)")
      .eq("races.raceId", req.params.raceId)
      .order("grid", { ascending: true });
    if (data.length > 0) {
      res.send(data);
    }else{
      res.json(jsonMessage(`No Race found with the raceId:${req.params.raceId}.`));
    }
  });
}

const handleQualifying = (app) => {

}

const handleStandings = (app) => {{

}}

module.exports = {
  handleCircuits,
  handleConstructors,
  handleDrivers,
  handleQualifying,
  handleRaces,
  handleResults,
  handleStandings
};