window.addEventListener('DOMContentLoaded', () => {
    
    const tableBody = document.getElementById('mainTableBody');
    
    let tasksList = JSON.parse(localStorage.getItem('savedTasks')) || [];

    console.log("These are the data read from the LocalStorage:", tasksList);

    tableBody.innerHTML = '';

    if (tasksList.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-4">No tasks found. Add tasks from the Tasks page!</td></tr>`;
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
                <td><span class="badge ${badgeColor}">${task.status}</span></td>
            </tr>
        `;
    });
});