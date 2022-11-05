import { compileReactiveHTMLAsComponentTemplate, createComponent, IComponentTemplate } from '@lirx/dom';

/** CONFIG **/

interface IAppRxInjectSlotExampleBComponentConfig {
  element: HTMLElement;
}

/** TEMPLATE **/

const template: IComponentTemplate<object> = compileReactiveHTMLAsComponentTemplate({
  html: `
    <div class="default-slot">
      <rx-inject-slot name="*">
        placeholder content
      </rx-inject-slot>
    </div>
  `,
});

// const template: IComponentTemplate<object> = compileReactiveHTMLAsComponentTemplate({
//   html: `
//     <div
//       class="default-slot"
//       *inject-slot="*"
//     >
//       placeholder content
//     </div>
//   `,
// });

/** COMPONENT **/

export const AppRxInjectSlotExampleBComponent = createComponent<IAppRxInjectSlotExampleBComponentConfig>({
  name: 'app-rx-inject-slot-example-b',
  template,
});
