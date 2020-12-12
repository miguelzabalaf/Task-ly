

const createTaskButton = document.querySelector('#create-task-button');

const modalCreateTask = document.querySelector('#modalCreateTask')

const modalCreateTaskClose = document.querySelector('.modalCreateTaskClose')

if (createTaskButton) {
  createTaskButton.onclick = () => {
    modalCreateTask.style.display = "block";
  }

  window.onclick = function (event) {
    if (event.target == modalCreateTask || event.target == modalCreateTaskClose) {
      modalCreateTask.style.display = "none";
    }
  }
}