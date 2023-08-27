import { IDefaultNotificationsUnion, IObservable, singleN, switchMap$$, throwError, timeout } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, IComponentTemplate, Component } from '@lirx/dom';

/** DATA **/

interface ITemplateData {
  readonly async$: IObservable<IDefaultNotificationsUnion<string>>;
}

/** TEMPLATE **/

// const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
//   html: `
//     <div *async="$.async$">
//       FULFILLED
//     </div>
//   `,
// });

const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
  html: `
    <rx-async expression="$.async$">
      <div *async-pending>
        PENDING
      </div>
      <div *async-fulfilled="value">
        FULFILLED: {{ value }}
      </div>
      <div *async-rejected="error">
        REJECTED: {{ error.message }}
      </div>
    </rx-async>
  `,
});

// const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
//   html: `
//      <rx-async expression="$.async$">
//       <rx-async-pending>
//         PENDING
//       </rx-async-pending>
//       <rx-async-fulfilled let-value>
//         FULFILLED: {{ value }}
//       </rx-async-fulfilled>
//       <rx-async-rejected let-value="error">
//         REJECTED: {{ error.message }}
//       </rx-async-rejected>
//     </rx-async>
//   `,
// });

// const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
//   html: `
//     <rx-template name="pendingTemplate">
//       PENDING
//     </rx-template>
//     <rx-template
//       name="fulfilledTemplate"
//       let-value
//     >
//       FULFILLED: {{ value }}
//     </rx-template>
//     <rx-template
//       name="rejectedTemplate"
//       let-value="error"
//     >
//       REJECTED: {{ error.message }}
//     </rx-template>
//
//     <rx-async
//       expression="$.async$"
//       pending="pendingTemplate"
//       fulfilled="fulfilledTemplate"
//       rejected="rejectedTemplate"
//     ></rx-async>
//   `,
// });

/** COMPONENT **/

export const AppRxAsyncExampleComponent = new Component({
  name: 'app-rx-async-example',
  template,
  templateData: (): ITemplateData => {
    const async$ = switchMap$$(timeout(1000), (): IObservable<IDefaultNotificationsUnion<string>> => {
      return (Math.random() < 0.5)
        ? singleN(`Hello world`)
        : throwError(new Error('Failed'));
    });

    return {
      async$,
    };
  },
});
