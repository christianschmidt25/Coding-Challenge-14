// Task 1: Setup Basic HTML Structure
// This was done in the index.html file. I created the structure including placing for tickets and errors to be input from the API.


// Task 2 & 3 : Fetch Tickets Using Async/Await and Handle Errors & Dynamically Display Tickets
// This task will pull the dataset from the API and catch errors. Uncaught errors will create a new customer error. It will also place all of our tickets into the ticket list.

const tickets = document.getElementById("tickets"); // Create tickets variable
const errors = document.getElementById("errors"); // Create errors variable
const loading = document.getElementById("loading"); // Create loading variable

async function fetchUnresolvedTickets() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/'); //pulls the data inside this link

        if (!response.ok) {
            throw new Error('Could not fetch tickets at this time.'); //if fetch does not work, it will load this pop-up message
        }
        const unresolvedTickets = await response.json(); //transforms the data into JSON formatting for our use

        if (unresolvedTickets.length === 0) {
            throw new Error('No unresolved tickets found.') //if there are 0 tickets, this message will appear
        }

        errors.textContent = ""; 

        unresolvedTickets.forEach(ticket => {

            const listItem = document.createElement('li'); //creates list item

            const ticketId = document.createElement('div'); //variable to create ticketId from API
            ticketId.textContent = `Ticket ID: ${ticket.id}`;

            const userId = document.createElement('div'); //variable to create userId from API
            userId.textContent = `User ID: ${ticket.userId}`;

            const issueDescription = document.createElement('div'); //variable to create description from API
            issueDescription.textContent = `Issue Description: ${ticket.title}`;

            const details = document.createElement('div'); //variable to create details from API
            details.textContent = `Details: ${ticket.body}`;

            const divider = document.createElement('br'); //adds spacing between tickets
            divider.textContent = "";


            // Add all of the above variables into a single List item
            listItem.appendChild(ticketId);
            listItem.appendChild(userId);
            listItem.appendChild(issueDescription);
            listItem.appendChild(details);
            listItem.appendChild(divider);
            
            //adds this combined listItem into the tickets list
            tickets.appendChild(listItem);
        });

    } catch (error) { //catches errors and puts them in errors part of webpage
            errors.textContent = error.message;
            console.error('Error:', error.message);
    } 
    // Task 4: Use Finally to Clean Up Fetch

    finally { 
        loading.style.display = "none"; 
    }
}
fetchUnresolvedTickets();

