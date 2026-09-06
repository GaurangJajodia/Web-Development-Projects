document.addEventListener("DOMContentLoaded", ()=>{
const todoInput = document.getElementById("toDoinp");
const taskbtn = document.getElementById("addtskbtn");
const todoList = document.getElementById("todo-list");
let tasks = JSON.parse(localStorage.getItem("tasks"))||[];
tasks.forEach((task)=>RenderTasks(task))
taskbtn.addEventListener("click",function(){
    const taskText = todoInput.value.trim();
    if(taskText === "") return;

    const newtext = {
        id : Date.now(),
        text : taskText,
        completed : false,
    };

    tasks.push(newtext);
    saveTasks();
   RenderTasks(newtext)
    todoInput.value="";
    console.log(tasks);
});
function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function RenderTasks(task){
    const li = document.createElement("li");
    li.setAttribute("data-id",task.id)
    li.innerHTML=`
    <span>${task.text}</span>
    <button id="del">Delete</button>`;

    li.querySelector('button').addEventListener("click",(e)=>{
        e.stopPropagation()
        tasks=tasks.filter(t=>t.id!==task.id)
        li.remove()
        saveTasks();
    })
    todoList.appendChild(li);
}
})