import { compileReactiveHTMLAsComponentTemplate, createComponent, IComponentTemplate } from '@lirx/dom';
import { IObservable, single } from '@lirx/core';

/** DATA **/

interface IData {
  readonly data$: IObservable<string>;
}

interface IAppRxInjectSlotExampleCComponentConfig {
  data: IData;
}

/** TEMPLATE **/


const template: IComponentTemplate<IData> = compileReactiveHTMLAsComponentTemplate({
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

export const AppRxInjectSlotExampleCComponent = createComponent<IAppRxInjectSlotExampleCComponentConfig>({
  name: 'app-rx-inject-slot-example-c',
  template,
  init: (): IData => {
    const data$ = single('From child C');

    return {
      data$,
    };
  },
});
