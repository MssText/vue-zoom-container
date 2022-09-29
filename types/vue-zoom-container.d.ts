export interface BasicDomMatrix {
  originX: number;
  originY: number;
  translateX: number;
  translateY: number;
  scaleX: number;
  scaleY: number;
  zoom: number;
}

export type TransformElement = HTMLElement & BasicDomMatrix;
