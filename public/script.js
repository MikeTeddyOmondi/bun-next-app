// //Getting all required elements
// const inputField = document.querySelector(".input-field textarea"),
//   todoLists = document.querySelector(".todoLists"),
//   pendingNum = document.querySelector(".pending-num"); // ,
// // clearButton = document.querySelector(".clear-button");

// function getRandomInt() {
//   return Math.floor(Math.random() * 10000);
// }

// const fetch_todos = async () => {
//   let res = await fetch("http://localhost:5000/todos", {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   let todos = await res.json();
//   return todos;
// };

// const add_todos = async (value) => {
//   let res = await fetch("http://localhost:5000/todos", {
//     method: "POST",
//     body: JSON.stringify({
//       uuid: getRandomInt(),
//       title: value,
//       completed: false,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   let newTodo = await res.json();
//   return newTodo;
// };

// const update_todos = async (id, value) => {
//   let res = await fetch(`http://localhost:5000/todos/${id}`, {
//     method: "PATCH",
//     body: JSON.stringify({
//       completed: value,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   let newTodo = await res.json();
//   return newTodo;
// };

// const delete_todos = async (id) => {
//   let res = await fetch(`http://localhost:5000/todos/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   let newTodo = await res.json();
//   return newTodo;
// };

// const allTasks = async () => {
//   let allTodos = await fetch_todos();
//   console.log(allTodos);

//   let tasks = document.querySelectorAll(".pending");

//   // if tasks' length is 0 then pending num text content will be no, if not then pending num value will be task's length
//   pendingNum.textContent = allTodos.length === 0 ? "no" : tasks.length;

//   let allLists = document.querySelectorAll(".list");
//   if (allLists.length > 0) {
//     todoLists.style.marginTop = "20px";
//     // clearButton.style.pointerEvents = "auto";
//     return;
//   }
//   todoLists.style.marginTop = "0px";
//   // clearButton.style.pointerEvents = "none";

//   for (let todo of allTodos) {
//     let liTag = ` <li class="list pending" onclick="handleStatus(this)">
//           <input type="checkbox" />
//           <span class="task" data-id=${todo.id}>${todo.title}</span>
//           <i class="uil uil-trash" onclick="deleteTask(this)"></i>
//         </li>`;
//     todoLists.insertAdjacentHTML("beforeend", liTag); //inserting li tag inside the todolist div
//   }
// };

// // Add Task
// inputField.addEventListener("keyup", async (e) => {
//   let inputVal = inputField.value.trim(); //trim fuction removes space of front and back of the inputed value

//   //if enter button is clicked and inputed value length is greated than 0.
//   if (e.key === "Enter" && inputVal.length > 0) {
//     // API POST Request
//     let newTodo = await add_todos(inputVal);
//     console.log({ newTask: newTodo });

//     let liTag = ` <li class="list pending" onclick="handleStatus(this)">
//           <input type="checkbox" />
//           <span class="task" data-id=${newTodo.id}>${newTodo.title}</span>
//           <i class="uil uil-trash" onclick="deleteTask(this)"></i>
//         </li>`;

//     todoLists.insertAdjacentHTML("beforeend", liTag); //inserting li tag inside the todolist div
//     inputField.value = ""; //removing value from input field
//     allTasks();
//   }
// });

// // Complete/ Uncomplete task actions
// async function handleStatus(e) {
//   const checkbox = e.querySelector("input"); //getting checkbox
//   const dataId = e.querySelector("span").getAttribute("data-id"); //getting value of data-id
//   checkbox.checked = checkbox.checked ? false : true;
//   if (checkbox.checked === true) {
//     await update_todos(dataId, true);
//   } else {
//     await update_todos(dataId, false);
//   }
//   e.classList.toggle("pending");
//   allTasks();
// }

// // Delete one task
// async function deleteTask(e) {
//   const dataId = e.parentElement.querySelector("span").getAttribute("data-id"); //getting value of data-id
//   await delete_todos(dataId);
//   e.parentElement.remove(); //getting parent element and remove it
//   allTasks();
// }

// // // Delete all tasks
// // clearButton.addEventListener("click", () => {
// //   todoLists.innerHTML = "";
// //   allTasks();
// // });

// // IIFE - Immediately Invoked Function Expression
// (async () => {
//   allTasks();
// })();
