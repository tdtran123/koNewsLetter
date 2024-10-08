document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'https://your-app-name.onrender.com/api/events'; // Replace with your Render backend URL
  
    // Fetch and display existing events
    fetch(apiURL)
      .then(response => response.json())
      .then(data => displayEvents(data));
  
    // Add event form submission
    document.getElementById('event-form').addEventListener('submit', (e) => {
      e.preventDefault();
  
      const name = document.getElementById('name').value;
      const date = document.getElementById('date').value;
      const location = document.getElementById('location').value;
      const url = document.getElementById('url').value;
  
      const newEvent = { name, date, location, url };
  
      // Send new event to the server
      fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEvent)
      })
      .then(response => response.json())
      .then(data => {
        // Display the new event on the page
        displayEvent(data);
        document.getElementById('event-form').reset();
      });
    });
  
    // Function to display a single event
    function displayEvent(event) {
      const eventCards = document.getElementById('event-cards');
      const card = document.createElement('div');
      card.classList.add('event-card');
      
      card.innerHTML = `
        <h2>${event.name}</h2>
        <p>Date: ${new Date(event.date).toLocaleString()}</p>
        <p>Location: ${event.location}</p>
        <p><a href="${event.url}" target="_blank">Event Link</a></p>
      `;
      
      eventCards.appendChild(card);
    }
  
    // Function to display multiple events
    function displayEvents(events) {
      events.forEach(event => displayEvent(event));
    }
  });
  