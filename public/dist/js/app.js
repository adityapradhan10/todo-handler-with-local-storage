const remainingTodos = document.getElementById("remaining-todos");
const todos = document.getElementById("todos");
const todoInput = document.getElementById("todo-input");
const todoAdd = document.getElementById("todo-add");
const tabs = document.getElementById("tab");

const updateTodoCount = (totalTodos, completedTodos) => {
  remainingTodos.textContent = `${totalTodos - completedTodos} Active todos`;
};

const addTodo = (todoText, isCompleted = false) => {
  const todo = document.createElement("div");
  if (isCompleted) {
    todo.classList = "todo flex align-center todo--completed";
    todo.innerHTML = `
          <img
              src="./img/done-filled.svg"
              alt="Todo indicator"
              class="todo__indicator"
          />
          <p class="todo__text">${todoText}</p>
          <img src="./img/delete.svg" alt="Delete todo" class="todo__delete" />
      `;
  } else {
    todo.classList = "todo flex align-center";
    todo.innerHTML = `
          <img
              src="./img/done.svg"
              alt="Todo indicator"
              class="todo__indicator"
          />
          <p class="todo__text">${todoText}</p>
          <img src="./img/delete.svg" alt="Delete todo" class="todo__delete" />
      `;
  }

  todos.appendChild(todo);
};

const loadTodo = () => {
  let todos = getTodosFromLocalStorage();

  todos.forEach((todo) => addTodo(todo.text, todo.isCompleted));
};

updateTodoCount(
  todos.childElementCount,
  document.querySelectorAll(".todo--completed").length
);

loadTodo();

todoAdd.addEventListener("click", (e) => {
  e.preventDefault();
  todoAdd.parentElement.reportValidity();

  let todoText = todoInput.value;
  todoInput.value = "";
  addTodoToLocalStorage({ text: todoText, isCompleted: false });

  addTodo(todoText);

  updateTodoCount(
    todos.childElementCount,
    document.querySelectorAll(".todo--completed").length
  );
});

todos.addEventListener("click", (e) => {
  if (e.target.classList.contains("todo__indicator")) {
    const targettodo = e.target.parentElement;

    if (targettodo.classList.contains("todo--completed")) {
      targettodo.classList.remove("todo--completed");
      targettodo.children[0].src = "./img/done.svg";
    } else {
      targettodo.classList.add("todo--completed");
      targettodo.children[0].src = "./img/done-filled.svg";
    }

    UpdateTodoInLocalStorage(targettodo.querySelector("p").textContent);

    updateTodoCount(
      todos.childElementCount,
      document.querySelectorAll(".todo--completed").length
    );
  }

  if (e.target.classList.contains("todo__delete")) {
    const todoToDelete = e.target.parentElement;

    deleteTodoFromLocalStorage(todoToDelete.querySelector("p").textContent);

    todoToDelete.remove();
    updateTodoCount(
      todos.childElementCount,
      document.querySelectorAll(".todo--completed").length
    );
  }
});

tabs.addEventListener("click", (e) => {
  if (e.target.classList.contains("active")) {
    e.target.classList.remove("active");
  } else {
    for (let i = 0; i < tabs.childElementCount; i++) {
      tabs.children[i].classList.remove("active");
    }

    e.target.classList.add("active");
  }

  todos.childNodes.forEach((todo) => {
    if (tabs.children[0].classList.contains("active")) {
      if (todo.classList.contains("todo--completed")) {
        todo.style.display = "none";
      } else {
        todo.style.display = "flex";
      }
    } else if (tabs.children[1].classList.contains("active")) {
      if (!todo.classList.contains("todo--completed")) {
        todo.style.display = "none";
      } else {
        todo.style.display = "flex";
      }
    } else {
      todo.style.display = "flex";
    }
  });
});
