// Select DOM elements
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Add a task to the list
addButton.addEventListener("click", () => {
    const task = taskInput.value.trim(); // Get and trim input value
    if (task !== "") {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(li); // Add task to list
        taskInput.value = ""; // Clear input field

        // Add delete functionality
        const deleteBtn = li.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            li.remove(); // Remove task
        });
    } else {
        alert("Task cannot be empty!");
    }
    //Task completeion
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
    });
});

