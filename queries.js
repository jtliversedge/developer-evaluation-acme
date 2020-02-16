const { pool } = require('./config');
const fetch = require('node-fetch');


//Get all Profiles in table profiles
const getProfiles = (req, res) => {
  pool.query('SELECT * FROM profiles', async (error, results) => {
    if (error) {
      throw error
    }
    //results.rows = await getWeatherData(results.rows);
    for(i=0;i<results.rows.length;i++){

      const response = await fetch('https://api.weather.gov/points/'+results.rows[i].latitude+','+results.rows[i].longitude);
      const json = await response.json();
      results.rows[i].city = json.properties.relativeLocation.properties.city;
      results.rows[i].state = json.properties.relativeLocation.properties.state;
      const url= ""+json.properties.forecastGridData;
      const response_temp = await fetch(url);
      const json_temp = await response_temp.json();
      const tempCToF = ((json_temp.properties.temperature.values[0].value * (9/5))+32).toFixed(0);
      results.rows[i].current_temperature = tempCToF+"F";

    }

    res.status(200).json(results.rows);
  })
};

//Create new profile with given id from params
const createProfile = (req, res) => {
  const persona_id = req.params.id;
  const {first_name,last_name,interests,latitude,longitude } = req.body

  pool.query('INSERT INTO profiles (persona_id,first_name,last_name,interests,latitude,longitude) VALUES ($1, $2, $3, $4, $5, $6)', [persona_id, first_name,last_name,interests,latitude,longitude], (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User added successfully with ID:${persona_id}`)
  })
}

//Get profile of given id
const getProfileById = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM profiles WHERE persona_id = $1', [id], async (error, results) => {
    if (error) {
      throw error
    }

    const response = await fetch('https://api.weather.gov/points/'+results.rows[0].latitude+','+results.rows[0].longitude);
    const json = await response.json();
    results.rows[0].city = json.properties.relativeLocation.properties.city;
    results.rows[0].state = json.properties.relativeLocation.properties.state;
    const url= ""+json.properties.forecastGridData;
    const response_temp = await fetch(url);
    const json_temp = await response_temp.json();
    const tempCToF = ((json_temp.properties.temperature.values[0].value * (9/5))+32).toFixed(0);
    results.rows[0].current_temperature = tempCToF+"F";

    res.status(200).json(results.rows)
  })
}


//Update entry for profile at given id
const updateProfile = (req, res) => {
  const persona_id = parseInt(req.params.id)
  const { first_name,last_name,interests,latitude,longitude } = req.body

  pool.query(
    'UPDATE profiles SET first_name = $2, last_name = $3, interests = $4, latitude = $5, longitude=$6 WHERE persona_id = $1',
    [persona_id, first_name,last_name,interests,latitude,longitude],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User modified with ID: ${persona_id}`)
    }
  )
}

//Delete profile at given id
const deleteProfile = (req, res) => {
  const persona_id = parseInt(req.params.id)

  pool.query('DELETE FROM profiles WHERE persona_id = $1', [persona_id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`User deleted with ID: ${persona_id}`)
  })
}


module.exports = {
  getProfiles,
  createProfile,
  getProfileById,
  updateProfile,
  deleteProfile,

}
