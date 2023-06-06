import { markAsUncompleted } from 'pokkes-npm-package-utils';

export function removeTodo(todos, todoToRemove) {
    return todos.filter((todo) => todo.id !== todoToRemove.id);
}
