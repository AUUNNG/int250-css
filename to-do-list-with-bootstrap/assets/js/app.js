import * as db from './db.js';

const listTask = document.getElementById('list-task');
let tasks = [];

function init() {
    fetchListTask()
}

const editTaskModal = new bootstrap.Modal(document.getElementById('editTaskModal'));
const saveTaskChangesBtn = document.getElementById('save-task-changes');

saveTaskChangesBtn.addEventListener('click', () => {
    const id = document.getElementById('edit-task-id').value;
    const title = document.getElementById('edit-task-title').value;
    const priority = document.getElementById('edit-task-priority').value;

    if (id && title) {
        updateTask(id, title, priority);
        editTaskModal.hide();
    }
});

const addTaskBtn = document.getElementById('add');

addTaskBtn.addEventListener('click', () => {
    const id = document.getElementById('id').value;
    const title = document.getElementById('title').value;
    const priority = document.getElementById('priority').value;

    if (id.trim() === '') {
        createTask(title, priority);
        document.getElementById('id').value = '';
        document.getElementById('title').value = '';
        document.getElementById("priority").value = 'Low';
    } else {
        updateTask(id, title, priority);
        document.getElementById('id').value = '';
        document.getElementById('title').value = '';
        document.getElementById("priority").value = 'Low';
    }
})

const radios = document.querySelectorAll(
    'input[name="filter-status"]'
);

radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        populateTask(tasks);
    });
});

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (e) => {
    populateTask(tasks);
});

function populateTask(data) {
    const status = {
        Active: 1,
        Completed: 2
    }

    const searchText = document.getElementById('search').value;
    const filterStatus = document.querySelector('input[name="filter-status"]:checked').value;

    const filteredTasks = data.filter(task => {
        const matchesSearch = task.title.includes(searchText);
        const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    listTask.innerHTML = '';
    filteredTasks.sort((a, b) =>
        status[a.status] - status[b.status] ||
        new Date(a.datetime) - new Date(b.datetime)
    ).forEach(task => {
        const dateStr = new Date(task.datetime).toLocaleString();

        const createElement = document.createElement('div');
        createElement.className = 'row mt-3';
        createElement.innerHTML = `
        <div class="form-check bg-white ps-5 pe-3 py-3 rounded-3 border border-light-subtle">
            <div class="row align-items-center">
                <div class="col">
                    <div class="row">
                        <div class="col position-relative">
                            <input class="form-check-input position-absolute top-50 start-0" type="checkbox"
                                name="task-id" id="${task.id}" ${task.status === 'Completed' ? 'checked' : ''}>
                            <label class="form-check-label ${task.status === 'Completed' ? 'text-decoration-line-through' : ''}" for="${task.id}" id="task-title">${task.title}</label>
                            <span
                                class="badge bg-warning-subtle border border-warning text-warning rounded-pill"
                                id="task-priority">
                                ${task.priority}
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col d-flex align-items-center gap-1 text-secondary text-nowrap">
                            <span class="fs-6 material-symbols-rounded"> schedule </span>
                            <span class="fs-6" id="task-datetime">${dateStr}</span>
                        </div>
                    </div>
                </div>
                <div class="col d-flex justify-content-end gap-2">
                    <button
                        class="btn-edit p-2 bg-white border border-light-subtle rounded-2 d-flex align-items-center ${task.status === 'Completed' ? 'd-none' : ''}"
                        type="button">
                        <span class="fs-5 material-symbols-rounded"> edit </span>
                    </button>
                    <button
                        class="btn-delete p-2 bg-white border border-light-subtle rounded-2 d-flex align-items-center ${task.status === 'Completed' ? 'd-none' : ''}"
                        type="button">
                        <span class="fs-5 material-symbols-rounded"> delete </span>
                    </button>
                </div>
            </div>
        </div>
        `.trim();

        const editBtn = createElement.querySelector('.btn-edit');
        const deleteBtn = createElement.querySelector('.btn-delete');
        const checkbox = createElement.querySelector('.form-check-input');

        editBtn.addEventListener('click', () => {
            handleUpdateTask(task.id);
        });

        deleteBtn.addEventListener('click', () => {
            handleDeleteTask(task.id);
        });

        checkbox.addEventListener('change', (e) => {
            handleStatusChange(e, task.id);
        });

        listTask.append(createElement);
    });
}

function pupulateTaskCounter(data) {
    document.getElementById('total').textContent = data.length
    document.getElementById('active').textContent = data.filter(item => item.status === "Active").length
}

async function fetchListTask() {
    try {
        tasks = await db.getAllTodo();
        populateTask(tasks);
    } catch (err) {
        console.log(err);
    }
}

function handleUpdateTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        document.getElementById('edit-task-id').value = task.id;
        document.getElementById('edit-task-title').value = task.title;
        document.getElementById('edit-task-priority').value = task.priority;
        editTaskModal.show();
    }
}

async function handleDeleteTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    if (confirm(`Are you sure you want to delete this item?\nTitle: ${task.title}\nPriority: ${task.priority}\nStatus: ${task.status}`)) {
        try {
            await db.deleteTodo(id);
            tasks = tasks.filter(t => t.id !== id);
            populateTask(tasks);
        } catch (err) {
            console.error(err);
            alert('Error deleting task: ' + err);
        }
    }
}

async function handleStatusChange(e, id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
        const newStatus = e.target.checked ? 'Completed' : 'Active';
        await db.updateTodo({ ...task, status: newStatus });

        const index = tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], status: newStatus };
        }
        populateTask(tasks);
        pupulateTaskCounter(tasks);
    } catch (err) {
        console.error(err);
        alert('Error updating status: ' + err);
        e.target.checked = !e.target.checked;
    }
}

async function createTask(title, priority) {
    try {
        const res = await db.createTodo({
            title,
            priority,
        });

        tasks.push(res);
        populateTask(tasks);
        pupulateTaskCounter(tasks)
    } catch (err) {
        console.error(err);
        alert('Error creating task: ' + err);
    }
}

async function updateTask(id, title, priority) {
    try {
        const res = await db.updateTodo({ id, title, priority });
        console.log('Updated task:', res);
        alert('Task updated successfully!');

        const index = tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            tasks[index] = res;
        }
        populateTask(tasks);
        pupulateTaskCounter(tasks)
    } catch (err) {
        console.error(err);
        alert('Error creating task: ' + err);
    }
}

function deleteTask() { }

init();


