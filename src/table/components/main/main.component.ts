import { IObservable, single } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, Component } from '@lirx/dom';
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

interface ITemplateData {
  readonly tableConfig$: IObservable<ITableComponentConfig<TableDada>>;
}

export const MainComponent = new Component({
  name: 'app-main',
  template: compileReactiveHTMLAsComponentTemplate({
    html,
    components: [
      TableComponent,
    ],
  }),
  styles: [compileStyleAsComponentStyle(style)],
  templateData: (): ITemplateData => {
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
      ],
    });

    return {
      tableConfig$,
    };
  },
});
