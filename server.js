const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const eventsFilePath = path.join(__dirname, 'events.json');

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Helper function to read events from JSON file
function readEvents() {
  try {
    const data = fs.readFileSync(eventsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Helper function to write events to JSON file
function writeEvents(events) {
  fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2));
}

// API: Get all events
app.get('/api/events', (req, res) => {
  const events = readEvents();
  res.json(events);
});

// API: Add a new event
app.post('/api/events', (req, res) => {
  const newEvent = req.body;
  const events = readEvents();
  events.push(newEvent);
  writeEvents(events);
  res.json(newEvent);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
