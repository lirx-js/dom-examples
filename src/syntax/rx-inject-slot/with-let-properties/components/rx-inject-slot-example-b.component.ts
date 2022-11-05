import { compileReactiveHTMLAsComponentTemplate, createComponent, IComponentTemplate } from '@lirx/dom';
import { IObservable, single } from '@lirx/core';

/** CONFIG **/

interface IData {
  readonly data$: IObservable<string>;
}

interface IAppRxInjectSlotExampleBComponentConfig {
  element: HTMLElement;
  data: IData;
}

/** TEMPLATE **/

const template: IComponentTemplate<IData> = compileReactiveHTMLAsComponentTemplate({
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

export const AppRxInjectSlotExampleBComponent = createComponent<IAppRxInjectSlotExampleBComponentConfig>({
  name: 'app-rx-inject-slot-example-b',
  template,
  init: (): IData => {
    const data$ = single('Data coming from child');

    return {
      data$,
    };
  },
});
