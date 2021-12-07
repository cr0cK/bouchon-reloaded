import { mergeWith } from 'lodash'

export interface IDeepMergeOption {
  concatArrays: boolean
}

/**
 * Deep merge of T object.
 */
export function deepMerge<T1, T2>(
  obj1: T1,
  obj2: T2,
  _options?: IDeepMergeOption
): T1 & T2 {
  const options: IDeepMergeOption = {
    concatArrays: true,
    ..._options
  }

  const res = mergeWith(obj1, obj2, (v1, v2) => {
    if (!options.concatArrays) {
      if (Array.isArray(v1) || Array.isArray(v2)) {
        return v2 || v1
      }

      return undefined
    }

    if (Array.isArray(v1) && v2 !== undefined) {
      return v1.concat(v2)
    }

    if (Array.isArray(v2) && v1 !== undefined) {
      return [v1].concat(v2)
    }

    return undefined
  })

  return res
}
