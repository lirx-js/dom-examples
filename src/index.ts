import { fileToDataUrlExample } from './file-to-data-url/file-to-data-url.example';
import { lazyLoadingExample } from './lazy-loading/lazy-loading.example';
import { mathMLExample } from './math-ml/math-ml.example';
import { svgExample } from './svg/svg.example';
import { syntaxExample } from './syntax/syntax.example';
import { recursiveExample } from './recursive/recursive.example';
import { tableExample } from './table/table.example';
import { todoListExample } from './todo-list/todo-list.example';

function main(): void {
  // syntaxExample();
  // mathMLExample();
  // svgExample();
  // recursiveExample();
  // lazyLoadingExample();
  // todoListExample();
  // tableExample();
  fileToDataUrlExample();
}

window.onload = main;

