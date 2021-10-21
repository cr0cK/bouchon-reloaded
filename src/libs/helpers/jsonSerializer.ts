/**
 * Transform structures that are not stringified by default with JSON.stringify.
 */
export function replacer(key: any, value: any) {
  return [convertRegExp, convertMap, convertFunction].reduce(
    (acc, transformFn) => {
      return transformFn(key, acc)
    },
    value
  )
}

/**
 * Revert the transform of the structure to retrieve the origin value.
 */
export function reviver(key: any, value: any) {
  return [unconvertRegExp, unconvertMap, unconvertFunction].reduce(
    (acc, transformFn) => {
      return transformFn(key, acc)
    },
    value
  )
}

function convertMap(key: any, value: any) {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries())
    }
  }

  return value
}

function unconvertMap(key: any, value: any) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value)
    }
  }

  return value
}

function convertRegExp(key: any, value: any) {
  if (value instanceof RegExp) {
    return {
      dataType: 'RegExp',
      value: value.toString()
    }
  }

  return value
}

function unconvertRegExp(key: any, value: any) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'RegExp') {
      const regexpValue = value.value.match(/\/(.*)\//).pop() || ''
      return new RegExp(regexpValue)
    }
  }

  return value
}

function convertFunction(key: any, value: any) {
  if (typeof value === 'function') {
    return {
      dataType: 'Function',
      value: value.name
    }
  }

  return value
}

function unconvertFunction(key: any, value: any) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Function') {
      return null
    }
  }

  return value
}
