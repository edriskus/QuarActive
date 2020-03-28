export function withoutTypename({ __typename, ...result }: any = {}) {
  return result;
}
