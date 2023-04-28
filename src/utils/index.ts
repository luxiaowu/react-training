import { omit } from 'lodash/fp'

export type ValueType =
  | 'text'
  | 'richText'
  | 'array'
  | 'JSON'
  | 'none'
  | undefined

type Base = {
  label?: string
  value?: string
}

export type TreeNode =
  | (Base & {
      type: 'none'
      name?: undefined
      children?: TreeNode[]
    })
  | (Base & {
      type: 'array'
      key?: string
      name: string
      children: TreeNode[]
    })
  | (Base & {
      type?: 'JSON' | 'richText' | undefined
      name: string
      children?: TreeNode[]
    })

export type TreeNodeWithKey = TreeNode & {
  type: 'array' | 'JSON' | 'richText' | 'none' | undefined
  key: string
  children: TreeNodeWithKey[]
}

interface Node {
  type: ValueType
  name: string
  key: string
  value: string
  children: OptionalNode[]
}

type OptionalNode = Partial<Node>

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const recursiveSetKey = (data: TreeNode[], parentKey = '') =>
  data.map((x, i) => {
    const key = parentKey ? `${parentKey}.${i}` : `${i}`
    // console.log(parentKey, key);
    if (x.children) {
      x.children = recursiveSetKey(x.children, `${key}.children`)
    }
    return {
      ...x,
      key: parentKey ? `${parentKey}.${i}` : i.toString()
    }
  })

const recursiveGetKey = (data: TreeNodeWithKey[]): string[] =>
  data.reduce<string[]>((acc, cur) => {
    const nextAcc = [...acc, cur.key]
    if (cur.children) {
      return [...nextAcc, ...recursiveGetKey(cur.children)]
    }
    return nextAcc
  }, [])

const isEmptyValue = (data: OptionalNode[]): boolean =>
  data.some(x => {
    if (x.value) return true
    if (x.children) return isEmptyValue(x.children)
    return false
  })

const recursiveOmitKey = (keys: string[], data: OptionalNode[]) =>
  data.map(x => {
    if (x.children) x.children = recursiveOmitKey(keys, x.children)
    return omit(keys, x)
  })

const isJSON = (value: string) => {
  if (value === 'null') return false
  try {
    JSON.parse(value)
  } catch (e) {
    // console.error('checkIfJson', value)
    return false
  }
  return true
}

const getFormData = (data: TreeNode[]) =>
  data.reduce<Record<string, any>>((acc, cur) => {
    // console.log(acc, cur)
    if (cur.type === 'array') {
      acc[cur.name] = cur.children
        .filter(x => isEmptyValue([x]))
        .map(x => getFormData(x.children || []))
    } else if (cur.children && cur.type !== 'none') {
      const value = getFormData(cur.children)
      Object.keys(value).length > 0 && (acc[cur.name] = value)
    } else if (cur.value && cur.type !== 'none') {
      acc[cur.name] =
        cur.type === 'JSON' && isJSON(cur.value)
          ? JSON.parse(cur.value)
          : cur.value
    }
    return acc
  }, {})

export {
  delay,
  recursiveSetKey,
  recursiveGetKey,
  getFormData,
  recursiveOmitKey,
  isJSON
}
