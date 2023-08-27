import { IObservable, single } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, IComponentTemplate, Component } from '@lirx/dom';

/** DATA **/

interface ITemplateData {
  readonly items$: IObservable<readonly string[]>;
}

/** TEMPLATE **/

// const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
//   html: `
//     <div *for="let item of $.items$; index$ as i$">
//       #{{ i$ }} -> {{ item }}
//     </div>
//   `,
// });

const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
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

// const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
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

export const AppRxForLoopExampleComponent = new Component({
  name: 'app-rx-for-loop-example',
  template,
  templateData: (): ITemplateData => {
    const items$ = single(['Alice', 'Bob', 'Chloe', 'David']);

    return {
      items$,
    };
  },
});
