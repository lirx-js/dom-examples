import { IObservable, IObserver, single } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, IComponentTemplate, Component } from '@lirx/dom';

/** DATA **/

interface ITemplateData {
  readonly $onClick: IObserver<MouseEvent>;
  readonly onClick$: IObservable<IObserver<MouseEvent>>;
}

/** TEMPLATE **/

const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
  html: `
    <button (click)="$.$onClick">
      Click me
    </button>
  `,
});

// const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
//   html: `
//     <button {click}="$.onClick$">
//       Click me
//     </button>
//   `,
// });

/** COMPONENT **/

export const AppBindEventExampleComponent = new Component({
  name: 'app-bind-event-example',
  template,
  templateData: (): ITemplateData => {
    const $onClick = () => {
      console.log('clicked');
    };

    const onClick$ = single($onClick);

    return {
      $onClick,
      onClick$,
    };
  },
});


