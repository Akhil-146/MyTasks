//define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//load all event listeners
loadEventListeners();

function loadEventListeners() {
  //DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);
  //Add task event
  form.addEventListener("submit", addTask);
  //Remove task event
  taskList.addEventListener("click", removeTask);
  //Clear all the tasks
  clearBtn.addEventListener("click", removeAllTasks);
  //Filter the tasks
  filter.addEventListener("keyup", filterTasks);
}

//Get Tasks from Local Storage function
function getTasks() {
  let tasks;
  if (!(localStorage.getItem("tasks") === null)) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach((task) => {
      //create a new DOM element for each element
      const li = document.createElement("li");
      li.className = "collection-item";
      li.appendChild(document.createTextNode(task));
      const link = document.createElement("a");
      link.className = "delete-item secondary-content";
      link.innerHTML = '<i class="fa fa-remove"></i>';
      li.appendChild(link);
      taskList.appendChild(li);
    });
  }
}

//Add task function
function addTask(e) {
  e.preventDefault();
  if (taskInput.value === "") {
    alert("Please add a task");
    return;
  }
  //create li element
  const li = document.createElement("li");
  //add class
  li.className = "collection-item";
  //create textnode and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement("a");
  //add class
  link.className = "delete-item secondary-content";
  //add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append link to li
  li.appendChild(link);
  //append li to ul
  taskList.appendChild(li);
  //store the task in local storage
  saveTaskinLS(taskInput.value);
  //clear the input
  taskInput.value = "";
}

//Remove task function
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item"))
    if (confirm("Do you want to delete the task ?")) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      const removeIndex = tasks.indexOf(
        e.target.parentElement.parentElement.textContent
      );
      tasks.splice(removeIndex, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      e.target.parentElement.parentElement.remove();
    }
}

//Remove all the tasks function
function removeAllTasks(e) {
  //taskList.innerHTML = "";
  if (confirm("Do you really want to remove all the tasks ?")) {
    localStorage.clear("tasks");
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
}

//Filter tasks
function filterTasks(e) {
  const filterText = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(filterText) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

//save tasks in local storage
function saveTaskinLS(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) tasks = [];
  else tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  alert("Task Added Successfully");
}
