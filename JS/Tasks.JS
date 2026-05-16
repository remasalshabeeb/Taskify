let tasksList = JSON.parse(localStorage.getItem('savedTasks')) || [];

document.addEventListener('DOMContentLoaded', displayTasks);

function createNewTask() {
    const nameInput = document.getElementById('taskNameInput');
    const dateInput = document.getElementById('taskDateInput');
    const priorityInput = document.getElementById('taskPriorityInput');

    if (nameInput.value.trim() === '' || dateInput.value === '') {
        alert('Please fill in the task name and date!');
        return;
    }

    const newTask = {
        id: Date.now(), 
        name: nameInput.value,
        date: dateInput.value,
        priority: priorityInput.value,
        status: 'In Progress'  
    };

    tasksList.push(newTask);
    saveDataToLocalStorage();
    displayTasks();

    nameInput.value = '';
    dateInput.value = '';
}

function displayTasks() {
    const tableBody = document.getElementById('tasksTableBody');
    tableBody.innerHTML = ''; 

    if (tasksList.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-4">No tasks found. Add some tasks above!</td></tr>`;
        return;
    }

    tasksList.forEach(task => {
        let badgeColor = 'bg-warning text-dark';
        if (task.status === 'Completed') badgeColor = 'bg-success text-white';
        if (task.status === 'Pending') badgeColor = 'bg-danger text-white';

        tableBody.innerHTML += `
            <tr>
                <td><span class="fw-semibold">${task.name}</span></td>
                <td><small class="text-muted">${task.date}</small></td>
                <td><span class="badge bg-secondary">${task.priority}</span></td>
                <td><span class="badge ${badgeColor}" style="cursor:pointer;" onclick="toggleStatus(${task.id})">${task.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteTask(${task.id})">
                        <i class="bi bi-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function toggleStatus(taskId) {
    tasksList = tasksList.map(task => {
        if (task.id === taskId) {
            if (task.status === 'In Progress') task.status = 'Completed';
            else if (task.status === 'Completed') task.status = 'Pending';
            else task.status = 'In Progress';
        }
        return task;
    });
    saveDataToLocalStorage();
    displayTasks();
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasksList = tasksList.filter(task => task.id !== taskId);
        saveDataToLocalStorage();
        displayTasks();
    }
}

function saveDataToLocalStorage() {
    localStorage.setItem('savedTasks', JSON.stringify(tasksList));
}