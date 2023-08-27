import { interval, IObservable, map$$, merge, single } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, IComponentTemplate, Component } from '@lirx/dom';

/** DATA **/

interface ITemplateData {
  readonly visible$: IObservable<boolean>;
}

/** TEMPLATE **/

// const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
//   html: `
//     <div>A</div>
//     <div *if="$.visible$">
//       I'm visible
//     </div>
//     <div>B</div>
//   `,
// });

const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
  html: `
    <rx-if condition="$.visible$">
      <div *if-true>
        I'm visible
      </div>
      <div *if-false>
        Invisible
      </div>
    </rx-if>
  `,
});

// const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
//   html: `
//     <rx-if condition="$.visible$">
//       <rx-if-true>
//         I'm visible
//       </rx-if-true>
//       <rx-if-false>
//         Invisible
//       </rx-if-false>
//     </rx-if>
//   `,
// });

// const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
//   html: `
//     <rx-template name="trueTemplate">
//       I'm visible
//     </rx-template>
//     <rx-template name="falseTemplate">
//       Invisible
//     </rx-template>
//
//     <rx-if
//       condition="$.visible$"
//       true="trueTemplate"
//       false="falseTemplate"
//     ></rx-if>
//   `,
// });

/** COMPONENT **/

export const AppRxIfExampleComponent = new Component({
  name: 'app-rx-if-example',
  template,
  templateData: (): ITemplateData => {
    const toggleTime: number = 1000;

    const visible$ = map$$(
      merge([
          interval(1000),
          single(void 0),
        ],
      ),
      () => ((Date.now() % (toggleTime * 2)) < toggleTime),
    );

    return {
      visible$,
    };
  },
});
