import { compileReactiveHTMLAsComponentTemplate, createComponent, IComponentTemplate } from '@lirx/dom';

/** CONFIG **/

interface IAppRxInjectSlotExampleBComponentConfig {
  element: HTMLElement;
}

/** TEMPLATE **/

const template: IComponentTemplate<object> = compileReactiveHTMLAsComponentTemplate({
  html: `
    <div class="main-slot">
      <rx-inject-slot name="main">
        placeholder content
      </rx-inject-slot>
    </div>
  `,
});

/** COMPONENT **/

export const AppRxInjectSlotExampleBComponent = createComponent<IAppRxInjectSlotExampleBComponentConfig>({
  name: 'app-rx-inject-slot-example-b',
  template,
  init: ({ slots }): void => {

    // slots can be manipulated here
    // const parent = new VirtualContainerNode();
    // slots.get('main')!(parent, {});
  },
});
