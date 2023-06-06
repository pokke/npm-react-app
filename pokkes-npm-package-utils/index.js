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

module.exports = {
    markAsCompleted,
    markAsUncompleted,
};
