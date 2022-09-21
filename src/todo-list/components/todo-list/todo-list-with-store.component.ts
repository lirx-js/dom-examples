import { $$map, IObservable, IObserver, let$$, mapObservableToObserver } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent } from '@lirx/dom';
import { createDeferredAction, createSelector, createStore, ImmutableArray, mapState } from '@lirx/store';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';

// @ts-ignore
import html from './todo-list.component.html?raw';
// @ts-ignore
import style from './todo-list.component.scss?inline';

/**
 * STORE
 */

interface ITodoListItem {
  readonly message: string;
}

type ITodoListItemsList = ImmutableArray<ITodoListItem>;

interface ITodoListState {
  items: ITodoListItemsList;
}

const createItemAction = createDeferredAction<ITodoListState, [string]>((state: ITodoListState, message: string): ITodoListState => {
  return {
    items: [
      ...state.items,
      {
        message,
      },
    ],
  };
});

const removeItemAction = createDeferredAction<ITodoListState, [ITodoListItem]>((state: ITodoListState, item: ITodoListItem): ITodoListState => {
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

const itemsSelector = createSelector((state: ITodoListState): ITodoListItemsList => state.items);

/**
 * COMPONENT: 'app-todo-list-with-store'
 **/

interface IData {
  readonly inputValue$: IObservable<string>;
  readonly $onInput: IObserver<Event>;
  readonly $onFormSubmit: IObserver<Event>;

  readonly items$: IObservable<ITodoListItemsList>;

  readonly removeItem: (item: ITodoListItem) => void;
}

interface ITodoListWithStoreComponentConfig {
  element: HTMLElement;
  data: IData;
}

export const TodoListWithStoreComponent = createComponent<ITodoListWithStoreComponentConfig>({
  name: 'app-todo-list-with-store',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      TodoListItemComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  init: (): IData => {
    /* ITEMS */

    const store = createStore<ITodoListState>({
      items: [],
    });

    const createItem = createItemAction(store);
    const removeItem = removeItemAction(store);

    const items$ = mapState(store, itemsSelector);

    createItem('Check this awesome tutorial');
    createItem('Write your own components');

    /* INPUT */

    const [$inputValue, inputValue$] = let$$<string>('');

    const $onInput = $$map($inputValue, (event: Event): string => (event.target as HTMLInputElement).value);

    const [$onFormSubmit] = mapObservableToObserver(inputValue$, (inputValue: string): IObserver<Event> => {
      inputValue = inputValue.trim();
      return (event: Event): void => {
        event.preventDefault();

        if (inputValue !== '') {
          createItem(inputValue);
        }

        $inputValue('');
      };
    });

    return {
      inputValue$,
      $onInput,
      $onFormSubmit,
      items$,
      removeItem,
    };
  },
});
