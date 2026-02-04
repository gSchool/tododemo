// Query Selectors
let userInput = document.querySelector('#userText')
let userSubButton = document.querySelector('#userSubBtn')
let taskList = document.querySelector('#taskList')
let archiveElement = document.querySelector('#doneList')

// Global Variables
let taskCounter = 1
let tasks = []
let archives = []

// Initial Events
document.addEventListener('load', loadFromStorage())
userSubButton.addEventListener("click", () => grabUserInput())

// Functions
function loadFromStorage(){

  JSON.parse(localStorage.getItem('archive')) == null ? archives = [] : archives = JSON.parse(localStorage.getItem('archive'))
  JSON.parse(localStorage.getItem('list')) == null ? tasks = [] : JSON.parse(localStorage.getItem('list')).forEach(task => createTask(task))

  if(archives.length > 0){
    archiveElement.style.display = 'block'
    archives.forEach(task => {
      let newElm = document.createElement('div')
      newElm.innerText = task
      newElm.className = 'complete'
      console.log(newElm.innerText)
      archiveElement.appendChild(newElm)
    })
  }

}


function grabUserInput(){
  createTask(userInput.value.trim())

  userInput.value=""
}

function clickTask(id){
  let task = document.querySelector(`#${id}`)

  if(task.className === "complete"){
    task.className = ''
    task.firstChild.checked = false
  }else{
    task.className = 'complete'
    task.firstChild.checked = true
  }
}

function removeTask(id){
  let task = document.querySelector(`#${id}`)
  let text = task.innerText.slice(0,-1)
  console.log(text)
  archives.push(text)

  tasks = tasks.filter(task => task != text)


  localStorage.setItem('archive',JSON.stringify(archives))


  taskList.removeChild(task)
  task.firstChild.remove()
  task.lastElementChild.remove()
  archiveElement.appendChild(task)

  archiveElement.children.length > 0 ? archiveElement.style.display = 'block' : archiveElement.style.display = 'none'

  localStorage.setItem('list',JSON.stringify(tasks))
}

function createTask(inVal){

  let curId = `task${taskCounter}`
  let newDiv = document.createElement('div')
  let checkBox = document.createElement('input')
  let taskBtn = document.createElement('button')

  newDiv.id = curId
  checkBox.type = 'checkbox'
  taskBtn.innerText = "X"

  let newTask = taskList.appendChild(newDiv)
  newTask.appendChild(checkBox)
  newTask.append(inVal)
  newTask.append(taskBtn)

  tasks.push(inVal)

  newTask.addEventListener('click', () => clickTask(curId))
  taskBtn.addEventListener('click', () => removeTask(curId))

  taskCounter++

  localStorage.setItem('list',JSON.stringify(tasks))
}

