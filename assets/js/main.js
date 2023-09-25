document.querySelector('form').onsubmit = (e) => {
  e.preventDefault();
}
let page = document.getElementById("page");
const list = document.getElementById("list");
const taskName = document.getElementById("taskName");
const dateTimeTask = document.getElementById("dateTimeTask");
const addUpdateTask = document.getElementById("addUpdateTask");
const deleteAllTasks = document.getElementById("deleteBtn");
let tasks;
let currentIndex;
if (typeof localStorage !== 'undefined') {
  page.style.display = 'block';
  getTasksFromlocalStorage();
  displayTasks();
  addUpdateTask.onclick = function (e) {
    e.preventDefault();

    if (addUpdateTask.value === 'Add Task') {
      addTask();
    }
    else if (addUpdateTask.value === 'Update Task') {
      updateTask('edit');
    }
    clearInputs();
    displayTasks();
  }
  deleteAllTasks.onclick = function () {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        tasks = [];
        localStorage.setItem("tasks", JSON.stringify(tasks));
        list.innerHTML = '';
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    });

  }
}
else {
  page.style.display = 'none';
  alert('Local storage is not supported in your browser. Please use a different browser to access this project.');
}
function getTasksFromlocalStorage() {

  if (JSON.parse(localStorage.getItem("tasks")) == null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

}
function displayTasks() {
  let result = '';
  for (let i = 0; i < tasks.length; i++) {
    let state = ' ';
    let classBg = ' ';
    if (tasks[i].taskState === 1) {
      state = 'disabled';
      classBg = 'bg-info';
    }
    result += `<li
class="item list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
>
<div class="d-flex align-items-center w-50 ">
<label
for="taskState"
class="d-none text-capitalize"
  ></label>
  <input
    class="form-check-input me-2 ${classBg}"
    type="checkbox"
    id="taskState"
    onclick="doneTask(${i})"
    value=""
    ${state}
    aria-labelledby="done${i}"
    aria-label="..."
  />
  <span id="done${i}" class="d-none" >Submit Form</span>
  <h4> ${tasks[i].taskName} </h4>

</div>
<div class="d-flex align-items-center w-50 ">
<div
class="date-time py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-light w-50">
<p class="small mb-0">
    <i class="fa-solid fa-calendar-days me-2 text-warning"></i>
    ${tasks[i].dateTimeTask}
</p>
</div>
<div class="d-flex flex-row justify-content-end mb-1 w-50">
<button aria-label="edit" class="btn btn-outline-info text-center me-3 " onclick="editTask(${i})">
<i class="fas fa-pencil-alt m-auto"></i>
</button>
<button aria-label="delete" class="btn btn-outline-danger text-center" onclick="deleteTask(${i})">
<i class="fas fa-trash-alt m-auto"></i>
</button>
</div>
</div>
</li>`


  }

  list.innerHTML = result;


}
function clearInputs() {
  taskName.value = '';
  dateTimeTask.value = '';
}
function createTask(state) {
  let task;
  if (state === 'editState') {
    task = {
      taskName: tasks[currentIndex].taskName,
      slugTask: tasks[currentIndex].slugTask,
      dateTimeTask: tasks[currentIndex].dateTimeTask,
      taskState: 1,
    }
  }
  else {
    task = {
      taskName: taskName.value,
      slugTask: '',
      dateTimeTask: dateTimeTask.value,
      taskState: 0,
    }
    task.slugTask = generateSlugTask(task.taskName);
  }
  return task;
}

function isValidSlug(slugTask) {
   return tasks.find(function(task) {
    return task.slugTask === slugTask;
     });  
}
function addTask() {
  let task = createTask('newTask');
  if (typeof isValidSlug(task.slugTask)==='undefined') {
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Task Added Successfully ..!',
      showConfirmButton: false,
      timer: 1500
    });
  }
  else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: ' Your slug Name must be unique !! please try again ^_^',
    });

  }
}

function editTask(index) {
  taskName.value = tasks[index].taskName;;
  dateTimeTask.value = tasks[index].dateTimeTask;;
  addUpdateTask.value = 'Update Task';
  addUpdateTask.innerHTML = "Update"
  currentIndex = index;
}
function updateTask(edit) {
  let task;
  if (edit === 'edit') {
    task = createTask('edit');
    if (typeof isValidSlug(task.slugTask)==='undefined') {
      let oldTask = tasks[currentIndex].taskName;
      tasks[currentIndex] = task;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      addUpdateTask.value = 'Add Task';
      addUpdateTask.innerHTML = "Add"
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `{${oldTask} } Updated Successfully..!`,
        showConfirmButton: false,
        timer: 1500
      });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: ' Your slug Name must be unique !! please try again ^_^',

      });
    }
  }
  else if (edit === 'editState') {
    task = createTask('editState');
    let oldTask = tasks[currentIndex].taskName;
    tasks[currentIndex] = task;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    addUpdateTask.value = 'Add Task';
    addUpdateTask.innerHTML = "Add"
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `{${oldTask} } Updated Successfully..!`,
      showConfirmButton: false,
      timer: 1500
    });
  }

}
function deleteTask(index) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}
function doneTask(index) {
  currentIndex = index;
  updateTask("editState");
  displayTasks();
}
function generateSlugTask(taskName) {
  return taskName.toLowerCase().replace(/ /g, "-");
}