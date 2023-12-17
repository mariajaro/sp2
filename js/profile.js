const API_BASE_URL = 'https://api.noroff.dev';

async function loadUserProfile() {
    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('jwtToken');

    if (!userName || !token) {
        console.error('Not logged in. Redirecting to login page.');
        window.location.href = 'index.html';
        return;
    }

    try {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);

        const response = await fetch(`${API_BASE_URL}/api/v1/auction/profiles/${encodeURIComponent(data.name)}?_listings=true`, {
            headers: headers
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const profileData = await response.json();
        displayUserProfile(profileData);
    } catch (error) {
        console.error('Error loading user profile:', error.message);
    }
}

function displayUserProfile(data) {
    document.getElementById('userAvatar').src = data.avatar || 'default_avatar.jpg';
    document.getElementById('userCredits').textContent = `Credits: ${data.credits}`;
}

async function updateAvatar() {
    const avatarUrl = document.getElementById('avatarUrl').value;
    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('jwtToken');

    if (!avatarUrl || !userName || !token) {
        alert('Please provide all required data.');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/auction/profiles/${encodeURIComponent(userName)}/media`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ avatar: avatarUrl })
        });

        if (!response.ok) {
            throw new Error('Failed to update avatar');
        }

        alert('Avatar updated successfully!');
        loadUserProfile();
    } catch (error) {
        console.error('Error updating avatar:', error.message);
        alert('Error updating avatar. Please try again.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const updateAvatarForm = document.getElementById('updateAvatarForm');
    if (updateAvatarForm) {
        updateAvatarForm.addEventListener('submit', function(event) {
            event.preventDefault();
            updateAvatar();
        });
    }

    loadUserProfile(); 
});
