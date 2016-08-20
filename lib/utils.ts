export function requireExt(extName: string) {
  return require.main.require(extName);
}