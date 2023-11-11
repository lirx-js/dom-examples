import { IObservable, IObserver } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  Component,
  output,
  input,
  Input,
  Output,
  VirtualComponentNode,
} from '@lirx/dom';

// @ts-ignore
import html from './todo-list-item.component.html?raw';
// @ts-ignore
import style from './todo-list-item.component.scss?inline';

/**
 * COMPONENT: 'app-todo-list-item'
 **/

interface ITodoListItemComponentData {
  readonly message: Input<string>;
  readonly remove: Output<void>;
}

interface ITemplateData {
  readonly message$: IObservable<string>;
  readonly $onClickRemoveButton: IObserver<any>;
}

export const TodoListItemComponent = new Component<HTMLElement, ITodoListItemComponentData, ITemplateData>({
  name: 'app-todo-list-item',
  template: compileReactiveHTMLAsComponentTemplate({ html }),
  styles: [compileStyleAsComponentStyle(style)],
  componentData: (): ITodoListItemComponentData => ({
    message: input<string>(),
    remove: output<void>(),
  }),
  templateData: (node: VirtualComponentNode<HTMLElement, ITodoListItemComponentData>): ITemplateData => {
    const message$ = node.input$('message');
    const $onClickRemoveButton = node.$output('remove');

    return {
      message$,
      $onClickRemoveButton,
    };
  },
});
