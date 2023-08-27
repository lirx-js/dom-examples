import { interval, IObservable, map$$, merge, single } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, IComponentTemplate, Component } from '@lirx/dom';
import { AppRxInjectSlotExampleBComponent } from './rx-inject-slot-example-b.component';

/** DATA **/

interface ITemplateData {
  readonly date$: IObservable<string>;
}

/** TEMPLATE **/

const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
  html: `
    <app-rx-inject-slot-example-b>
      <rx-slot
        name="main"
        let-data="data"
      >
        {{ $.date$ }} - {{ data }}
      </rx-slot>
    </app-rx-inject-slot-example-b>
  `,
  components: [
    AppRxInjectSlotExampleBComponent,
  ],
});

/** COMPONENT **/

export const AppRxInjectSlotExampleAComponent = new Component({
  name: 'app-rx-inject-slot-example-a',
  template,
  templateData: (): ITemplateData => {
    const date$ = map$$(
      merge([
          interval(1000),
          single(void 0),
        ],
      ),
      () => new Date().toString(),
    );

    return {
      date$,
    };
  },
});
