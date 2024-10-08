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
    const newEvent = { 
        ...req.body, 
        id: Date.now().toString() // Add a unique ID based on timestamp 
    }; 
    const events = readEvents(); 
    events.push(newEvent); 
    writeEvents(events); 
    res.json(newEvent);
});

// API: Delete an event
app.delete('/api/events/:id', (req, res) => {
    const eventId = req.params.id; // Get the event ID from the URL
    let events = readEvents(); // Read current events

    // Find the index of the event with the given ID
    const eventIndex = events.findIndex(event => event.id === eventId);

    if (eventIndex !== -1) {
        // Remove the event from the array
        events.splice(eventIndex, 1);
        writeEvents(events); // Write the updated events back to the file
        res.status(204).send(); // Send a 204 No Content response
    } else {
        res.status(404).json({ error: 'Event not found' }); // Handle the case where the event is not found
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
