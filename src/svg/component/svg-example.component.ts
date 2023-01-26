import { compileReactiveHTMLAsComponentTemplate, createComponent, IComponentTemplate } from '@lirx/dom';

/** TYPES **/

interface IData {
}

interface IAppSVGExampleComponentConfig {
  element: HTMLElement;
}

/** TEMPLATE **/

const template: IComponentTemplate<IData> = compileReactiveHTMLAsComponentTemplate({
  html: `
  <!--FROM https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Getting_Started-->
    <svg
     width="300"
     height="200"
     xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100%" height="100%" fill="red" />
      <circle cx="150" cy="100" r="80" fill="green" />
      <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text>
    </svg>
  `,
});

/** COMPONENT **/

export const AppSVGExampleComponent = createComponent<IAppSVGExampleComponentConfig>({
  name: 'app-svg-example',
  template,
});

