// Task 1: Setup Basic HTML Structure
// This was done in the index.html file. I created the structure including placing for tickets and errors to be input from the API.


// Task 2 & 3 : Fetch Tickets Using Async/Await and Handle Errors & Dynamically Display Tickets
// This task will pull the dataset from the API and catch errors. Uncaught errors will create a new customer error. It will also place all of our tickets into the ticket list.

const tickets = document.getElementById("tickets"); // Create tickets variable
const errors = document.getElementById("errors"); // Create errors variable
const loading = document.getElementById("loading"); // Create loading variable

async function fetchUnresolvedTickets() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/');

        if (!response.ok) {
            throw new Error('Could not fetch tickets at this time.');
        }
        const unresolvedTickets = await response.json();

        if (unresolvedTickets.length === 0) {
            throw new Error('No unresolved tickets found.')
        }

        errors.textContent = "";

        unresolvedTickets.forEach(ticket => {

            const listItem = document.createElement('li');

            const ticketId = document.createElement('div');
            ticketId.textContent = `Ticket ID: ${ticket.id}`;

            const userId = document.createElement('div');
            userId.textContent = `User ID: ${ticket.userId}`;

            const issueDescription = document.createElement('div');
            issueDescription.textContent = `Issue Description: ${ticket.title}`;

            const details = document.createElement('div');
            details.textContent = `Details: ${ticket.body}`;

            const divider = document.createElement('br');
            divider.textContent = "";

            listItem.appendChild(ticketId);
            listItem.appendChild(userId);
            listItem.appendChild(issueDescription);
            listItem.appendChild(details);
            listItem.appendChild(divider);
            
            tickets.appendChild(listItem);
        });

    } catch (error) {
            errors.textContent = error.message;
            console.error('Error:', error.message);
    } finally {
        loading.style.display = "none"; 
    }
}
fetchUnresolvedTickets();

