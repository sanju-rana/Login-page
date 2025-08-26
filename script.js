document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let isValid = true;
    
    // Reset error states
    document.getElementById('email').parentElement.classList.remove('error');
    document.getElementById('password').parentElement.classList.remove('error');
    
    // Check if fields are empty
    if (!email && !password) {
        document.getElementById('email').parentElement.classList.add('error');
        document.getElementById('password').parentElement.classList.add('error');
        showToast('Please enter both email and password');
        isValid = false;
        return;
    }
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        document.getElementById('email').parentElement.classList.add('error');
        showToast('Email is required');
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById('email').parentElement.classList.add('error');
        showToast('Please enter a valid email address');
        isValid = false;
    }
    
    // Password validation
    if (!password) {
        document.getElementById('password').parentElement.classList.add('error');
        showToast('Password is required');
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('password').parentElement.classList.add('error');
        showToast('Password must be at least 6 characters');
        isValid = false;
    }
    
    if (isValid) {
        // Check if credentials match demo credentials
        if (email === 'demo@codexintern.com' && password === 'demo123') {
            // Show success message
            document.getElementById('successMessage').style.display = 'block';
            
            // Show success toast
            showToast('Login successful! Welcome to CODEXINTERN.', 'success');
            
            // Reset form
            document.getElementById('loginForm').reset();
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'none';
            }, 3000);
        } else {
            showToast('Invalid credentials. Please use demo@codexintern.com / demo123');
        }
    }
});

function showToast(message, type = 'error') {
    const toast = document.getElementById('errorToast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.className = 'toast';
    
    if (type === 'success') {
        toast.classList.add('success');
    }
    
    toast.classList.add('show');
    
    // Hide toast after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}