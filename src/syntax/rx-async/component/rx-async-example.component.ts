import {
  IDefaultNotificationsUnion,
  interval,
  IObservable,
  pipe$$,
  scan$$$,
  singleN,
  switchMap$$,
  switchMap$$$, throwError,
  timeout,
} from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, createComponent, IComponentTemplate } from '@lirx/dom';

/** DATA **/

interface IData {
  readonly async$: IObservable<IDefaultNotificationsUnion<string>>;
}

interface IAppRxIfExampleComponentConfig {
  data: IData;
}

/** TEMPLATE **/

// const template: IComponentTemplate<IData> = compileReactiveHTMLAsComponentTemplate({
//   html: `
//     <div *async="$.async$">
//       FULFILLED
//     </div>
//   `,
// });

const template: IComponentTemplate<IData> = compileReactiveHTMLAsComponentTemplate({
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

// const template: IComponentTemplate<IData> = compileReactiveHTMLAsComponentTemplate({
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

// const template: IComponentTemplate<IData> = compileReactiveHTMLAsComponentTemplate({
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

export const AppRxAsyncExampleComponent = createComponent<IAppRxIfExampleComponentConfig>({
  name: 'app-rx-async-example',
  template,
  inputs: [],
  init: (): IData => {
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
