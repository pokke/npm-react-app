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

module.exports = {
    createTodo,
    markAsCompleted,
    markAsUncompleted,
};
