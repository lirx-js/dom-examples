import { lazyLoadingExample } from './lazy-loading/lazy-loading.example';
import { syntaxExample } from './syntax/syntax.example';
import { recursiveExample } from './recursive/recursive.example';
import { tableExample } from './table/table.example';
import { todoListExample } from './todo-list/todo-list.example';

function main(): void {
  // syntaxExample();
  // recursiveExample();
  // lazyLoadingExample();
  // todoListExample();
  tableExample();
}

window.onload = main;

