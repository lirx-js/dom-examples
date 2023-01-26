import { IObservable, single } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, createComponent, IComponentTemplate } from '@lirx/dom';

/** DATA **/

interface IData {
  readonly items$: IObservable<readonly string[]>;
}

interface IAppRxForLoopExampleComponentConfig {
  data: IData;
}

/** TEMPLATE **/

// const template: IComponentTemplate<IData> = compileReactiveHTMLAsComponentTemplate({
//   html: `
//     <div *for="let item of $.items$; index$ as i$">
//       #{{ i$ }} -> {{ item }}
//     </div>
//   `,
// });

const template: IComponentTemplate<IData> = compileReactiveHTMLAsComponentTemplate({
  html: `
    <rx-for-loop
      items="$.items$"
    >
      <div>
        #{{ index$ }} -> {{ item }}
      </div>
    </rx-for-loop>
  `,
});

// const template: IComponentTemplate<IData> = compileReactiveHTMLAsComponentTemplate({
//   html: `
//     <rx-template
//       name="forLoopTemplate"
//       let-item="item"
//       let-index$="i$"
//     >
//       <div>
//         #{{ i$ }} -> {{ item }}
//       </div>
//     </rx-template>
//
//     <rx-for-loop
//       items="$.items$"
//       template="forLoopTemplate"
//     ></rx-for-loop>
//   `,
// });

/** COMPONENT **/

export const AppRxForLoopExampleComponent = createComponent<IAppRxForLoopExampleComponentConfig>({
  name: 'app-rx-for-loop-example',
  template,
  inputs: [],
  init: (): IData => {
    const items$ = single(['Alice', 'Bob', 'Chloe', 'David']);

    return {
      items$,
    };
  },
});
