import { bootstrap } from '@lirx/dom';
import { TodoListWithSignalsComponent } from './components/todo-list/signals/todo-list-with-signals.component';
import { TodoListWithStoreComponent } from './components/todo-list/store/todo-list-with-store.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

export function todoListExample() {
  // bootstrap(TodoListWithObservablesComponent);
  // bootstrap(TodoListWithStoreComponent);
  bootstrap(TodoListWithSignalsComponent);
}
