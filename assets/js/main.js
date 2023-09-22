document.querySelector('form').onsubmit=(e)=>{
  e.preventDefault();
 }
const page= document.getElementById("page");
if (typeof localStorage !== 'undefined') {
    page.style.display = 'block'; 
    let list = document.getElementById("list");
    let taskName = document.getElementById("taskName");
    let dateTimeTask = document.getElementById("dateTimeTask");
    let addUpdateTask=document.getElementById("addUpdateTask");
    let deleteAllTasks=document.getElementById("deleteBtn");
    let tasks;

  if(JSON.parse(localStorage.getItem("tasks"))==null){
    tasks=[];
} 
    else{
        tasks=JSON.parse(localStorage.getItem("tasks"));
}

displayTasks();

addUpdateTask.onclick = function(e){
    e.preventDefault();
    if(addUpdateTask.value ==='Add Task'){
        addTask();}
   else if(addUpdateTask.value ==='Update Task'){
         updateTask('edit');

    }
    clearInputs();
    displayTasks();

  
    
}

function displayTasks(){
  let result='';
  for( var i=0;i<tasks.length;i++)
  { 
  let state =' ';
     let classBg=' ';
    if(tasks[i].taskState ===1 ){
       state='disabled';
       classBg='bg-info';

  } 

  result+=`<li
  class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
>
  <div class="d-flex align-items-center ">
    <input
      class="form-check-input me-2 ${classBg}"
      type="checkbox"
      id="taskState"
      onclick="doneTask(${i})"
      value=""
      ${state}
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

  list.innerHTML=result;


}// end displayTasks

function clearInputs(){
    taskName.value = ''; 
    dateTimeTask.value = '';
}
function  addTask(){
    let task = {
        taskName: taskName.value,
        dateTimeTask:dateTimeTask.value,
        taskState:0,
    }

    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
 
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Task Added Successfully ..!',
        showConfirmButton: false,
        timer: 1500
  });}



function editTask(index){

    taskName.value = tasks[index].taskName; ;
    dateTimeTask.value =tasks[index].dateTimeTask; ;
    addUpdateTask.value='Update Task';
    addUpdateTask.innerHTML="Update"
    currentIndex=index;
   
  
  
}

function updateTask(edit){
  let task ;
  if(edit==='edit'){
    task = {
        taskName: taskName.value,
        dateTimeTask:dateTimeTask.value,
        taskState:0,
    }}

    else {
      task = {
        taskName: tasks[currentIndex].taskName,
        dateTimeTask:tasks[currentIndex].dateTimeTask,
        taskState:1,
    }
    }

    
   let oldTask = tasks[currentIndex].taskName;
    tasks[currentIndex] = task;
    localStorage.setItem("tasks",JSON.stringify(tasks));
    addUpdateTask.value='Add Task';
    addUpdateTask.innerHTML="Add"
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `{${oldTask} } Updated Successfully..!`,
        showConfirmButton: false,
        timer: 1500
  })
 // displayTasks();
  
  
  
  }

deleteAllTasks.onclick = function(){
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
            tasks=[];
            localStorage.setItem("tasks",JSON.stringify(tasks));
            list.innerHTML='';
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      });
    
}

function deleteTask(index){
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
            tasks.splice(index,1);
            localStorage.setItem("tasks",JSON.stringify(tasks));
            displayTasks();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
   
}



function doneTask(index){
  currentIndex=index;
  updateTask(" ");
  displayTasks();

}



// Validation
// //task name
// //first letter capital
// //name 3-50
// //accept spaces

taskName.onkeyup=function(){
  let pattern= /^[A-Z][A-Z a-z\s 0-9]{1,60}$/;
  if(pattern.test(taskName.value)){
    taskName.classList.add("is-valid");
    taskName.classList.remove("is-invalid");
    addUpdateTask.removeAttribute("disabled");
  }else{
    taskName.classList.add("is-invalid");
    taskName.classList.remove("is-valid");
    addUpdateTask.setAttribute("disabled","disabled");
  }
}
  
  }//if local 

  else {
    page.style.display = 'none'; 
    alert('Local storage is not supported in your browser. Please use a different browser to access this project.');
  }
  