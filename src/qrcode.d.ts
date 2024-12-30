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
}
