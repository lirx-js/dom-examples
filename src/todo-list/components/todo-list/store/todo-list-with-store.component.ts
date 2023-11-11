import { IObservable, IObserver } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, Component } from '@lirx/dom';
import { Store, StoreAction, StoreReducer } from '@lirx/store';
import { TodoListItemComponent } from '../../todo-list-item/todo-list-item.component';
import { ITodoListItemsList, ITodoListItem } from '../todo-list.types';

// @ts-ignore
import html from './todo-list-with-store.component.html?raw';
// @ts-ignore
import style from '../todo-list.component.scss?inline';

/**
 * STORE
 */

interface ITodoListState {
  readonly items: ITodoListItemsList;
  readonly inputValue: string;
}

const deferredCreateItemAction = StoreAction.defer((state: ITodoListState, message: string): ITodoListState => {
  return {
    ...state,
    items: [
      ...state.items,
      {
        message,
      },
    ],
  };
});

const deferredRemoveItemAction = StoreAction.defer((state: ITodoListState, item: ITodoListItem): ITodoListState => {
  const index: number = state.items.indexOf(item);
  if (index === -1) {
    return state;
  } else {
    return {
      ...state,
      items: [
        ...state.items.slice(0, index),
        ...state.items.slice(index + 1),
      ],
    };
  }
});

const deferredSetInputValueAction = StoreAction.defer((state: ITodoListState, inputValue: string): ITodoListState => {
  return {
    ...state,
    inputValue,
  };
});

const deferredItemsSelector = StoreReducer.defer((state: ITodoListState): ITodoListItemsList => state.items);

const deferredInputValueSelector = StoreReducer.defer((state: ITodoListState): string => state.inputValue);

/**
 * COMPONENT: 'app-todo-list-with-store'
 **/

interface ITemplateData {
  readonly inputValue$: IObservable<string>;
  readonly $onInput: IObserver<Event>;
  readonly $onFormSubmit: IObserver<Event>;

  readonly items$: IObservable<ITodoListItemsList>;

  readonly removeItem: (item: ITodoListItem) => void;
}

export const TodoListWithStoreComponent = new Component({
  name: 'app-todo-list-with-store',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [
      TodoListItemComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  templateData: (): ITemplateData => {
    /* ITEMS */

    // STORE
    const store = Store.create<ITodoListState>({
      items: [],
      inputValue: '',
    });

    // ACTIONS
    const createItemAction = deferredCreateItemAction(store);
    const removeItemAction = deferredRemoveItemAction(store);
    const setInputValueAction = deferredSetInputValueAction(store);

    // SELECTOR
    const itemsSelector = deferredItemsSelector(store);
    const inputValueSelector = deferredInputValueSelector(store);

    // MISC

    const items$ = itemsSelector.observe();

    const removeItem = (item: ITodoListItem): void => {
      removeItemAction.invoke(item);
    };

    createItemAction.invoke('Check this awesome tutorial');
    createItemAction.invoke('Write your own components');

    /* INPUT */

    const inputValue$ = inputValueSelector.observe();

    const $onInput = (event: Event): void => {
      setInputValueAction.invoke((event.target as HTMLInputElement).value);
    };

    const $onFormSubmit = (event: Event): void => {
      event.preventDefault();
      const inputValue: string = inputValueSelector.instant();

      if (inputValue !== '') {
        createItemAction.invoke(inputValue);
      }

      setInputValueAction.invoke('');
    };

    return {
      inputValue$,
      $onInput,
      $onFormSubmit,
      items$,
      removeItem,
    };
  },
});
