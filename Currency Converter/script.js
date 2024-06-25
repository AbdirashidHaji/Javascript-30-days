// script.js

const apiUrl = 'https://v6.exchangerate-api.com/v6/aff9a433427b7677144081ff/latest/USD';

async function fetchExchangeRates() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.conversion_rates;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function convert() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (fromCurrency === toCurrency) {
        document.getElementById('result').innerText = `Same currency selected`;
        return;
    }

    if (amount === '' || isNaN(amount)) {
        document.getElementById('result').innerText = `Please enter a valid amount`;
        return;
    }

    try {
        const rates = await fetchExchangeRates();
        
        if (!rates) {
            throw new Error(`Failed to fetch exchange rates. Please try again later.`);
        }

        const rate = rates[toCurrency];
        
        if (!rate) {
            throw new Error(`Conversion rate not available for ${toCurrency}`);
        }

        const convertedAmount = (amount * rate).toFixed(2);
        document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error('Error converting currency:', error);
        document.getElementById('result').innerText = `Failed to convert currency. Please try again later.`;
    }
}
