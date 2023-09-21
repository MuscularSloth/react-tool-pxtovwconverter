export function getValueFromLocalStorage<T>(name: string, defaultValue: T) {
  const saved: string = localStorage.getItem(name) ?? '';
  if (saved !== '') {
    const initialValue = JSON.parse(saved);
    if (typeof defaultValue === 'number') {
      return parseFloat(initialValue);
    }
    return initialValue;
  }
  return defaultValue;
}
