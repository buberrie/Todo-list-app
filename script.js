// Get elements from the DOM
const input = document.getElementById("task-input");
const inputBtn = document.getElementById("add-task");
const taskContainer = document.getElementById("task-list-parent");

// display message in the task container on load
let span = document.createElement("span");
if (taskContainer.textContent.trim().length === 0) {
    span.innerHTML = "No task to display, Add task";
    span.style.fontWeight = "bold";
    span.style.color = "#6d0596";
    taskContainer.appendChild(span); 
} 

// Event listener for the "Add Task" button
inputBtn.addEventListener("click", () => {
  // Check if the input value is empty
  if (input.value === "") {
    alert("Task can not be empty");
  } else {
    // remove the welcome message then
    if (span.parentNode) {
        taskContainer.removeChild(span); 
    }
    
    // Create a new task container
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";

    // Create an input element for editing and a paragraph element for displaying task text
    let editInput = document.createElement("input");
    let p = document.createElement("p");
    
    // Set the initial values for editInput and p
    editInput.value = input.value;
    p.innerHTML = editInput.value;

    // Add an input event listener to update p when editInput changes
    editInput.addEventListener('input', () => {
        p.innerHTML = editInput.value;
    });

    // Create buttons for deleting, saving, and editing
    let delBtn = document.createElement("span");
    delBtn.className = "delete";
    delBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    let saveBtn = document.createElement("span");
    saveBtn.className = "save";
    saveBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

    let editBtn = document.createElement("span");
    editBtn.className = "edit";
    editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';

    // Create a container for the buttons
    let btnContainer = document.createElement("div");
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(saveBtn);
    btnContainer.appendChild(delBtn);

    // Append elements to the task container
    taskDiv.appendChild(p);
    taskDiv.appendChild(editInput);
    taskDiv.appendChild(btnContainer);

    // Append the task container to the task list container
    taskContainer.appendChild(taskDiv);

    // Clear the input field
    input.value = "";
  }
});

// Event listener for clicks on the task container
taskContainer.addEventListener("click", (e) => {
    // Get references to elements within the clicked task container
    const parent = e.target.parentElement.parentElement.parentElement;
    const p = parent.querySelector('p');
    const editInput = parent.querySelector('input');
    const save = parent.querySelector('i.fa-check');
    const edit = parent.querySelector('i.fa-pen-to-square')
  
    // Check the type of the clicked element
    if (e.target.tagName === "P") {
      // Toggle the "checked" class for the paragraph element
      e.target.classList.toggle("checked");
    } else if (e.target.classList.contains('fa-solid') && e.target.classList.contains('fa-xmark')) {
      // Remove the parent task container if the delete button is clicked
      parent.remove();
    } else if ((e.target.classList.contains('fa-regular') && e.target.classList.contains('fa-pen-to-square')) || (e.target.classList.contains('fa-solid') && e.target.classList.contains('fa-check'))) {
      // Toggle the "edit-mode" class for the paragraph, input, save button, and edit button
      p.classList.toggle('edit-mode');
      editInput.classList.toggle('edit-mode');
      save.parentElement.classList.toggle('edit-mode');
      edit.parentElement.classList.toggle('edit-mode');
    }
});
