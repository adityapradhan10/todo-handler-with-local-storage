const getTodosFromLocalStorage = () => {
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
};

const addTodoToLocalStorage = (todo) => {
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const deleteTodoFromLocalStorage = (todo) => {
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todos.findIndex((t) => t.text === todo);
  todos.splice(todoIndex, 1);

  localStorage.setItem("todos", JSON.stringify(todos));
};

const UpdateTodoInLocalStorage = (todo) => {
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todos.findIndex((t) => t.text === todo);

  todos[todoIndex].isCompleted = !todos[todoIndex].isCompleted;

  localStorage.setItem("todos", JSON.stringify(todos));
};
