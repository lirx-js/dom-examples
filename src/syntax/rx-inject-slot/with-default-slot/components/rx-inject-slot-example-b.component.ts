import { compileReactiveHTMLAsComponentTemplate, IComponentTemplate, Component } from '@lirx/dom';

/** TEMPLATE **/

// const template: IComponentTemplate<object> = compileReactiveHTMLAsComponentTemplate({
//   html: `
//     <div class="default-slot">
//       <rx-inject-slot name="*">
//         placeholder content
//       </rx-inject-slot>
//     </div>
//   `,
// });

const template: IComponentTemplate<object> = compileReactiveHTMLAsComponentTemplate({
  html: `
    <div
      class="default-slot"
      *inject-slot="*"
    >
      placeholder content
    </div>
  `,
});

/** COMPONENT **/

export const AppRxInjectSlotExampleBComponent = new Component({
  name: 'app-rx-inject-slot-example-b',
  template,
});
