const quotes = [
    {
        quote: "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Abdirashid Haji"
    },
    {
        quote: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Abdirashid Haji"
    },
    {
        quote: "Do not watch the clock. Do what it does. Keep going.",
        author: "Abdirashid Haji"
    },
    {
        quote: "Keep your face always toward the sunshine—and shadows will fall behind you.",
        author: "Abdirashid Haji"
    },
    {
        quote: "The best way to predict the future is to create it.",
        author: "Abdirashid Haji"
    }
];

document.getElementById('new-quote').addEventListener('click', generateQuote);

function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById('quote').textContent = quote.quote;
    document.getElementById('author').textContent = `- ${quote.author}`;
}

// Generate a quote on page load
generateQuote();
