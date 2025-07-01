const result = document.getElementById('result');
const input = document.getElementById('birthYear');
const calculateButton = document.getElementById('calculate');

function calculateAge() {

    //calculate the age in day, month and year
    result.textContent = ''; // Clear previous result
    if (!input.value) {
        result.textContent = 'Please enter a valid date.';
        return;
    }
    const birthDate = new Date(input.value);
    if (isNaN(birthDate.getTime())) {
        result.textContent = 'Please enter a valid date.';
        return;
    }

    const currentDate = new Date();
    const ageInMilliseconds = currentDate - birthDate;
    const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
    const ageInMonths = Math.floor((ageInMilliseconds % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30));
    const ageInDays = Math.floor((ageInMilliseconds % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));

    result.textContent = `You are ${ageInYears} years, ${ageInMonths} months, and ${ageInDays} days old.`;
    result.style.display = 'block';
}

calculateButton.addEventListener('click', calculateAge);
// input.addEventListener('keypress', function(event) {
//     if (event.key === 'Enter') {
//         calculateAge();
//     }
// });
// input.focus();
