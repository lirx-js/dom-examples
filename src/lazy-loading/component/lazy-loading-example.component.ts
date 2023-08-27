import { fromPromiseFactory, IDefaultNotificationsUnion, IObservable } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, Component, AsyncComponentReference } from '@lirx/dom';

/** ASYNC COMPONENTS **/

const AppLazyLoadedExampleComponentReference = new AsyncComponentReference(
  'app-lazy-loaded-example',
  fromPromiseFactory(() => import('./lazy-loaded-example.component').then(_ => _.AppLazyLoadedExampleComponent)),
);

/** TYPES **/

interface ITemplateData {
  readonly component$: IObservable<IDefaultNotificationsUnion<any>>;
}

/** COMPONENT **/

export const AppLazyLoadingExampleComponent = new Component({
  name: 'app-lazy-loading-example',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
    <rx-async expression="$.component$">
      <div *async-pending>
        Loading...
      </div>
      <app-lazy-loaded-example
        *async-fulfilled
      ></app-lazy-loaded-example>
      <div *async-rejected="error">
        Failed to load: {{ error.message }}
      </div>
    </rx-async>
  `,
    components: [
      AppLazyLoadedExampleComponentReference,
    ],
  }),
  templateData: (): ITemplateData => {
    return {
      component$: AppLazyLoadedExampleComponentReference.component$,
    };
  },
});

