document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Funktion til at hente opgaver fra serveren
    function fetchTasks() {
        fetch('/tasks')
            .then(response => response.json())
            .then(tasks => {
                taskList.innerHTML = '';
                tasks.forEach((task, index) => {
                    const li = document.createElement('li');
                    li.textContent = task;
                    li.appendChild(createUpdateButton(index));
                    li.appendChild(createCompleteButton(index));
                    li.appendChild(createDeleteButton(index));
                    taskList.appendChild(li);
                });
            });
    }

    addTaskBtn.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task) {
            fetch('/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task })
            })
                .then(response => response.json())
                .then(data => {
                    taskInput.value = '';
                    fetchTasks();
                });
        }
    });

    function createCompleteButton(index) {
        const button = document.createElement('button');
        button.textContent = 'Complete';
        button.className = 'completeBtn';
        button.addEventListener('click', () => {

            const li = button.parentElement;
            li.remove();
            fetch(`/tasks/${index}`, {
                method: 'DELETE',
            });
        });
        return button;
    }

    function createUpdateButton(index) {
        const button = document.createElement('button');
        button.textContent = 'Update';
        button.className = 'updateBtn';
        button.addEventListener('click', () => {
            const updatedTask = prompt('Update task:', '');
            if (updatedTask) {
                fetch(`/tasks/${index}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ task: updatedTask })
                })
                    .then(response => response.json())
                    .then(() => {
                        fetchTasks();
                    });
            }
        });
        return button;
    }

    function createDeleteButton(index) {
        const button = document.createElement('button');
        button.textContent = 'Delete';
        button.className = 'deleteBtn';
        button.addEventListener('click', () => {
            const li = button.parentElement;
            li.remove();
            fetch(`/tasks/${index}`, {
                method: 'DELETE',
            });
        });
        return button;
    }

    fetchTasks();
});
