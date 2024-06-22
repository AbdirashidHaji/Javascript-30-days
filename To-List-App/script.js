document.addEventListener('DOMContentLoaded', (event) => {
    loadTasks();
    showDateTime();
    loadTheme();
    setInterval(showDateTime, 1000);
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const taskList = document.getElementById('task-list');

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(taskText));
    li.classList.add('task');

    const subtaskInput = document.createElement('div');
    subtaskInput.className = 'subtask-input';
    subtaskInput.innerHTML = `
        <input type="text" placeholder="Add a subtask">
        <button onclick="addSubtask(this)">Add Subtask</button>
    `;

    const deleteButton = document.createElement('button');
    deleteButton.appendChild(document.createTextNode('Delete'));
    deleteButton.className = 'delete';
    deleteButton.onclick = function () {
        this.parentElement.remove();
        saveTasks();
    };

    const subtasks = document.createElement('ul');
    subtasks.className = 'subtask-list';

    li.appendChild(deleteButton);
    li.appendChild(subtasks);
    li.appendChild(subtaskInput);

    li.onclick = function () {
        this.classList.toggle('completed');
        saveTasks();
    };

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = '';
}

function addSubtask(button) {
    const subtaskInput = button.previousElementSibling;
    const subtaskText = subtaskInput.value.trim();

    if (subtaskText === '') {
        alert('Please enter a subtask');
        return;
    }

    const subtaskList = button.parentElement.nextElementSibling;

    const subtask = document.createElement('li');
    subtask.appendChild(document.createTextNode(subtaskText));
    subtask.classList.add('subtask');

    subtask.onclick = function (e) {
        e.stopPropagation();
        this.classList.toggle('completed');
        saveTasks();
    };

    subtaskList.appendChild(subtask);
    subtaskInput.value = '';
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li.task').forEach((li) => {
        const task = {
            text: li.childNodes[0].nodeValue,
            completed: li.classList.contains('completed'),
            subtasks: []
        };

        li.querySelectorAll('.subtask-list li').forEach((subtaskLi) => {
            task.subtasks.push({
                text: subtaskLi.childNodes[0].nodeValue,
                completed: subtaskLi.classList.contains('completed')
            });
        });

        tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
        const taskList = document.getElementById('task-list');
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(task.text));
        li.classList.add('task');

        const subtaskInput = document.createElement('div');
        subtaskInput.className = 'subtask-input';
        subtaskInput.innerHTML = `
            <input type="text" placeholder="Add a subtask">
            <button onclick="addSubtask(this)">Add Subtask</button>
        `;

        const deleteButton = document.createElement('button');
        deleteButton.appendChild(document.createTextNode('Delete'));
        deleteButton.className = 'delete';
        deleteButton.onclick = function () {
            this.parentElement.remove();
            saveTasks();
        };

        const subtasks = document.createElement('ul');
        subtasks.className = 'subtask-list';

        task.subtasks.forEach((subtask) => {
            const subtaskLi = document.createElement('li');
            subtaskLi.appendChild(document.createTextNode(subtask.text));
            subtaskLi.classList.add('subtask');
            if (subtask.completed) {
                subtaskLi.classList.add('completed');
            }
            subtaskLi.onclick = function (e) {
                e.stopPropagation();
                this.classList.toggle('completed');
                saveTasks();
            };
            subtasks.appendChild(subtaskLi);
        });

        if (task.completed) {
            li.classList.add('completed');
        }

        li.onclick = function () {
            this.classList.toggle('completed');
            saveTasks();
        };

        li.appendChild(deleteButton);
        li.appendChild(subtasks);
        li.appendChild(subtaskInput);

        taskList.appendChild(li);
    });
}

function showDateTime() {
    const now = new Date();
    const dateElement = document.getElementById('date-time');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, options);
    const timeString = now.toLocaleTimeString();
    dateElement.innerHTML = `${dateString}<br>${timeString}`;
}

function changeTheme() {
    const theme = document.getElementById('theme').value;
    document.body.className = theme;
    localStorage.setItem('theme', theme);
}

function loadTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.getElementById('theme').value = theme;
    document.body.className = theme;
}
