export interface Slide {
  id: string;
  slideName: string;
  type: string;
  content: ContentItem | ContentItem[]; // Updated to allow both single and array
  slideOrder: number;
  className?: string;
}

export interface ContentItem {
  id: string;
  type: ContentType;
  name: string;
  content: ContentItem[] | string | string[] | string[][];
  initialRows?: number;
  initialColumns?: number;
  restrictToDrop?: boolean;
  columns?: number;
  placeholder?: string;
  className?: string;
  alt?: string;
  callOutType?: 'success' | 'warning' | 'info ' | 'question' | 'caution';
  link?: string;
  code?: string;
  language?: string;
  bgColor?: string;
  isTransparent?: boolean;
}
export interface Theme {
  name: string;
  fontFamily: string;
  fontColor: string;
  backgroundColor: string;
  slideBackgroundColor: string;
  accentColor: string;
  gradientBackground?: string;
  sidebarColor?: string;
  navbarColor?: string;
  type: 'light' | 'dark';
}

export type ContentType =
  | 'column'
  | 'resizable-column'
  | 'text'
  | 'paragraph'
  | 'image'
  | 'multiColumn'
  | 'blank'
  | 'imageAndText'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'title'
  | 'table'
  | 'blockquote'
  | 'numberedList'
  | 'bulletedList'
  | 'bulletList'
  | 'code'
  | 'codeBlock'
  | 'link'
  | 'quote'
  | 'divider'
  | 'calloutBox'
  | 'todoList'
  | 'customButton'
  | 'tableOfContents';

export interface OutlineCard {
  title: string;
  id: string;
  order: number;
}

export interface LayoutSlides {
  slideName: string;
  content: ContentItem;
  className?: string;
  type: string;
}
