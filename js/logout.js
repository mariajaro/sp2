export async function logoutUser() {
    try {
        localStorage.removeItem('jwtToken');
        console.log('The user has been logged out');
        updateButtonVisibility();

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } catch (error) {
        console.error('Error logging out:', error.message);
    }
}

export async function updateButtonVisibility() {
    const registerButton = document.getElementById('registerButton');
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const profileButton = document.getElementById('profileButton');

    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
        logoutButton.style.display = 'inline-block';
        profileButton.style.display = 'inline-block';
        registerButton.style.display = 'none';
        loginButton.style.display = 'none';
    } else {
        logoutButton.style.display = 'none';
        profileButton.style.display = 'none';
        registerButton.style.display = 'inline-block';
        loginButton.style.display = 'inline-block';
    }
}

const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', logoutUser);

document.addEventListener('DOMContentLoaded', updateButtonVisibility);