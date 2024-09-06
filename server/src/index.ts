import express from 'express';
import {Request, Response, NextFunction } from 'express';
import { createClient } from 'redis';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const client = createClient();
const app = express();
app.use(express.json()); // For parsing application/json
//start the redis client
client.on('error', (err) => {
  console.error('Redis error:', err);
});

client.on('connect', () => {
  console.log('Redis client connected');
});


client.connect();
//app.use(express.json());
//
const fetchWeatherData = async (location: string) => {
    const unitSystem = "us"
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Chandler%2C%20Az?unitGroup=us&key=XGQ5CQJVT4T4RGFW5HQQ67R3G&contentType=json"
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitSystem}&key=${process.env.WEATHER_API_KEY}&contentType=json`
  const response = await axios.get(url);
  return response.data;
};

app.get('/weather', async (req: Request, res: Response, next: NextFunction) => {
    const { location } = req.body;
    console.log(location);
    
  
    try {
        // Check if the data is in Redis
        const cachedData = await client.get(location);
      
        if (cachedData) {
          // Data found in cache
          console.log('Cache hit');
          res.json(JSON.parse(cachedData));
        } else {
          // Data not found in cache, fetch from API
          console.log('Cache miss');
          const weatherData = await fetchWeatherData(location);
    
          // Store data in Redis with an expiration time (e.g., 3600 seconds = 1 hour)
          await client.setEx(location, 3600, JSON.stringify(weatherData));
    
          // Send the data back to the client
          res.json(weatherData);
        }
      } catch (error) {
        next(error)
        //res.status(500).json({ error: 'An error occurred' });
      }
    });


//start the app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

