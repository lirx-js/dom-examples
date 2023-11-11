import { $$map, IObservable, IObserver, let$$, map$$ } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, Component } from '@lirx/dom';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
import { ITodoListItemsList, ITodoListItem } from './todo-list.types';

// @ts-ignore
import html from './todo-list.component.html?raw';
// @ts-ignore
import style from './todo-list.component.scss?inline';

/**
 * COMPONENT: 'app-todo'
 **/

interface ITemplateData {
  readonly inputValue$: IObservable<string>;
  readonly $onInput: IObserver<Event>;
  readonly onFormSubmit$: IObservable<IObserver<Event>>;

  readonly items$: IObservable<ITodoListItemsList>;

  readonly removeItem: (item: ITodoListItem) => void;
}

export const TodoListComponent = new Component({
  name: 'app-todo-list',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [
      TodoListItemComponent,
      // TodoListItemShadowComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  templateData: (): ITemplateData => {
    const [$inputValue, inputValue$] = let$$<string>('');
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

    const onFormSubmit$ = map$$(inputValue$, (inputValue: string): IObserver<Event> => {
      inputValue = inputValue.trim();

      return (
        event: Event,
      ): void => {
        event.preventDefault();

        if (inputValue !== '') {
          addItem(inputValue);
        }

        $inputValue('');
      };
    });

    addItem('Check this awesome tutorial');
    addItem('Write your own components');

    return {
      inputValue$,
      $onInput,
      onFormSubmit$,
      items$,
      removeItem,
    };
  },
});
