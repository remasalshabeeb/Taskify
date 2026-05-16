const today = new Date(); 

let currentDate = new Date(today.getFullYear(), today.getMonth(), 1); 

document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
    setupNavigation();
});

function renderCalendar() {
    const grid = document.getElementById('calendarDaysGrid');
    const title = document.getElementById('calendarTitle');
    
    const tasksList = JSON.parse(localStorage.getItem('savedTasks')) || [];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    title.innerText = `${monthNames[month]} ${year}`;

    grid.innerHTML = '';

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevTotalDays = new Date(year, month, 0).getDate();

    for (let i = firstDayIndex; i > 0; i--) {
        const dayNum = prevTotalDays - i + 1;
        grid.innerHTML += `<div class="calendar-card-day neighbor-month"><span class="fw-semibold small">${dayNum}</span></div>`;
    }

    for (let day = 1; day <= totalDays; day++) {
        const formattedMonth = (month + 1) < 10 ? `0${month + 1}` : month + 1;
        const formattedDay = day < 10 ? `0${day}` : day;
        const squareDateString = `${year}-${formattedMonth}-${formattedDay}`;

        const todaysTasks = tasksList.filter(task => task.date === squareDateString);
        let tasksHTML = '';

        todaysTasks.forEach((task, index) => {
            let colorClass = 'bg-task-green';
            if (index % 3 === 1) colorClass = 'bg-task-purple';
            if (index % 3 === 2) colorClass = 'bg-task-pink';
            tasksHTML += `<span class="calendar-task-badge ${colorClass}">${task.name}</span>`;
        });

        const isItToday = (day === today.getDate() && month === today.getMonth() && year === today.getFullYear());
        
        let activeClass = isItToday ? 'class="current-active-day"' : 'class="fw-semibold text-dark small"';

        grid.innerHTML += `
            <div class="calendar-card-day">
                <span ${activeClass}>${day}</span>
                <div class="calendar-tasks-container">${tasksHTML}</div>
            </div>
        `;
    }

    const totalSlots = grid.children.length;
    const remainingSlots = 42 - totalSlots; 
    for (let day = 1; day <= remainingSlots; day++) {
        grid.innerHTML += `<div class="calendar-card-day neighbor-month"><span class="fw-semibold small">${day}</span></div>`;
    }
}

function setupNavigation() {
    document.getElementById('prevMonthBtn').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    document.getElementById('nextMonthBtn').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    document.getElementById('todayBtn').addEventListener('click', () => {
        currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
        renderCalendar();
    });
}