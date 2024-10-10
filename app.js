const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static('public'));

let tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});
app.post('/tasks', (req, res) => {
    const newTask = req.body.task;
    tasks.push(newTask);
    res.status(201).json({ message: 'Task added successfully', tasks });
});
app.put('/tasks/:index', (req, res) => {
    const index = req.params.index;
    const updatedTask = req.body.task;

    if (index >= 0 && index < tasks.length) {
        tasks[index] = updatedTask;
        res.json({message: `Task updated succesfully`, tasks});
    } else {
        res.staus(404).json({message: 'task not found'})
    }
});
app.delete('/tasks/:index', (req, res) => {
  const index = req.params.index;

  if (index >=0 && index < tasks.length) {
      tasks.splice(index, 1);
      res.json({message: 'task delted succesfully', tasks})
  } else {
      res.status(404).json({message: 'task not found'})
  }
});
app.listen(port, () =>{
    console.log(`server listening on port ${port}`);

})