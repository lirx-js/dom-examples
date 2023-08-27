import { IObservable, map$$, merge, single, timeout } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, IComponentTemplate, Component } from '@lirx/dom';

/** DATA **/

type IState =
  | 'loading'
  | 'success'
  | 'error'
  | 'unknown'

interface ITemplateData {
  readonly state$: IObservable<IState>;
}

/** TEMPLATE **/

const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
  html: `
    <rx-switch expression="$.state$">
      <div *switch-case="'loading'">
        Loading...
      </div>
      <div *switch-case="'success'">
        Success !
      </div>
      <div *switch-case="'error'">
        Ho no ! An error occurred.
      </div>
      <div *switch-default>
        Default content.
      </div>
    </rx-switch>
  `,
});

// const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
//   html: `
//     <rx-switch expression="$.state$">
//       <rx-switch-case case="'loading'">
//         Loading...
//       </rx-switch-case>
//       <rx-switch-case case="'success'">
//         Success !
//       </rx-switch-case>
//       <rx-switch-case case="'error'">
//         Ho no ! An error occurred.
//       </rx-switch-case>
//       <rx-switch-default>
//         Default content.
//       </rx-switch-default>
//     </rx-switch>
//   `,
// });

// const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
//   html: `
//     <rx-template name="loading">
//       Loading...
//     </rx-template>
//     <rx-template name="success">
//       Success !
//     </rx-template>
//     <rx-template name="error">
//       Ho no ! An error occurred.
//     </rx-template>
//     <rx-template name="default">
//       Default content.
//     </rx-template>
//
//     <rx-switch expression="$.state$">
//       <rx-switch-case
//         case="'loading'"
//         template="loading"
//       ></rx-switch-case>
//       <rx-switch-case
//         case="'success'"
//         template="loading"
//       ></rx-switch-case>
//       <rx-switch-case
//         case="'error'"
//         template="loading"
//       ></rx-switch-case>
//       <rx-switch-default template="default"></rx-switch-default>
//     </rx-switch>
//   `,
// });

/** COMPONENT **/

export const AppRxSwitchExampleComponent = new Component({
  name: 'app-rx-switch-example',
  template,
  templateData: (): ITemplateData => {
    const state$ = merge([
      single<IState>('loading'),
      map$$(timeout(2000), (): IState => 'success'),
      map$$(timeout(4000), (): IState => 'error'),
      map$$(timeout(6000), (): IState => 'unknown'),
    ]);

    return {
      state$,
    };
  },
});
