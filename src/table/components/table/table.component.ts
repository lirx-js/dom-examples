import { IObservable, map$$ } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, Component, input, Input } from '@lirx/dom';

// @ts-ignore
import html from './table.component.html?raw';
// @ts-ignore
import style from './table.component.scss?inline';

/**
 * COMPONENT: 'app-table'
 **/

export interface ITableComponentConfig<GData> {
  columns: string[];
  rows: GData[];
}

interface IComponentData<GData> {
  readonly config: Input<ITableComponentConfig<GData>>;
}

interface ITemplateData<GData> {
  readonly columns$: IObservable<string[]>;
  readonly rows$: IObservable<GData[]>;
}

type IDefaultData = any;

export const TableComponent = new Component({
  name: 'app-table',
  template: compileReactiveHTMLAsComponentTemplate({ html }),
  styles: [compileStyleAsComponentStyle(style)],
  componentData: (): IComponentData<IDefaultData> => ({
    config: input<ITableComponentConfig<IDefaultData>>(),
  }),
  templateData: (node): ITemplateData<IDefaultData> => {
    const config$ = node.input$('config');
    const columns$ = map$$(config$, _ => _.columns);
    const rows$ = map$$(config$, _ => _.rows);

    return {
      columns$,
      rows$,
    };
  },
});
