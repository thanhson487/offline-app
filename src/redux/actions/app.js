export const addTodoOffline = content => ({
  type: "ADD_TODO",
  payload: {
    content
  },
  meta: {
    offline: {
      effect: {
        url: "http://localhost:3000/todoList",
        method: "POST",
        body: `name=${content}`,
        headers: { "content-type": "application/json" }
      },

      commit: { type: "ADD_TODO", meta: { content } },
      rollback: { type: "ADD_TODO_ROLLBACK", meta: { content } }
    }
  }
});

