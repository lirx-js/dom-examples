import { IObservable, single } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, createComponent, IComponentTemplate } from '@lirx/dom';

/** DATA **/

interface IData {
  readonly data$: IObservable<string>;
}

interface IAppRxInjectTemplateExampleComponentConfig {
  data: IData;
}

/** TEMPLATE **/

const template: IComponentTemplate<IData> = compileReactiveHTMLAsComponentTemplate({
  html: `
    <rx-template
      name="templateA"
      let-data="data$"
    >
      Template A content: {{ data$ }}
    </rx-template>
    
    <rx-inject-template
      template="templateA"
      let-data="$.data$"
    ></rx-inject-template>
  `,
});

/** COMPONENT **/

export const AppRxInjectTemplateExampleComponent = createComponent<IAppRxInjectTemplateExampleComponentConfig>({
  name: 'app-rx-inject-template-example',
  template,
  inputs: [],
  init: (): IData => {
    const data$ = single('Some data');

    return {
      data$,
    };
  },
});
