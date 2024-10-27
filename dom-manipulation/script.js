// Array to store quotes
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Life" }
];

// Load quotes from local storage on initialization
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (quotes.length === 0) {
        quoteDisplay.innerHTML = "No quotes available.";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.innerHTML = `<strong>${quotes[randomIndex].text}</strong> - <em>${quotes[randomIndex].category}</em>`;
    
    // Store the last viewed quote in session storage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quotes[randomIndex]));
}

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;

    if (quoteText && quoteCategory) {
        // Create a new quote object
        const newQuote = { text: quoteText, category: quoteCategory };
        // Add the new quote to the quotes array
        quotes.push(newQuote);
        saveQuotes(); // Save updated quotes to local storage
        // Clear the input fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert("Quote added successfully!");
    } else {
        alert("Please enter both a quote and a category.");
    }
}

// Function to create the form for adding quotes
function createAddQuoteForm() {
    const formContainer = document.createElement('div');

    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.type = 'text';
    quoteInput.placeholder = 'Enter a new quote';

    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.onclick = addQuote; // Set the onclick event to call addQuote

    // Append inputs and button to the form container
    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);

    // Append the form to the body or a specific container in your HTML
    document.body.appendChild(formContainer);
}

// Function to export quotes to a JSON file
function exportQuotes() {
    const jsonQuotes = JSON.stringify(quotes, null, 2); // Pretty print JSON
    const blob = new Blob([jsonQuotes], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up
}

// Event listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Create the add quote form when the script loads
createAddQuoteForm();
loadQuotes(); // Load quotes from local storage when the script runs

// updated code 

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes(); // Save updated quotes to local storage
        alert('Quotes imported successfully!');
        showRandomQuote(); // Optionally show a random quote after import
    };
    fileReader.readAsText(event.target.files[0]);
}

// Create file input for importing quotes
function createImportButton() {
    const importContainer = document.createElement('div');

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json'; // Accept only JSON files
    fileInput.addEventListener('change', importFromJsonFile); // Use addEventListener to handle file selection

    const importButton = document.createElement('button');
    importButton.textContent = 'Import Quotes';
    importButton.onclick = () => fileInput.click(); // Trigger file input click

    importContainer.appendChild(fileInput);
    importContainer.appendChild(importButton);
    document.body.appendChild(importContainer);
}

// Call this function to create the import button when the script loads
createImportButton();

// End of task 1

// Load quotes and last selected category from local storage on initialization
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';
    document.getElementById('categoryFilter').value = lastSelectedCategory;
    filterQuotes(); // Display quotes based on last selected category
}

// Function to populate categories in the dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = new Set(quotes.map(quote => quote.category));

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = ''; // Clear existing quotes

    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.innerHTML = `<strong>${quote.text}</strong> - <em>${quote.category}</em>`;
        quoteDisplay.appendChild(quoteElement);
    });

    // Store the last selected category in local storage
    localStorage.setItem('lastSelectedCategory', selectedCategory);
}

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;

    if (quoteText && quoteCategory) {
        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);
        saveQuotes(); // Save updated quotes to local storage
        populateCategories(); // Update categories in the dropdown
        filterQuotes(); // Update displayed quotes
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert("Quote added successfully!");
    } else {
        alert("Please enter both a quote and a category.");
    }
}

// Call functions to initialize the application
loadQuotes();
populateCategories();

// End of task 2

// Define the API endpoint
const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Example API for demonstration

// Function to send a POST request
async function sendPostRequest() {
    // Data to be sent in the request body
    const data = {
        title: 'foo',
        body: 'bar',
        userId: 1
    };

    try {
        // Sending the POST request
        const response = await fetch(API_URL, {
            method: 'POST', // Specify the request method
            headers: {
                'Content-Type': 'application/json' // Set the Content-Type header
            },
            body: JSON.stringify(data) // Convert the data to a JSON string
        });

        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const jsonResponse = await response.json();
        console.log('Response from server:', jsonResponse); // Log the response

    } catch (error) {
        console.error('Error sending POST request:', error); // Handle errors
    }
}

// Call the function to send the POST request
sendPostRequest();