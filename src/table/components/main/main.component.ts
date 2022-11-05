import { IObservable, single } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, createComponent, VirtualCustomElementNode } from '@lirx/dom';
import { ITableComponentConfig, TableComponent } from '../table/table.component';

// @ts-ignore
import html from './main.component.html?raw';
// @ts-ignore
import style from './main.component.scss?inline';

/**
 * COMPONENT: 'app-main'
 **/

interface TableDada {
  firstname: string;
  lastname: string;
  age: number;
}

interface IData {
  readonly tableConfig$: IObservable<ITableComponentConfig<TableDada>>;
}

interface IMainComponentConfig {
  element: HTMLElement;
  data: IData;
}

export const MainComponent = createComponent<IMainComponentConfig>({
  name: 'app-main',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    customElements: [
      TableComponent,
    ]
  }),
  styles: [compileStyleAsComponentStyle(style)],
  init: (node: VirtualCustomElementNode<IMainComponentConfig>): IData => {
    const tableConfig$ = single<ITableComponentConfig<TableDada>>({
      columns: [
        'firstname',
        'lastname',
        'age',
      ],
      rows: [
        {
          firstname: 'Valentin',
          lastname: 'Richard',
          age: 30,
        },
        {
          firstname: 'Alice',
          lastname: 'Strover',
          age: 46,
        },
      ]
    });

    return {
      tableConfig$,
    };
  },
});
