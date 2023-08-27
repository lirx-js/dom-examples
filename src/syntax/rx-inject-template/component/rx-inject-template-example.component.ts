import { IObservable, single } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, IComponentTemplate, Component } from '@lirx/dom';

/** DATA **/

interface ITemplateData {
  readonly data$: IObservable<string>;
}

/** TEMPLATE **/

const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
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

export const AppRxInjectTemplateExampleComponent = new Component({
  name: 'app-rx-inject-template-example',
  template,
  templateData: (): ITemplateData => {
    const data$ = single('Some data');

    return {
      data$,
    };
  },
});
