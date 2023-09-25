document.querySelector("form").onsubmit=e=>{e.preventDefault()};const page=document.getElementById("page");if("undefined"!=typeof localStorage){page.style.display="block";let t=document.getElementById("list"),a=document.getElementById("taskName"),s=document.getElementById("dateTimeTask"),l=document.getElementById("addUpdateTask"),e=document.getElementById("deleteBtn"),n,i;function displayTasks(){let a="";for(var s=0;s<n.length;s++){let e=" ",t=" ";1===n[s].taskState&&(e="disabled",t="bg-info"),a+=`<li
  class="item list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
>
  <div class="d-flex align-items-center w-50 ">
  <label
  for="taskState"
  class="d-none text-capitalize"
    ></label>
    <input
      class="form-check-input me-2 ${t}"
      type="checkbox"
      id="taskState"
      onclick="doneTask(${s})"
      value=""
      ${e}
      aria-labelledby="done${s}"
      aria-label="..."
    />
    <span id="done${s}" class="d-none" >Submit Form</span>
    <h4> ${n[s].taskName} </h4>

  </div>
  <div class="d-flex align-items-center w-50 ">
  <div
  class="date-time py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-light w-50">
  <p class="small mb-0">
      <i class="fa-solid fa-calendar-days me-2 text-warning"></i>
      ${n[s].dateTimeTask}
  </p>
</div>
<div class="d-flex flex-row justify-content-end mb-1 w-50">
<button aria-label="edit" class="btn btn-outline-info text-center me-3 " onclick="editTask(${s})">
  <i class="fas fa-pencil-alt m-auto"></i>
</button>
<button aria-label="delete" class="btn btn-outline-danger text-center" onclick="deleteTask(${s})">
  <i class="fas fa-trash-alt m-auto"></i>
</button>
</div>
</div>
</li>`}t.innerHTML=a}function clearInputs(){a.value="",s.value=""}function createTask(e){let t;return"editState"===e?t={taskName:n[i].taskName,slugTask:n[i].slugTask,dateTimeTask:n[i].dateTimeTask,taskState:1}:(t={taskName:a.value,slugTask:"",dateTimeTask:s.value,taskState:0}).slugTask=generateSlugTask(t.taskName),t}function isValidSlug(t){for(let e=0;e<n.length;e++)if(t===n[e].slugTask)return console.log("nooooooooooo"),0;return 1}function addTask(){var e=createTask("newTask");isValidSlug(e.slugTask)?(n.push(e),localStorage.setItem("tasks",JSON.stringify(n)),Swal.fire({position:"center",icon:"success",title:"Task Added Successfully ..!",showConfirmButton:!1,timer:1500})):Swal.fire({icon:"error",title:"Oops...",text:" Your slug Name must be unique !! please try again ^_^"})}function editTask(e){a.value=n[e].taskName,s.value=n[e].dateTimeTask,l.value="Update Task",l.innerHTML="Update",i=e}function updateTask(e){let t;var a;"edit"===e?isValidSlug((t=createTask("edit")).slugTask)?(a=n[i].taskName,n[i]=t,localStorage.setItem("tasks",JSON.stringify(n)),l.value="Add Task",l.innerHTML="Add",Swal.fire({position:"center",icon:"success",title:`{${a} } Updated Successfully..!`,showConfirmButton:!1,timer:1500})):Swal.fire({icon:"error",title:"Oops...",text:" Your slug Name must be unique !! please try again ^_^"}):"editState"===e&&(t=createTask("editState"),a=n[i].taskName,n[i]=t,localStorage.setItem("tasks",JSON.stringify(n)),l.value="Add Task",l.innerHTML="Add",Swal.fire({position:"center",icon:"success",title:`{${a} } Updated Successfully..!`,showConfirmButton:!1,timer:1500}))}function deleteTask(t){Swal.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then(e=>{e.isConfirmed&&(n.splice(t,1),localStorage.setItem("tasks",JSON.stringify(n)),displayTasks(),Swal.fire("Deleted!","Your file has been deleted.","success"))})}function doneTask(e){i=e,updateTask("editState"),displayTasks()}function generateSlugTask(e){let t=e.replace(/ /g,"-");return t=t.toLowerCase()}n=null==JSON.parse(localStorage.getItem("tasks"))?[]:JSON.parse(localStorage.getItem("tasks")),displayTasks(),l.onclick=function(e){e.preventDefault(),"Add Task"===l.value?addTask():"Update Task"===l.value&&updateTask("edit"),clearInputs(),displayTasks()},e.onclick=function(){Swal.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then(e=>{e.isConfirmed&&(n=[],localStorage.setItem("tasks",JSON.stringify(n)),t.innerHTML="",Swal.fire("Deleted!","Your file has been deleted.","success"))})}}else page.style.display="none",alert("Local storage is not supported in your browser. Please use a different browser to access this project.");