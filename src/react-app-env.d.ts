/// <reference types="react-scripts" />

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  const ReactComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export { ReactComponent };
  export default src;
}
