import { $$map, IObservable, IObserver, let$$, map$$ } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, Component } from '@lirx/dom';
import { DeferredAction, DeferredSelector, ImmutableArray, Store } from '@lirx/store';
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

const deferredCreateItemAction = new DeferredAction((state: ITodoListState, message: string): ITodoListState => {
  return {
    items: [
      ...state.items,
      {
        message,
      },
    ],
  };
});

const deferredRemoveItemAction = new DeferredAction((state: ITodoListState, item: ITodoListItem): ITodoListState => {
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

const deferredItemsSelector = new DeferredSelector((state: ITodoListState): ITodoListItemsList => state.items);

/**
 * COMPONENT: 'app-todo-list-with-store'
 **/

interface ITemplateData {
  readonly inputValue$: IObservable<string>;
  readonly $onInput: IObserver<Event>;
  readonly onFormSubmit$: IObservable<IObserver<Event>>;

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
    });

    // ACTIONS
    const createItemAction = deferredCreateItemAction.create(store);
    const removeItemAction = deferredRemoveItemAction.create(store);

    // SELECTOR
    const itemsSelector = deferredItemsSelector.create(store);

    // MISC

    const items$ = itemsSelector.get$();

    const removeItem = (item: ITodoListItem): void => {
      removeItemAction.invoke(item);
    };

    createItemAction.invoke('Check this awesome tutorial');
    createItemAction.invoke('Write your own components');

    /* INPUT */

    const [$inputValue, inputValue$] = let$$<string>('');

    const $onInput = $$map($inputValue, (event: Event): string => (event.target as HTMLInputElement).value);

    const onFormSubmit$ = map$$(inputValue$, (inputValue: string): IObserver<Event> => {
      inputValue = inputValue.trim();
      return (event: Event): void => {
        event.preventDefault();

        if (inputValue !== '') {
          createItemAction.invoke(inputValue);
        }

        $inputValue('');
      };
    });

    return {
      inputValue$,
      $onInput,
      onFormSubmit$,
      items$,
      removeItem,
    };
  },
});
