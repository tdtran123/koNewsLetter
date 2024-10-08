# Event Cards Backend

This is a Node.js backend service for managing event cards. It is built with Express.js and MongoDB, and can be deployed on Render.

## Endpoints

### GET /api/events
Fetch all events.

### POST /api/events
Create a new event. The following JSON body should be provided:

```json
{
  "name": "Event Name",
  "date": "2024-10-08T10:00:00Z",
  "location": "Location Address",
  "url": "https://event-link.com"
}
