export async function getListings() {
    try {
        const timestamp = new Date().getTime();
        const apiUrl = `https://api.noroff.dev/api/v1/auction/listings?_bids=true&_timestamp=${timestamp}&sort=created`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch listings');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching listings:', error.message);
        throw error;
    }
}

export function createListingsHTML(listings) {
    const container = document.getElementById('listingsContainer');

    listings.forEach(listing => {
        const listingElement = document.createElement('div');
        listingElement.classList.add('col-md-4', 'mb-4');
        listingElement.setAttribute('data-id', listing.id);
        listingElement.addEventListener('click', function() {
            window.location.href = `listing-details.html?id=${listing.id}`;
        });

        const title = document.createElement('h2');
        title.innerText = listing.title;
        title.classList.add('headingTwo');
        listingElement.append(title);

        const image = document.createElement('img');
        image.src = listing.media && listing.media.length > 0 ? listing.media[0] : 'default_image.jpg';
        image.alt = listing.title;
        image.classList.add('card-image', 'my-3');
        listingElement.append(image);

        container.append(listingElement);
    });
}

document.addEventListener('DOMContentLoaded', async function () {
    const listings = await getListings();
    createListingsHTML(listings);
});
