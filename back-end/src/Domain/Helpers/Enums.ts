export function enumValues(obj: Record<string | number, string | number>) {
  const numerics = Object.values(obj).filter(item => typeof item === 'number')
  if (numerics.length) {
    return numerics
  }
  return Object.values(obj)
}
