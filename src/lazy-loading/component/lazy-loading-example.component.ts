import { fromPromiseFactory, IDefaultNotificationsUnion, IObservable } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, createAsyncComponentReference, createComponent } from '@lirx/dom';

/** ASYNC COMPONENTS **/

const [AppLazyLoadedExampleComponent$, AppLazyLoadedExampleComponent] = createAsyncComponentReference(
  'app-lazy-loaded-example',
  fromPromiseFactory(() => import('./lazy-loaded-example.component').then(_ => _.AppLazyLoadedExampleComponent)),
);

/** TYPES **/

interface IData {
  readonly component$: IObservable<IDefaultNotificationsUnion<any>>;
}

interface IAppLazyLoadingExampleComponentConfig {
  element: HTMLElement;
  data: IData;
}

/** COMPONENT **/

export const AppLazyLoadingExampleComponent = createComponent<IAppLazyLoadingExampleComponentConfig>({
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
    customElements: [
      AppLazyLoadedExampleComponent,
    ],
  }),
  init: (): IData => {
    return {
      component$: AppLazyLoadedExampleComponent$,
    };
  },
});

