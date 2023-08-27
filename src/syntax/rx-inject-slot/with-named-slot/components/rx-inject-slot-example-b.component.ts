import { compileReactiveHTMLAsComponentTemplate, IComponentTemplate, Component } from '@lirx/dom';

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

export const AppRxInjectSlotExampleBComponent = new Component({
  name: 'app-rx-inject-slot-example-b',
  template,
  templateData: ({ slots }): void => {

    // slots can be manipulated here
    // const parent = new VirtualContainerNode();
    // slots.get('main')!(parent, {});
  },
});
