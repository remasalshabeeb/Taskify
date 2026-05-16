window.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('darkModeToggle');
    const themeImg = document.getElementById('themeIconImg');

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeImg.src = "../Elements/bulb (1).png"; 
    } else {
        themeImg.src = "../Elements/bulb.png"; 
    }

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            themeImg.src = "../Elements/bulb (1).png";
            localStorage.setItem('theme', 'dark');
        } 
        else {
            themeImg.src = "../Elements/bulb.png";
            localStorage.setItem('theme', 'light');
        }
    });
});





//جزئية تابعه ل الcontant
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target;
    const successAlert = document.getElementById('contactSuccessAlert');

    if (form.checkValidity()) {
        successAlert.classList.remove('d-none'); 
        form.reset(); 
        form.classList.remove('was-validated');
        
        setTimeout(() => { successAlert.classList.add('d-none'); }, 3000);
    } else {
        form.classList.add('was-validated');
    }
});