const input = document.querySelector('#input-task');
const addTaskBtn = document.querySelector('#add-task');
const resetBtn = document.querySelector('#reset');
const rstListBtn = document.querySelector('#rst-list');
const initialLst = document.querySelector('#initial-tasks');
const finaltasks = document.querySelector('#Final-Tasks');
const toastLocation = document.querySelector('.toast');
const toastPosition = document.querySelector('.toast1');
const compBtn = document.querySelector('comp_task');

function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toastLocation.appendChild(toast);
  setTimeout(() => {
    toast.remove();
    toastPosition.style.display = 'none';
  }, 1000);
  toastPosition.style.display = 'block';
}

const max = 5;
const tasks = [];
const finalT = [];
rstListBtn.disabled = true;
resetBtn.disabled = true;

//function for removing the last task and displaying the latest added task by the user
function addTask(newTask) {
  if (tasks.length >= max) {
    tasks.pop();
  }
  tasks.unshift(newTask);
  displayTasks();
}

//function to display the tasks added by the user into the list of arrays using the push() operation and displaying it in a sequential manner 
//the for each loop is used to iterate over every added element/task into the initial list array and pushing the user added input to the array
//removing of a task from the list editing the present ones is also achieved using the remove and edit buttons while the 
//confirm btn allows to push the tasks from the initial list to the final list array and displaying it accordingly
function displayTasks() {
  initialLst.innerHTML = '';
  tasks.forEach((task) => {
    const taskIn = document.createElement('input');
    taskIn.type = 'text';
    taskIn.value = task;
    taskIn.classList.add('taskInput');
    const rvmBtn = document.createElement('button');
    rvmBtn.innerText = 'Remove';
    rvmBtn.classList.add('rvm-btn');
    const editBtn = document.createElement('button');
    editBtn.innerHTML = 'Edit';
    editBtn.classList.add('edit-btn');
    const confirmBtn = document.createElement('button');
    confirmBtn.innerText = 'Confirm';
    confirmBtn.classList.add('confirm-btn');
    const br = document.createElement('br');
    const crfmEdit = document.createElement('button');
    crfmEdit.innerText = 'Confirm Edit!';
    crfmEdit.classList.add('crfm-edit');

    // Edit button section
    editBtn.addEventListener('click', function () {
      taskIn.disabled = false;
      confirmBtn.style.display = 'none';
      rvmBtn.style.display = 'none';
      editBtn.style.display = 'none';

      // Confirm edit button section
      crfmEdit.style.display = 'inline-block';

      crfmEdit.addEventListener('click', function () {
        confirmBtn.style.display = 'inline-block';
        rvmBtn.style.display = 'inline-block';
        crfmEdit.style.display = 'none';
        taskIn.disabled = true;
        showToast(`Todo edited to ${taskIn.value} successfully!`);
      });

      showToast('Note: You can edit a todo only once!');
    });
    taskIn.disabled = true;

    // Remove button section

    rvmBtn.addEventListener('click', function () {
      const index = tasks.indexOf(task);
      if (index !== -1) {
        // Remove task from the array using the splice function so that a task is removed from the array 
        tasks.splice(index, 1);
      }
      taskIn.remove();
      editBtn.remove();
      rvmBtn.remove();
      confirmBtn.remove();
      br.remove();
      crfmEdit.remove();
      addTaskBtn.disabled = false;
      input.disabled = false;
      showToast(`Task removed: ${taskIn.value} successfully!`);
    });

    // Confirm button section

    confirmBtn.addEventListener('click', function () {
      rstListBtn.style.display = 'block';
      rstListBtn.disabled = false;
      const final = document.createElement('input');
      final.value = taskIn.value;
      final.classList.add('final');
      final.disabled = true;

      finalT.push(taskIn.value);

      if (finalT.length > max) {
        showToast(`No more task can be added to the list!`);
      } else {
        taskIn.remove();
        editBtn.remove();
        rvmBtn.remove();
        confirmBtn.remove();
        br.remove();
        input.disabled = false;
        addTaskBtn.disabled = false;
        tasks.pop(taskIn.value);
        finaltasks.appendChild(final);

        showToast(`Task ${taskIn.value} added to completed todo's successfully!`);
        showToast(`Task ${taskIn.value} marked completed!`);
      }
    });

    crfmEdit.style.display = 'none';
    initialLst.appendChild(taskIn);
    initialLst.appendChild(editBtn);
    initialLst.appendChild(rvmBtn);
    initialLst.appendChild(confirmBtn);
    initialLst.appendChild(crfmEdit);
    initialLst.appendChild(br);

    // Clear the input field
    input.value = '';
    input.focus();
  });
}
toastPosition.style.display = 'none';
addTaskBtn.addEventListener('click', function () {

  toastPosition.style.display = 'block';
  resetBtn.disabled = false;
  rstListBtn.disabled = false;
  const newTask = input.value.trim();
  if (newTask === '') {
    showToast('Add a task first!');
  } else {
    addTask(newTask);
    input.value = '';
    input.focus();
    if (newTask.trim() !== '') {
      toastPosition.style.display = 'inline-block';
      showToast(`Task: ${newTask} added successfully!`);
    }
    if (tasks.length !== 0) {
      resetBtn.style.display = 'inline';
    }
    if (finalT.length !== 0) {
      rstListBtn.style.display = 'inline';
    }
  }
});

resetBtn.addEventListener('click', function () {
  tasks.length = 0;
  displayTasks();
  resetBtn.disabled = true;
  showToast('Task reset successful!');
});

rstListBtn.addEventListener('click', function () {
  finalT.length = 0;
  finaltasks.innerHTML = '';
  rstListBtn.disabled = true;
  showToast('List reset successful!');
});
displayTasks();

