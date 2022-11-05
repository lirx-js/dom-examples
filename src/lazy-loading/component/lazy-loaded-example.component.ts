import { compileReactiveHTMLAsComponentTemplate, createComponent } from '@lirx/dom';

/** TYPES **/

interface IAppLazyLoadedExampleComponentConfig {
  element: HTMLElement;
}

/** COMPONENT **/

export const AppLazyLoadedExampleComponent = createComponent<IAppLazyLoadedExampleComponentConfig>({
  name: 'app-lazy-loaded-example',
  template: compileReactiveHTMLAsComponentTemplate({
    html: `
      Lazy loaded !
    `,
  }),
});

/** EXTRA **/

function sleep(timeout: number): Promise<void> {
  return new Promise<void>((resolve: () => void): void => {
    setTimeout(resolve, timeout);
  });
}

// UNCOMMENT TO EMULATE A LOADING COMPONENT
// await sleep(2000);

// UNCOMMENT TO EMULATE A "NOT FOUND" COMPONENT
// throw new Error('Not found');

