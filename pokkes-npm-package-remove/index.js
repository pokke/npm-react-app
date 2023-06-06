import { filterTodosByCondition } from 'pokkes-npm-package-utils';

function removeTodo(todos, todoToRemove) {
    return todos.filter((todo) => todo.id !== todoToRemove.id);
}

function removeTodoByCondition(todos, conditionFunc) {
    return filterTodosByCondition(todos, conditionFunc);
}

module.exports = {
    removeTodo,
    removeTodoByCondition,
};
