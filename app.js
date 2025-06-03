const getStorage = () => {
  return localStorage.getItem('sampleNote') ? JSON.parse(localStorage.getItem('sampleNote')) : [];
}

const savetoStorage = (tasks) => {
  localStorage.setItem('sampleNote', JSON.stringify(tasks));
  return tasks;
}

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText !== "") {
    const currentTasks = getStorage();
    const task = {
      no: currentTasks.length + 1,
      description: taskText,
      completed: false
    };

    currentTasks.push(task);
    savetoStorage(currentTasks);
    loadTask(currentTasks);

    input.value = "";
  } else {
    alert("Please enter a task.");
  }
}

const loadTask = (allTasks = []) => {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  for (let index = 0; index < allTasks.length; index++) {
    const task = allTasks[index];

    if (task.completed) continue; // Skip completed tasks

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = 'chk-' + task.no;

    const label = document.createElement("label");
    label.textContent = task.description;
    label.setAttribute('for', checkbox.id);

    li.appendChild(checkbox);
    li.appendChild(label);
    todoList.appendChild(li);

    checkbox.addEventListener("change", function () {
      if (this.checked) {
        label.style.textDecoration = "line-through";

        // Update completed state
        task.completed = true;

        // Save updated tasks to localStorage including completed task
        const updatedTasks = allTasks.map(t => {
          if (t.no === task.no) {
            return {...t, completed: true};
          }
          return t;
        });
        savetoStorage(updatedTasks);

        // Remove the item after 1 second
        setTimeout(() => {
          li.remove();
          loadTask(updatedTasks); // Reload updated list
        }, 1000);
      }
    });
  }
}

function showAllTasks() {
  const allTasks = getStorage();
  console.log("All tasks in localStorage (including completed):", allTasks);
}

document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('showAllButton').addEventListener('click', showAllTasks);

document.addEventListener('DOMContentLoaded', function() {
  const currentTasks = getStorage();
  loadTask(currentTasks);
});
