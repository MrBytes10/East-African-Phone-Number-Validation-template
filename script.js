let errorCount = 0;

document.getElementById('phoneForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const countryCode = document.getElementById('countryCode').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const errorMessage = document.getElementById('errorMessage');
    const form = document.getElementById('phoneForm');
    
    // Remove any non-digit characters
    const inputNumber = phoneNumber.replace(/\D/g, '');

    let isValid = false;
    let expectedLength;
    
    const validateNumber = (regex, length) => {
        // Check if the input contains any non-digit characters
        if (/\D/.test(inputNumber)) {
            return false;
        }
        
        let cleanNumber = inputNumber;
        if (cleanNumber.startsWith('0')) {
            cleanNumber = cleanNumber.substring(1);
        }
        return regex.test(cleanNumber) && cleanNumber.length === length;
    };
    
    // Validate that the cleaned number matches the original input length
    if (inputNumber.length !== phoneNumber.length) {
        isValid = false;
    } else {
        switch(countryCode) {
            case '+254': // Kenya
                expectedLength = 9;
                isValid = validateNumber(/^(?:7|1)\d{8}$/, 9);
                break;
            case '+256': // Uganda
                expectedLength = 9;
                isValid = validateNumber(/^[7]\d{8}$/, 9);
                break;
            case '+255': // Tanzania
                expectedLength = 9;
                isValid = validateNumber(/^[67]\d{8}$/, 9);
                break;
            case '+250': // Rwanda
                expectedLength = 9;
                isValid = validateNumber(/^[7]\d{8}$/, 9);
                break;
            case '+257': // Burundi
                expectedLength = 8;
                isValid = validateNumber(/^[67]\d{7}$/, 8);
                break;
        }
    }
    
    if (!isValid) {
        errorCount++;
        let message;
        if (errorCount === 1) {
            message = `Please enter a valid ${expectedLength}-digit phone number (numbers only) for the selected country.`;
        } else {
            const phrases = [
                `Oops! That's not quite right. `,
                `Let's try again. `,
                `Almost there, but not quite. `,
                `One more attempt? `
            ];
            const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
            message = `${randomPhrase}Enter a valid ${expectedLength}-digit number (no letters or special characters) for this country code.`;
        }
        
        // Add animation class
        form.classList.add('shake');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            form.classList.remove('shake');
        }, 500);
        
        errorMessage.textContent = message;
        errorMessage.style.opacity = 0;
        
        // Fade in the error message
        setTimeout(() => {
            errorMessage.style.opacity = 1;
        }, 10);
    } else {
        errorMessage.textContent = '';
        alert('Valid phone number! Proceeding with login...');
        // Here you would typically send the data to your server
    }
});

// Reset error count when input changes
document.getElementById('phoneNumber').addEventListener('input', function() {
    errorCount = 0;
});

document.getElementById('countryCode').addEventListener('change', function() {
    errorCount = 0;
});