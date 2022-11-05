import { $$map, IObservable, IObserver, let$$ } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent } from '@lirx/dom';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';

// @ts-ignore
import html from './todo-list.component.html?raw';
// @ts-ignore
import style from './todo-list.component.scss?inline';

/**
 * COMPONENT: 'app-todo-list'
 **/

interface ITodoListItem {
  readonly message: string;
}

type ITodoListItemsList = readonly ITodoListItem[];

interface IData {
  readonly inputValue$: IObservable<string>;
  readonly $onInput: IObserver<Event>;
  readonly $onFormSubmit: IObserver<Event>;

  readonly items$: IObservable<ITodoListItemsList>;

  readonly removeItem: (item: ITodoListItem) => void;
}

interface ITodoListComponentConfig {
  element: HTMLElement;
  data: IData;
}

export const TodoListComponent = createComponent<ITodoListComponentConfig>({
  name: 'app-todo-list',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      TodoListItemComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  init: (): IData => {
    const [$inputValue, inputValue$, getInputValue] = let$$<string>('');
    const [$items, items$, getItems] = let$$<ITodoListItemsList>([]);

    const addItem = (
      message: string,
    ): void => {
      $items([
        ...getItems(),
        {
          message,
        },
      ]);
    };

    const removeItem = (
      item: ITodoListItem,
    ): void => {
      const items: ITodoListItemsList = getItems();
      const index: number = items.indexOf(item);
      if (index !== -1) {
        $items([
          ...items.slice(0, index),
          ...items.slice(index + 1),
        ]);
      }
    };

    const $onInput = $$map($inputValue, (event: Event): string => (event.target as HTMLInputElement).value);

    const $onFormSubmit = (
      event: Event,
    ): void => {
      event.preventDefault();

      const inputValue: string = getInputValue().trim();

      if (inputValue !== '') {
        addItem(inputValue);
      }

      $inputValue('');
    };

    addItem('Check this awesome tutorial');
    addItem('Write your own components');

    return {
      inputValue$,
      $onInput,
      $onFormSubmit,
      items$,
      removeItem,
    };
  },
});
