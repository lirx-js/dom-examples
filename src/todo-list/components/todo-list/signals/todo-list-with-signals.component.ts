import { signal, ISignal, $log, unknownToObservableStrict } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, Component } from '@lirx/dom';
import { Writable } from '@lirx/utils';
import { TodoListItemComponent } from '../../todo-list-item/todo-list-item.component';
import { ITodoListItemsList, ITodoListItem } from '../todo-list.types';

// @ts-ignore
import html from './todo-list-with-signals.component.html?raw';
// @ts-ignore
import style from '../todo-list.component.scss?inline';

/**
 * COMPONENT: 'app-todo-list-with-signals'
 **/

interface ITemplateData {
  readonly inputValue: ISignal<string>;
  readonly onInput: (event: Event) => void;
  readonly onFormSubmit: (event: Event) => void;

  readonly items: ISignal<ITodoListItemsList>;

  readonly removeItem: (item: ITodoListItem) => void;
}

export const TodoListWithSignalsComponent = new Component({
  name: 'app-todo-list-with-signals',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [
      TodoListItemComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  templateData: (): ITemplateData => {
    /* ITEMS */

    const items = signal<ITodoListItemsList>([]);

    const addItem = (
      message: string,
    ): void => {
      items.mutate((items: Writable<ITodoListItemsList>): void => {
        items.push({
          message,
        });
      });
    };

    const removeItem = (
      item: ITodoListItem,
    ): void => {
      const index: number = items().indexOf(item);
      if (index !== -1) {
        items.mutate((items: Writable<ITodoListItemsList>): void => {
          items.splice(index, 1);
        });
      }
    };

    addItem('Check this awesome tutorial');
    addItem('Write your own components');

    /* INPUT */

    const inputValue = signal<string>('');

    const onInput = (event: Event): void => {
      inputValue.set((event.target as HTMLInputElement).value);
    };

    const onFormSubmit = (event: Event): void => {
      event.preventDefault();

      const value = inputValue().trim();

      if (value !== '') {
        addItem(value);
      }

      inputValue.set('');
    };

    return {
      inputValue,
      onInput,
      onFormSubmit,
      items,
      removeItem,
    };
  },
});
