const API_BASE_URL = 'https://api.noroff.dev';

const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get('id'); 

if (itemId) {
    fetchItemDetails(itemId);
    setupFormSubmission();
} else {
    console.error('No item ID found in URL.');
}

async function fetchItemDetails(itemId, includeSeller = false, includeBids = false) {
    try {
        let apiUrl = `${API_BASE_URL}/api/v1/auction/listings/${itemId}`;
        const queryParams = [];

        if (includeSeller) {
            queryParams.push('_seller=true');
        }

        if (includeBids) {
            queryParams.push('_bids=true');
        }

        if (queryParams.length > 0) {
            apiUrl += `?${queryParams.join('&')}`;
        }

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch item details: ${response.status} ${response.statusText}`);
        }

        const itemDetails = await response.json();
        displayItemDetails(itemDetails);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function displayItemDetails(item) {
    document.getElementById('itemTitle').textContent = item.title;
    document.getElementById('itemImage').src = item.media[0] || 'default_image.jpg';
    document.getElementById('itemDescription').textContent = item.description;
}

function setupFormSubmission() {
    const bidForm = document.getElementById('addBidForm');
    if (bidForm) {
        bidForm.addEventListener('submit', handleBidSubmit);
    }
}

function handleBidSubmit(event) {
    event.preventDefault(); 


    window.location.href = 'index.html'; 
}
