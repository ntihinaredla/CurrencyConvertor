// Currency selection and flag image elements
let currency_from = document.querySelector(".from .select-container select");
let currency_to = document.querySelector(".to .select-container select");
let flag_from = document.querySelector(".from .select-container img");
let flag_to = document.querySelector(".to .select-container img");

// Populate currency dropdowns
for (let currency in countryList) {
    let option_from = document.createElement("option");
    option_from.innerText = currency;
    option_from.value = currency; // Set value for easier access
    currency_from.append(option_from);

    let option_to = document.createElement("option");
    option_to.innerText = currency;
    option_to.value = currency; // Set value for easier access
    currency_to.append(option_to);
}

// Default currencies
let from = 'EUR';
let to = 'INR';

// Update flags based on selected currency
currency_from.addEventListener('change', (event) => {
    from = event.target.value;
    let flag = countryList[from];
    flag_from.setAttribute('src', `https://flagsapi.com/${flag}/flat/64.png`);
});

currency_to.addEventListener('change', (event) => {
    to = event.target.value;
    let flag = countryList[to];
    flag_to.setAttribute('src', `https://flagsapi.com/${flag}/flat/64.png`);
});

// Handle conversion on button click
let button = document.getElementById('conversion');
button.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent form submission

    let url_value = from.toLowerCase();
    let URL = `https://latest.currency-api.pages.dev/v1/currencies/${url_value}.json`;

    try {
        let response = await fetch(URL);
        if (!response.ok) throw new Error('Network response was not ok');

        let data = await response.json();
        let rate = data[url_value][to.toLowerCase()];

        // Get input amount and calculate conversion
        let amount = document.querySelector('.amount input');
        let amount_value = parseFloat(amount.value);

        // Show result
        let message = document.querySelector('.msg');
        if (!isNaN(amount_value)) {
            message.innerText = `${amount_value} ${from} = ${(rate * amount_value).toFixed(2)} ${to}`;
        } else {
            message.innerText = "Please enter a valid amount.";
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        let message = document.querySelector('.msg');
        message.innerText = "Failed to retrieve exchange rate. Please try again.";
    }
});
