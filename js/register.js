export function validateRegistrationInputs(name, email, password) {
    return (
        name.length >= 1 &&
        password.length >= 8 &&
        email.match(/^[\w\-.]+@stud\.noroff\.no$/)
    );
}

export async function handleRegistration(event) {
    event.preventDefault();

    const nameInput = document.getElementById('registerName');
    const emailInput = document.getElementById('registerEmail');
    const passwordInput = document.getElementById('registerPassword');

    if (validateRegistrationInputs(nameInput.value, emailInput.value, passwordInput.value)) {
        try {
            await registerUser(nameInput.value, emailInput.value, passwordInput.value);

            const closeButton = document.querySelector('#registerModal .btn-close');
            closeButton.click();
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again later.');
        }
    } else {
        alert('Name must be 1 character long. Password must be 8 characters long, and email must be a valid Noroff student email');
    }
}

export async function registerUser(name, email, password) {
    const registerUrl = 'https://api.noroff.dev/api/v1/auction/auth/register';
    const userData = {
        name: name,
        email: email,
        password: password,
    };

    const postData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    };

    try {
        const response = await fetch(registerUrl, postData);

        if (response.ok) {
            const data = await response.json();
            const token = data.accessToken;

            localStorage.setItem('jwtToken', token);
            console.log('Email:', email);
        } else {
            console.error('Registration failed. Please try again.');
            alert('Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        throw error; 
}
}

const submitRegisterButton = document.getElementById('submitRegisterButton');
submitRegisterButton.addEventListener('click', handleRegistration);

