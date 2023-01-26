import { IObservable, map$$ } from '@lirx/core';
import {
  compileReactiveHTMLAsComponentTemplate,
  compileStyleAsComponentStyle,
  createComponent,
  VirtualCustomElementNode,
} from '@lirx/dom';

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

interface IData<GData> {
  readonly columns$: IObservable<string[]>;
  readonly rows$: IObservable<GData[]>;
}

type IDefaultData = any;

interface ICreateTableComponentConfig<GData> {
  element: HTMLElement;
  data: IData<GData>;
  inputs: [
    ['config', ITableComponentConfig<GData>],
  ],
}

export const TableComponent = createComponent<ICreateTableComponentConfig<IDefaultData>>({
  name: 'app-table',
  template: compileReactiveHTMLAsComponentTemplate({ html }),
  styles: [compileStyleAsComponentStyle(style)],
  inputs: [
    ['config'],
  ],
  init: (node: VirtualCustomElementNode<ICreateTableComponentConfig<IDefaultData>>): IData<IDefaultData> => {
    const config$ = node.inputs.get$('config');
    const columns$ = map$$(config$, _ => _.columns);
    const rows$ = map$$(config$, _ => _.rows);

    return {
      columns$,
      rows$,
    };
  },
});
