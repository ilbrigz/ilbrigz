const newTaskInput = document.querySelector('#newTaskInput'),
taskButton = document.querySelector('#taskBtn'),
taskBox = document.querySelector('.taskBox'),
filterList = document.querySelector('#filterList'),
tasksList = document.querySelector('.tasksList'),
clearTasksButton = document.querySelector('#clearTasksBtn')


loadEvents();

//event listeners callbacks
function addTask() {
	if(newTaskInput.value === ''){alert('Please add a task')} else
	{const parentDiv = document.createElement('div');
		parentDiv.className = 'control list-item';
		parentDiv.innerHTML = `<div class="tags has-addons collection-item">
					      <a class="tag is-link">${newTaskInput.value}</a>
					      <a class="tag is-delete"></a>
					    </div>`	
		tasksList.appendChild(parentDiv)}
	removeBox();
	storeTaskInLocalStorage(newTaskInput.value);
		newTaskInput.value = '';
}

function removeTask(e) {
	if(e.target.classList.contains('is-delete')){
		e.target.parentElement.parentElement.remove();
		removeTaskFromLocalStorage(
		e.target.parentElement.firstElementChild.textContent)
	}

	removeBox();
}

function clearTasks() {
	while(tasksList.firstChild) {
		tasksList.removeChild(tasksList.firstChild);
	}

		localStorage.clear();
	
	removeBox();
}

function filterTasksList(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll('.collection-item').forEach(
		function(task){
		const item = task.firstElementChild.textContent
		if(item.toLowerCase().indexOf(text) != -1){
		task.parentElement.style.display = 'block';
		} 
		else {
		task.parentElement.style.display = 'none';
		}
		})
}
function removeBox() {
	if (!document.querySelectorAll('.collection-item').length){
		taskBox.style.display = "none";
	} else {
		taskBox.style.display = "block";
	}
}

//store in ls
function storeTaskInLocalStorage (task) {
	let tasks;
	if(localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks))
}

function domLoaded() {
	removeBox();
	getTasks();
}

function getTasks() {
	let tasks;
	if(localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	if(tasks === []){taskBox.style.display = "block"};
	tasks.forEach(function(task){
		const parentDiv = document.createElement('div');
		parentDiv.className = 'control list-item';
		parentDiv.innerHTML = `<div class="tags has-addons collection-item">
					      <a class="tag is-link">${task}</a>
					      <a class="tag is-delete"></a>
					    </div>`	
		tasksList.appendChild(parentDiv)
	})
}
//remove single task from local storage
function removeTaskFromLocalStorage(textContent){
	let tasks;
	if(localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach(function(task, index){
		if(textContent === task){
			tasks.splice(index, 1);
		}
	});
	localStorage.setItem('tasks', JSON.stringify(tasks))
}
//load all the event listeners
function loadEvents() {
taskButton.addEventListener('click', addTask);
newTaskInput.addEventListener('keydown', function(){
	if (event.which == 13 || event.keyCode == 13)
	{addTask()}});
tasksList.addEventListener('click', removeTask);
clearTasksButton.addEventListener('click',clearTasks);
filterList.addEventListener('keyup', filterTasksList);
document.addEventListener('DOMContentLoaded', domLoaded)
};

