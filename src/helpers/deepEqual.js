export default function deepEqual(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  return Object.entries(a).every(([key, aValue]) => {
    if (key in b) {
      const bValue = b[key];

      if (aValue === bValue) {
        return true;
      }

      if (isObject(aValue) && isObject(bValue)) {
        return deepEqual(aValue, bValue);
      }

      return false;
    }

    return false;
  });
}

function isObject(a) {
  return typeof typeof a === 'object' && !Array.isArray(a) && a !== null;
}
