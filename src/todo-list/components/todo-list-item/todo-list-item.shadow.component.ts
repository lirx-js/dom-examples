import { IObservable, IObserver } from '@lirx/core';
import {
  compileStyleAsShadowComponentStyle,
  createShadowComponent,
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  VirtualCustomElementNode,
} from '@lirx/dom';

// @ts-ignore
import html from './todo-list-item.component.html?raw';
// @ts-ignore
import style from './todo-list-item.component.scss?inline';

/**
 * COMPONENT: 'app-todo-list-item'
 **/

interface IData {
  readonly message$: IObservable<string>;
  readonly $onClickRemoveButton: IObserver<any>;
}

interface ITodoListItemComponentConfig {
  element: HTMLElement;
  inputs: [
    ['message', string],
  ],
  outputs: [
    ['remove', void],
  ],
  data: IData;
}

export const TodoListItemShadowComponent = createShadowComponent<ITodoListItemComponentConfig>({
  name: 'app-todo-list-item',
  template: compileReactiveHTMLAsComponentTemplate({ html }),
  styles: [compileStyleAsShadowComponentStyle(style)],
  inputs: [
    ['message'],
  ],
  outputs: [
    'remove',
  ],
  init: (node: VirtualCustomElementNode<ITodoListItemComponentConfig>): IData => {
    const message$ = node.inputs.get$('message');
    const $onClickRemoveButton = node.outputs.$set('remove');

    return {
      message$,
      $onClickRemoveButton,
    };
  },
});
