const result = document.getElementById('result');
const extraResults = document.getElementById('extraResults');
const dateInput = document.getElementById('birthDate');
const timeInput = document.getElementById('birthTime');
const form = document.getElementById('ageForm');

function calculateAge(event) {
    event.preventDefault();
    result.textContent = '';
    extraResults.textContent = '';

    if (!dateInput.value) {
        result.textContent = 'Please enter a valid date.';
        return;
    }
    const birthDateString = dateInput.value + 'T' + (timeInput.value || '00:00');
    const birthDate = new Date(birthDateString);
    const now = new Date();
    if (isNaN(birthDate.getTime()) || birthDate > now) {
        result.textContent = 'Please enter a valid past date.';
        return;
    }

    // Calculate age in years, months, days
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();
    if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    // Age in weeks, hours, minutes, seconds
    const diffMs = now - birthDate;
    const ageInWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
    const ageInHours = Math.floor(diffMs / (1000 * 60 * 60));
    const ageInMinutes = Math.floor(diffMs / (1000 * 60));
    const ageInSeconds = Math.floor(diffMs / 1000);

    // Day of the week born
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[birthDate.getDay()];

    result.textContent = `You are ${years} ${years === 1 ? 'year' : 'years'}, ${months} ${months === 1 ? 'month' : 'months'}, and ${days} ${days === 1 ? 'day' : 'days'} old.`;
    extraResults.innerHTML = `
        <ul>
            <li>Day of the week born: <strong>${dayOfWeek}</strong></li>
            <li>Age in weeks: <strong>${ageInWeeks}</strong></li>
            <li>Age in hours: <strong>${ageInHours}</strong></li>
            <li>Age in minutes: <strong>${ageInMinutes}</strong></li>
            <li>Age in seconds: <strong>${ageInSeconds}</strong></li>
        </ul>
    `;
}

form.addEventListener('submit', calculateAge);
//allow the enter key to submit the form
form.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        calculateAge(event);
    }
});

dateInput.focus();
