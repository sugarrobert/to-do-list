(function () {
  const form = document.getElementById('item-form');
  const taskList = document.getElementById('item-container');
  const clearBtn = document.getElementById('clear-items-btn');
  const itemInput = document.getElementById('item-input');

  //add task to list
  const addTask = (e) => {
    e.preventDefault();

    task = itemInput.value;

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

    //clear input field
    itemInput.value = '';
  };

  //check which button is pressed then complete task
  const complete = (e) => {
    if (e.target.parentElement.classList.contains('complete-item')) {
      e.target.parentElement.parentElement.parentElement.firstElementChild.classList.add(
        'completed'
      );
    } else if (e.target.parentElement.classList.contains('edit-item')) {
      itemInput.value =
        e.target.parentElement.parentElement.parentElement.firstElementChild.textContent;
      e.target.parentElement.parentElement.parentElement.remove();
    } else if (e.target.parentElement.classList.contains('delete-item')) {
      e.target.parentElement.parentElement.parentElement.remove();
    }
  };

  //clear all task in list
  const clearItems = () => {
    taskList.innerHTML = '';
  };

  //add task event
  form.addEventListener('submit', addTask);
  //check for complete, edit & delete buttons
  taskList.addEventListener('click', complete);
  //delete all task
  clearBtn.addEventListener('click', clearItems);
})();
