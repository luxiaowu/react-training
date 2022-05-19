/// <reference types="react-scripts" />

interface MyWindow extends Window {
  Diff2HtmlUI: any;
}

declare const Diff2HtmlUI: any

declare const window: MyWindow;

declare module '*.css'