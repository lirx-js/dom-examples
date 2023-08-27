import { bootstrap } from '@lirx/dom';
import { TodoListWithSignalsComponent } from './components/todo-list/todo-list-with-signals.component';
import { TodoListWithStoreComponent } from './components/todo-list/todo-list-with-store.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

export function todoListExample() {
  bootstrap(TodoListComponent);
  // bootstrap(TodoListWithStoreComponent);
  // bootstrap(TodoListWithSignalsComponent);
}
