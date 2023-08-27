import { bootstrap } from '@lirx/dom';
import { AppRecursiveExampleComponent, IAppRecursiveExampleComponentInputConfig } from './component/recursive-example.component';

export function recursiveExample() {
  const node = bootstrap(AppRecursiveExampleComponent);

  const generateConfig = (
    name: string,
    childrenCount: number,
    depth: number,
  ): IAppRecursiveExampleComponentInputConfig => {
    return {
      name,
      children: (depth <= 0)
        ? []
        : Array.from({ length: 10 }, (_, index: number): IAppRecursiveExampleComponentInputConfig => {
          return generateConfig(`${name}-${index}`, childrenCount, depth - 1);
        }),
    };
  };

  node.$output('config')(generateConfig(`node-0`, 10, 3));
}
