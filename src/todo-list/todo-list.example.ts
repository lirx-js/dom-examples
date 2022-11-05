import { bootstrap } from '@lirx/dom';
import { TodoListWithStoreComponent } from './components/todo-list/todo-list-with-store.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

export function todoListExample() {
  bootstrap(TodoListComponent);
  // bootstrap(TodoListWithStoreComponent);
}
