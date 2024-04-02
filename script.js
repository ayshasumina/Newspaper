const apiKey = '8bb47484efe544fba63a6a347d585718'; // Replace 'YOUR_API_KEY' with your actual API key from News API
const apiUrl = 'https://newsapi.org/v2/top-headlines';

async function fetchHeadlines(countryCode) {
    try {
        const response = await fetch(`${apiUrl}?country=${countryCode}&apiKey=${apiKey}`);
        const data = await response.json();
        return data.articles.slice(0, 5); // Get top 5 headlines
    } catch (error) {
        console.error('Error fetching headlines:', error);
        return [];
    }
}

function displayHeadlines(headlines) {
    const headlinesContainer = document.getElementById('headlines');
    headlinesContainer.innerHTML = ''; // Clear previous headlines

    headlines.forEach((headline) => {
        const headlineDiv = document.createElement('div');
        headlineDiv.classList.add('headline');
        headlineDiv.innerHTML = `
            <h3>${headline.title}</h3>
            <p><strong>Source:</strong> ${headline.source.name}</p>
            <p><strong>Date:</strong> ${new Date(headline.publishedAt).toLocaleDateString()}</p>
            <p><a href="${headline.url}" target="_blank">Read more</a></p>
        `;
        headlinesContainer.appendChild(headlineDiv);
    });
}

async function searchHeadlines() {
    const countryInput = document.getElementById('countryInput');
    const countryCode = countryInput.value.trim().toLowerCase();

    if (countryCode.length === 2) {
        const headlines = await fetchHeadlines(countryCode);
        displayHeadlines(headlines);
    } else {
        alert('Please enter a valid 2-letter country code.');
    }
}
