const page= document.getElementById("page");
if (typeof localStorage !== 'undefined') {
let list = document.getElementById("list");
let taskName = document.getElementById("taskName");
let dateTimeTask = document.getElementById("dateTimeTask");
let addUpdateTask = document.getElementById("addUpdateTask");
let deleteAllTasks = document.getElementById("deleteBtn");
let tasks;

if (JSON.parse(localStorage.getItem("tasks")) == null) {
  tasks = [];
}
else {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

displayTasks();
addUpdateTask.onclick = function (e) {
  e.preventDefault();
  if (addUpdateTask.value == 'Add Task') {
    addTask();
  }
  else if (addUpdateTask.value == 'Update Task') {
    updateTask();

  }
  clearInputs();
  displayTasks();



}


function addTask() {
  let task = {
    taskName: taskName.value,
    dateTimeTask: dateTimeTask.value,

  }


  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'task added successfully',
    showConfirmButton: false,
    timer: 1500
  });



}
function clearInputs() {
  taskName.value = '';
  dateTimeTask.value = '';
}

function displayTasks() {
  var result = '';
  for (var i = 0; i < tasks.length; i++) {
    result += `
        <li class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
        <div class="d-flex align-items-center">
        <input
          class="form-check-input me-2"
          type="checkbox"
          id="taskState"
          value=""
          aria-label="..."
        />
        <h4> ${tasks[i].taskName} </h4>
    
      </div>
      <div
      class="py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-light">
      <p class="small mb-0">
          <i class="fa-solid fa-calendar-days me-2 text-warning"></i>
          ${tasks[i].dateTimeTask}
      </p>
    </div>
    <div class="d-flex flex-row justify-content-end mb-1">
    <button class="btn btn-outline-info text-center me-3 " onclick="editTask(${i})">
  <i class="fas fa-pencil-alt m-auto"></i>
</button>
<button class="btn btn-outline-danger text-center" onclick="deleteTask(${i})">
  <i class="fas fa-trash-alt m-auto"></i>
</button>
</div>
</li>`

  }
  list.innerHTML = result;


}
function deleteTask(index) {
  console.log("inside -----------------------")
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
  })

}


function editTask(index) {

  taskName.value = tasks[index].taskName;;
  dateTimeTask.value = tasks[index].dateTimeTask;;
  addUpdateTask.value = 'Update Task';
  addUpdateTask.innerHTML = "Update"
  currentIndex = index;



}

function updateTask() {
  let task = {
    taskName: taskName.value,
    dateTimeTask: dateTimeTask.value,
  }

  var oldName = tasks[currentIndex].courseName;
  tasks[currentIndex] = task;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  addUpdateTask.value = 'Add task';
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: `${oldName} updated successfully`,
    showConfirmButton: false,
    timer: 1500
  })



}

  }//if local 

  else {
    page.style.display = 'none'; 
    alert('Local storage is not supported in your browser. Please use a different browser to access this project.');
  }
  
