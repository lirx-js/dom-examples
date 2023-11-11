import { IObservable, map$$ } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  IComponentStyle,
  IComponentTemplate,
  ComponentReference,
  Component,
  input,
  Input,
} from '@lirx/dom';

/** TYPES **/

export interface IAppRecursiveExampleComponentInputConfig {
  readonly name: string;
  readonly children: readonly IAppRecursiveExampleComponentInputConfig[];
}

interface IComponentData {
  readonly config: Input<IAppRecursiveExampleComponentInputConfig>;
}

interface ITemplateData {
  readonly name$: IObservable<string>;
  readonly children$: IObservable<readonly IAppRecursiveExampleComponentInputConfig[]>;
  readonly notEmpty$: IObservable<boolean>;
}

/** TEMPLATE **/

const template: IComponentTemplate<ITemplateData> = compileReactiveHTMLAsComponentTemplate({
  html: `
    <div class="name">
      {{ $.name$ }}
    </div>
    <div
      class="children"
      *if="$.notEmpty$"
    >
      <app-recursive-example
        *for="let child of $.children$"
        $[config]="child"
      ></app-recursive-example>
    </div>
  `,
  components: [
    new ComponentReference('app-recursive-example', () => AppRecursiveExampleComponent),
  ],
});

/** STYLE **/

const style: IComponentStyle = compileStyleAsComponentStyle(`
  :host {
    display: block;
  }
  
  :host > .children {
    padding-left: 15px;
    padding-bottom: 10px;
  }
`);

/** COMPONENT **/

export const AppRecursiveExampleComponent = new Component({
  name: 'app-recursive-example',
  template,
  styles: [style],
  componentData: (): IComponentData => ({
    config: input<IAppRecursiveExampleComponentInputConfig>(),
  }),
  templateData: (node): ITemplateData => {
    const config$: IObservable<IAppRecursiveExampleComponentInputConfig> = node.input$('config');

    const name$ = map$$(config$, _ => _.name);
    const children$ = map$$(config$, _ => _.children);
    const notEmpty$ = map$$(children$, _ => _.length > 0);

    return {
      name$,
      children$,
      notEmpty$,
    };
  },
});

