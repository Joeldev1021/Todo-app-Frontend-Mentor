const $form = document.querySelector(".form");
const $table = document.querySelector(".table");
const $main = document.querySelector('.main')
const $actionFilter = document.getElementById('action__filter')
const btn_theme = document.querySelector('.btn_theme')

const darkTheme = {
"--img--header": "url(./images/bg-mobile-dark.jpg)",
"--icon--theme": "url(./images/icon-sun.svg)",
"--bg--main":"hsl(235, 24%, 19%",
"--input-bg":" hsl(235, 24%, 19%)",
"--text-table-color":"hsl(234, 39%, 85%)",
"--text-filter-color":"hsl(234, 11%, 52%)",
"--bg-body":" hsl(235, 21%, 11%)",
"--color-border-botton":"hsl(237, 14%, 26%)",
"--color-deleted":"hsl(233, 14%, 35%)",
}

const lightTheme = {
"--img--header": "url(./images/bg-mobile-light.jpg)",
"--icon--theme": "url(./images/icon-moon.svg)",
"--bg--main":"hsl(0, 0%, 98%)",
"--input-bg":"hsl(0, 0%, 98%)",
"--text-table-color":"hsl(235, 1%, 35%)",
"--text-filter-color":"hsl(236, 9%, 61%)",
"--bg-body":" hsl(236, 33%, 92%)",
"--color-border-botton":"hsl(233, 11%, 84%)",
"--color-deleted":"hsl(233, 11%, 84%)",
}
  


window.addEventListener("DOMContentLoaded", () => {
  renderTable(tasks);
  
});

let tasks = [
  { id: 1629496203600, task: "study", done: false },
  { id: 1629496204361, task: "read", done: true },
  { id: 1629496209679, task: "run", done: false },
  { id: 1629496218136, task: "swinng", done: true },
  { id: 1629496207917, task: "task 1", done: false },
];

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(tasks);
  if (e.target.task.value === "") alert("debes llenar el formulario");
  let task = {
    id: Date.now(),
    [e.target.task.name]: e.target.task.value,
    done: false,
  };

  tasks.push(task);
  e.target.reset();

  renderTable(tasks);
});

let $frgmt = document.createDocumentFragment();

const renderTable = (n) => {
  console.log(n)
  $table.innerHTML = "";
  n.forEach((item) => {
    $table.innerHTML += `
 <div  class="rows">
  <div data-id=${item.id}>
    <input type="checkbox" class="input__check"  name="checked" ${
      item.done ? "checked" : "" }>
    <p class="title__task">${item.task}</p>
  </div>
     <span class="deleted">x</span>
  </div>

        `;
  });
 // $main.insertAdjacentElement('afterbegin', $table);
  
};
///event the table body 
$table.addEventListener("click", (e) => {
 
  if (e.target.name === "checked") {
    //console.log(e.target.checked)
    taskId = e.target.parentNode.dataset.id;
    console.log(taskId)
    const newArray = tasks.map((task) =>
      task.id == taskId ? { ...task, done: !task.done } : task
    );
    tasks = newArray;   
  }
  console.log(tasks)
});

//event filter 
$actionFilter.addEventListener("click",(e)=>{
    if(e.target.id=='all'){
        renderTable(tasks)
    }else if(e.target.id == 'active'){
      filterTasks(tasks, true)
    }else if(e.target.id == 'completed'){
        filterTasks(tasks, false)
    }else if(e.target.id == 'clear_completed'){
      filterTasks(tasks, true, 'clear')
    }
})

const filterTasks=(n, typeFilter, clear)=>{
    if(!clear){
      const filterCompleted =  n.filter(item=> item.done !== typeFilter)
     console.log(tasks)
     renderTable(filterCompleted)
    }else {
      const filterCompleted =  n.filter(item=> item.done !== typeFilter)
      tasks = filterCompleted
      renderTable(tasks)
    }
}

let switchTheme = false
btn_theme.addEventListener('click', (e)=>{
    switchTheme = !switchTheme;
    switchTheme? changeTheme(lightTheme): changeTheme(darkTheme)
})

const changeTheme=(theme)=>{
  for (const key in theme) {
        console.log(theme[key])
        document.documentElement.style.setProperty(key, theme[key])
    }
  
}

