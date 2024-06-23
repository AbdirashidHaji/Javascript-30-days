document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    validateForm();
});

function validateForm() {
    // Clear previous error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => {
        message.style.display = 'none';
    });

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let isValid = true;

    // Validate name
    if (name === '') {
        setError('name', 'Name is required');
        isValid = false;
    }

    // Validate email
    if (email === '') {
        setError('email', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        setError('email', 'Email is not valid');
        isValid = false;
    }

    // Validate password
    if (password === '') {
        setError('password', 'Password is required');
        isValid = false;
    } else if (password.length < 6) {
        setError('password', 'Password must be at least 6 characters long');
        isValid = false;
    }

    if (isValid) {
        alert('Form submitted successfully!');
    }
}

function setError(field, message) {
    const formField = document.getElementById(field);
    const errorMessage = formField.nextElementSibling;
    errorMessage.innerText = message;
    errorMessage.style.display = 'block';
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}
