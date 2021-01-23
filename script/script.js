(function () {
  const form = document.getElementById('item-form');
  const taskList = document.getElementById('item-container');
  const clearBtn = document.getElementById('clear-items-btn');
  const itemInput = document.getElementById('item-input');
  const feedback = document.querySelector('.feedback');

  //add task to list
  const addTask = (e) => {
    e.preventDefault();

    task = itemInput.value;

    //if value is empty show alert else add task to list
    if (task === '') {
      feedback.classList.add('show');

      setTimeout(() => {
        feedback.classList.remove('show');
      }, 3000);
    } else {
      //add div with input to list
      taskList.insertAdjacentHTML(
        'afterbegin',
        `
        <div class="single-item" id="single-item">
          <h5 class="item-name" id="item-name">${task}</h5>
          <div class="item-icons">
            <a href="#" class="complete-item">
              <i class="far fa-check-circle"></i>
            </a>
            <a href="#" class="edit-item">
              <i class="far fa-edit"></i>
            </a>
            <a href="#" class="delete-item">
              <i class="far fa-trash-alt"></i>
            </a>
        </div>
      `
      );

      //add task in LS
      storeTaskInlocalSorage(task);

      //clear input field
      itemInput.value = '';
    }
  };

  //check which button is pressed then complete task
  const complete = (e) => {
    //if check mark button is pressed
    if (e.target.parentElement.classList.contains('complete-item')) {
      //add class to task that is completed
      e.target.parentElement.parentElement.parentElement.firstElementChild.classList.add(
        'completed'
      );
    }

    //if edit button is pressed
    if (e.target.parentElement.classList.contains('edit-item')) {
      //put value of task that need to be edited in form input
      itemInput.value =
        e.target.parentElement.parentElement.parentElement.firstElementChild.textContent;
      //delete tasks from UI
      e.target.parentElement.parentElement.parentElement.remove();
      //delete tasks from LS
      dleteTaskFromLocalStorage(
        e.target.parentElement.parentElement.parentElement.firstElementChild
      );
    }

    //if delete button is pressed
    if (e.target.parentElement.classList.contains('delete-item')) {
      //delete tasks from UI
      e.target.parentElement.parentElement.parentElement.remove();
      //delete tasks from LS
      dleteTaskFromLocalStorage(
        e.target.parentElement.parentElement.parentElement.firstElementChild
      );
    }
  };

  //clear all task in list
  const clearTasks = () => {
    taskList.innerHTML = '';
    //delete all tasks from LS
    localStorage.clear();
  };

  //store tasks in local storage
  const storeTaskInlocalSorage = (task) => {
    let tasks;

    //check if the task is in local storage
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    //push new task in array
    tasks.push(task);

    //stor all task in LS
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  //get tasks from local storage
  const getTasks = () => {
    let tasks;

    //check if the task is in local storage
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    //loop through all task and add them in UI
    tasks.forEach((task) => {
      taskList.insertAdjacentHTML(
        'afterbegin',
        `
        <div class="single-item" id="single-item">
          <h5 class="item-name" id="item-name">${task}</h5>
          <div class="item-icons">
            <a href="#" class="complete-item">
              <i class="far fa-check-circle"></i>
            </a>
            <a href="#" class="edit-item">
              <i class="far fa-edit"></i>
            </a>
            <a href="#" class="delete-item">
              <i class="far fa-trash-alt"></i>
            </a>
        </div>
      `
      );
    });
  };

  //delete task from local storage
  const dleteTaskFromLocalStorage = (item) => {
    let tasks;

    //check if the task is in local storage
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    //loop through all task and delete the one that is pressed
    tasks.forEach((task, index) => {
      if (item.textContent === task) {
        tasks.splice(index, 1);
      }
    });

    //store the remaining tasks from array in LS
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  //load tasks from local storage
  document.addEventListener('DOMContentLoaded', getTasks);
  //add task event
  form.addEventListener('submit', addTask);
  //check for complete, edit & delete buttons
  taskList.addEventListener('click', complete);
  //delete all task
  clearBtn.addEventListener('click', clearTasks);
})();
