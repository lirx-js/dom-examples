import { IObservable, IObserver } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsShadowComponentStyle,
  Component,
  input,
  output,
  Input,
  Output,
} from '@lirx/dom';

// @ts-ignore
import html from './todo-list-item.component.html?raw';
// @ts-ignore
import style from './todo-list-item.component.scss?inline';

/**
 * COMPONENT: 'app-todo-list-item'
 **/

interface IComponentData {
  readonly message: Input<string>;
  readonly remove: Output<void>;
}

interface ITemplateData {
  readonly message$: IObservable<string>;
  readonly $onClickRemoveButton: IObserver<any>;
}

export const TodoListItemShadowComponent = new Component({
  mode: 'shadow',
  name: 'app-todo-list-item',
  template: compileReactiveHTMLAsComponentTemplate({ html }),
  styles: [compileStyleAsShadowComponentStyle(style)],
  componentData: (): IComponentData => ({
    message: input<string>(),
    remove: output<void>(),
  }),
  templateData: (node): ITemplateData => {
    const message$ = node.input$('message');
    const $onClickRemoveButton = node.$output('remove');

    return {
      message$,
      $onClickRemoveButton,
    };
  },
});
