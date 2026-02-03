/*
  TODO
    -user should be able to view all tasks
    -able to add a to-do item to the list
    -should be able to mark a task complete
    -remove tasks by clicking
    -page shouldn't be ugly
*/

let userInput = document.querySelector('#userText')
let userSubButton = document.querySelector('#userSubBtn')
let taskList = document.querySelector('#taskList')

let taskCounter = 1
let tasks = []

function grabUserInput(){
  tasks.push(userInput.value)
  // clear out input box after a submit
  createTaskDiv(userInput.value)
}


function clickTask(id){
  let task = document.querySelector(`#${id}`)
  taskList.removeChild(task)
}

function clickTask(id){
  let task = document.querySelector(`#${id}`)
  task.className = "complete"
}

function createTaskDiv(inVal){

  let curId = `task${taskCounter}`

  let newDiv = document.createElement('div')

  newDiv.id = curId

  let newTask = taskList.appendChild(newDiv)

  newTask.append(inVal)

  newTask.addEventListener('click', () => clickTask(curId))

  taskCounter++
}




userSubButton.addEventListener("click", () => grabUserInput())
