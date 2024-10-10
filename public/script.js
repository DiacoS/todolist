document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Funktion til at hente opgaver fra serveren
    function fetchTasks() {
        fetch('/tasks')
            .then(response => response.json())
            .then(tasks => {
                taskList.innerHTML = ''; // Tøm listen før opdatering
                tasks.forEach((task, index) => {
                    const li = document.createElement('li');
                    li.textContent = task; // Her skal 'task' være en streng
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
                    taskInput.value = ''; // Tøm inputfeltet
                    fetchTasks();
                });
        }
    });

    function createCompleteButton(index) {
        const button = document.createElement('button');
        button.textContent = 'Complete';
        button.className = 'completeBtn';
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
            fetch(`/tasks/${index}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(() => {
                    fetchTasks();
                });
        });
        return button;
    }


    fetchTasks();
});
