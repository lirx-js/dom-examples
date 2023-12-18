import { ISignal, signal } from '@lirx/core';
import { compileReactiveHTMLAsComponentTemplate, compileStyleAsComponentStyle, Component } from '@lirx/dom';

// @ts-ignore
import html from './file-to-data-url.component.html?raw';
// @ts-ignore
import style from './file-to-data-url.component.scss?inline';

/**
 * COMPONENT: 'app-file-to-data-url'
 **/

interface ITemplateData {
  readonly onDragOver: (event: DragEvent) => void;
  readonly onDragLeave: (event: DragEvent) => void;
  readonly onDrop: (event: DragEvent) => void;
  readonly base64Url: ISignal<string>;
  readonly dragOver: ISignal<boolean>;
}

export const FileToDataUrlComponent = new Component({
  name: 'app-file-to-data-url',
  template: compileReactiveHTMLAsComponentTemplate({ html }),
  styles: [compileStyleAsComponentStyle(style)],
  templateData: (): ITemplateData => {

    const base64Url = signal<string>('');
    const dragOver = signal<boolean>(false);

    const readBlobAsDataUrl = (blob: Blob): Promise<string> => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise<string>(resolve => {
        reader.onloadend = (): void => {
          resolve(reader.result as string);
        };
      });
    };

    const onFileChange = (file: File): void => {
      readBlobAsDataUrl(file).then((url: string) => {
        base64Url.set(url);
      });
    };

    const onDragOver = (event: DragEvent): void => {
      event.preventDefault();
      dragOver.set(true);
    };

    const onDragLeave = (event: DragEvent): void => {
      event.preventDefault();
      dragOver.set(false);
    };

    const onDrop = (event: DragEvent): void => {
      event.preventDefault();
      const file: File | null | undefined = event.dataTransfer?.items?.[0].getAsFile();
      if (file) {
        onFileChange(file);
      } else {
        alert('Please drop a file');
      }
    };

    return {
      onDragOver,
      onDragLeave,
      onDrop,
      base64Url,
      dragOver,
    };
  },
});
