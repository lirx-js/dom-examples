import { compileReactiveHTMLAsComponentTemplate, IComponentTemplate, Component } from '@lirx/dom';
import { IObservable, single } from '@lirx/core';

/** CONFIG **/

interface ITemplateData {
  readonly data$: IObservable<string>;
}

/** TEMPLATE **/

const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
  html: `
    <div class="main-slot">
      <rx-inject-slot
        name="main"
        let-data="$.data$"
      >
        placeholder content
      </rx-inject-slot>
    </div>
  `,
});

/** COMPONENT **/

export const AppRxInjectSlotExampleBComponent = new Component({
  name: 'app-rx-inject-slot-example-b',
  template,
  templateData: (): ITemplateData => {
    const data$ = single('Data coming from child');

    return {
      data$,
    };
  },
});
