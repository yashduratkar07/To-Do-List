document.addEventListener('DOMContentLoaded', function () {
    //Declaration
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    //Local Storage
    function loadTasks() {
        let tasks = localStorage.getItem('tasks');
        if (tasks) {
            tasks = JSON.parse(tasks);
            tasks.forEach(function (task) {
                addTaskToDOM(task.text, task.completed);
            });
        }
    }

    //Save Task
    function saveTasks() {
        const tasks = [];
        const taskItems = document.querySelectorAll('#task-list li');
        taskItems.forEach(function (taskItem) {
            const taskText = taskItem.querySelector('.task-text').textContent;
            const completed = taskItem.classList.contains('completed');
            tasks.push({ text: taskText, completed: completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    //Add Task
    function addTaskToDOM(taskText, completed) {
        const li = document.createElement('li');
        if (completed) {
            li.classList.add('completed');
        }

        const span = document.createElement('span');
        span.classList.add('task-text');
        span.textContent = taskText;

        const div = document.createElement('div');

        const completeIcon = document.createElement('span');
        completeIcon.classList.add('icon', 'complete');
        completeIcon.innerHTML = '&#10003;';
        completeIcon.addEventListener('click', function () {
            li.classList.toggle('completed');
            saveTasks();
        });

        //Edit Task
        const editIcon = document.createElement('span');
        editIcon.classList.add('icon', 'edit');
        editIcon.innerHTML = '&#9998;';
        editIcon.addEventListener('click', function () {
            const newText = prompt('Edit task', taskText);
            if (newText) {
                span.textContent = newText;
                saveTasks();
            }
        });

        //Delete Task
        const deleteIcon = document.createElement('span');
        deleteIcon.classList.add('icon', 'delete');
        deleteIcon.innerHTML = '&#10005;';
        deleteIcon.addEventListener('click', function () {
            taskList.removeChild(li);
            saveTasks();
        });

        div.appendChild(completeIcon);
        div.appendChild(editIcon);
        div.appendChild(deleteIcon);

        li.appendChild(span);
        li.appendChild(div);

        taskList.appendChild(li);
    }


    addTaskBtn.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTaskToDOM(taskText, false);
            saveTasks();
            taskInput.value = '';
        }
    });

    //Enter Key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                addTaskToDOM(taskText);
                saveTasks();
                taskInput.value = '';
            }
        }
    });

    loadTasks();
});