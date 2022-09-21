import { $$map, IObservable, IObserver, let$$, single } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent } from '@lirx/dom';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';

// @ts-ignore
import html from './todo-list.component.html?raw';
// @ts-ignore
import style from './todo-list.component.scss?inline';

/**
 * COMPONENT: 'app-todo-list'
 **/

interface ITodoListComponentItemData {
  readonly message$: IObservable<string>;
  readonly $remove: IObserver<any>;
}

type ITodoListComponentItemsList = readonly ITodoListComponentItemData[];

interface IData {
  readonly inputValue$: IObservable<string>;
  readonly $onInput: IObserver<Event>;
  readonly $onFormSubmit: IObserver<Event>;

  readonly items$: IObservable<ITodoListComponentItemsList>;
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
    const [$items, items$, getItems] = let$$<ITodoListComponentItemsList>([]);

    const createItem = (
      message: string,
    ): ITodoListComponentItemData => {
      const item: ITodoListComponentItemData = {
        message$: single(message),
        $remove: (): void => {
          removeItem(item);
        },
      };
      return item;
    };

    const addItem = (
      item: ITodoListComponentItemData,
    ): void => {
      $items([
        ...getItems(),
        item,
      ]);
    };

    const createAndAddItem = (
      message: string,
    ): void => {
      addItem(createItem(message));
    };

    const removeItem = (
      item: ITodoListComponentItemData,
    ): void => {
      const items: ITodoListComponentItemsList = getItems();
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
        createAndAddItem(inputValue);
      }

      $inputValue('');
    };

    createAndAddItem('Check this awesome tutorial');
    createAndAddItem('Write your own components');

    return {
      inputValue$,
      $onInput,
      $onFormSubmit,
      items$,
    };
  },
});
