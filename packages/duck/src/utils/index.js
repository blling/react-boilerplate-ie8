export function list2Map(l = [], k, v) {
  const m = {};

  if (l.length < 1 || !k || !v) {
    return m;
  }

  for (let i = 0; i < l.length; i++) {
    m[l[i][k]] = l[i][v];
  }

  return m;
}
