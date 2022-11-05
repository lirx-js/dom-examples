import { compileReactiveHTMLAsComponentTemplate, createComponent, IComponentTemplate } from '@lirx/dom';
import { AppRxInjectSlotExampleCComponent } from './rx-inject-slot-example-c.component';

/** CONFIG **/

interface IAppRxInjectSlotExampleBComponentConfig {
  element: HTMLElement;
}

/** TEMPLATE **/


const template: IComponentTemplate<object> = compileReactiveHTMLAsComponentTemplate({
  html: `
    <app-rx-inject-slot-example-c>
      <rx-slot
        proxy="main"
        let-data-a="dataB"
      ></rx-slot>
    </app-rx-inject-slot-example-c>
  `,
  customElements: [
    AppRxInjectSlotExampleCComponent,
  ],
});

/* EQUIVALENT */

// const template: IComponentTemplate<object> = compileReactiveHTMLAsComponentTemplate({
//   html: `
//     <app-rx-inject-slot-example-c>
//       <rx-slot
//         name="main"
//         let-data-b="dataB"
//       >
//         <rx-inject-slot
//           name="main"
//           let-data-a="dataB"
//         ></rx-inject-slot>
//       </rx-slot>
//     </app-rx-inject-slot-example-c>
//   `,
//   customElements: [
//     AppRxInjectSlotExampleCComponent,
//   ],
// });

/** COMPONENT **/

export const AppRxInjectSlotExampleBComponent = createComponent<IAppRxInjectSlotExampleBComponentConfig>({
  name: 'app-rx-inject-slot-example-b',
  template,
});
