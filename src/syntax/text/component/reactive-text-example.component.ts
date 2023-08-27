import { function$$, idle, IObservable, map$$, single } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, IComponentTemplate, Component } from '@lirx/dom';

/** DATA **/

interface ITemplateData {
  readonly date$: IObservable<string>;
  readonly time$: IObservable<string>;
}

/** TEMPLATE **/

const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
  html: `
    Today is {{ $.date$ }} and it is {{ $.time$ }}.
  `,
});

/** COMPONENT **/

export const AppReactiveTextExampleComponent = new Component({
  name: 'app-reactive-text-example',
  template,
  templateData: (): ITemplateData => {
    const locales$ = single(navigator.languages);

    const currentTimeStamp$ = map$$(idle(), () => Date.now());

    const date$ = function$$(
      [locales$, currentTimeStamp$],
      (locales: readonly string[], currentTimeStamp: number): string => {
        return new Intl.DateTimeFormat(locales as string[], {
          dateStyle: 'long',
        }).format(currentTimeStamp);
      });

    const time$ = function$$(
      [locales$, currentTimeStamp$],
      (locales: readonly string[], currentTimeStamp: number): string => {
        return new Intl.DateTimeFormat(locales as string[], {
          timeStyle: 'medium',
        }).format(currentTimeStamp);
      });

    return {
      date$,
      time$,
    };
  },
});
