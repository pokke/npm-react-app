function markAsCompleted(todo) {
    return {
        ...todo,
        completed: true,
    };
}

function markAsUncompleted(todo) {
    return {
        ...todo,
        completed: false,
    };
}

function createTodo(title) {
    return {
        id: Date.now(),
        title,
        completed: false,
    };
}

function filterTodosByCondition(todos, conditionFunc) {
    return todos.filter(conditionFunc);
}

module.exports = {
    filterTodosByCondition,
    createTodo,
    markAsCompleted,
    markAsUncompleted,
};
