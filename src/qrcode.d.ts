declare module 'qrcode' {
  const toDataURL: (
    text: string,
    options?: any
  ) => Promise<string>;

  const toString: (
    text: string,
    options?: any
  ) => Promise<string>;

  export { toDataURL, toString };

  export function toCanvas(qrCodeCanvas: HTMLCanvasElement, qrCodeText: string, arg2: { width: number; }) {
    throw new Error('Function not implemented.');
  }
}
