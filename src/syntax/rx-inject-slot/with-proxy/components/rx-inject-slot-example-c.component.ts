import { compileReactiveHTMLAsComponentTemplate, IComponentTemplate, Component } from '@lirx/dom';
import { IObservable, single } from '@lirx/core';

/** DATA **/

interface ITemplateData {
  readonly data$: IObservable<string>;
}

/** TEMPLATE **/


const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
  html: `
    <div class="main-slot">
      <rx-inject-slot
        name="main"
        let-data-b="$.data$"
      >
        default main slot
      </rx-inject-slot>
    </div>
  `,
});

/** COMPONENT **/

export const AppRxInjectSlotExampleCComponent = new Component({
  name: 'app-rx-inject-slot-example-c',
  template,
  templateData: (): ITemplateData => {
    const data$ = single('From child C');

    return {
      data$,
    };
  },
});
