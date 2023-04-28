import React from 'react'
import { Button, Form, Tree } from 'antd'
import { useEffect, useState } from 'react'
import {
  recursiveSetKey,
  getFormData,
  isJSON,
  recursiveOmitKey,
  recursiveGetKey,
  TreeNode,
  TreeNodeWithKey
} from '../../utils'
import { set, get, initial, last, cloneDeep, dropRight } from 'lodash/fp'
import ReactJson from 'react-json-view'
import InputIME from './InputIME'
import Editor from './Editor'

type AddEventHandler = (
  x: Pick<TreeNodeWithKey, 'key' | 'children'>,
  i?: number
) => () => void
type RemoveEventHandler = (key: TreeNodeWithKey['key']) => () => void
type ChangeEventHandler = (value: string, key: TreeNodeWithKey['key']) => void

const defaultData: TreeNode[] = [
  {
    label: '标题',
    name: 'title'
  },
  {
    label: '内容',
    name: 'message'
  },
  {
    label: '按钮',
    name: 'buttons',
    type: 'array',
    children: [
      {
        label: '按钮',
        type: 'none',
        children: [
          {
            label: '文案',
            name: 'txt',
            type: 'richText'
          },
          {
            label: '动作',
            name: 'act',
            children: [
              {
                label: '点击行为',
                name: 'name'
              },
              {
                label: '行为参数',
                name: 'params',
                type: 'JSON'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    label: '汽车',
    name: 'car',
    children: [
      {
        label: '品牌',
        name: 'brand',
        children: [
          {
            label: '大众',
            name: 'volkswagen',
            children: [
              {
                label: '凌度L',
                name: 'lamando'
              }
            ]
          },
          {
            label: '吉利',
            name: 'greey'
          }
        ]
      }
    ]
  }
]

const JsonForm = () => {
  const [data, setData] = useState<TreeNodeWithKey[]>(() => {
    const init = cloneDeep(defaultData)
    const next = recursiveSetKey(init)
    return next as TreeNodeWithKey[]
  })
  const [expandKeys, setExpandKeys] = useState<React.Key[]>([])

  useEffect(() => {
    const nextExpandKeys = recursiveGetKey(data)
    setExpandKeys(nextExpandKeys)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const add: AddEventHandler =
    ({ key, children = [] }, index = undefined) =>
    () => {
      const nextIndex = index === undefined ? 0 : index
      const item = [cloneDeep(children[nextIndex])]
      const nextItem = recursiveOmitKey(
        index === undefined ? ['key', 'value'] : ['key'],
        cloneDeep(item)
      )
      const nextData = set(
        `${key}.children`,
        index === undefined
          ? [...children, ...nextItem]
          : children.flatMap((x, i) => (i === index ? [x, nextItem[0]] : [x])),
        data
      )
      // console.log(key, children, index, item, nextItem)
      // console.log(item, nextItem)
      // @ts-ignore
      setData(recursiveSetKey(nextData))
      setExpandKeys(recursiveGetKey(nextData))
    }

  const remove: RemoveEventHandler = key => () => {
    const parentKey = initial(key.split('.')).join('.')
    const parentChildren = get(parentKey, data)
    // console.log(key, parentKey, parentChildren)
    const nextData = set(
      parentKey,
      parentChildren.filter((x: { key: string }) => x.key !== key),
      data
    )
    // @ts-ignore
    setData(recursiveSetKey(nextData))
  }

  const onChange: ChangeEventHandler = (value, key) => {
    const nextData = set(`${key}.value`, value || undefined, data)
    // console.log(key, nextData)
    setData(nextData)
  }

  const formData = getFormData(data)
  // console.log(formData)

  const renderTreeNode = (treeData: TreeNodeWithKey[]) =>
    treeData.map(x => {
      if (x.children) {
        const parentKey = dropRight(2, x.key!.split('.')).join('.')
        const parentChildren = get(parentKey + '.children', data)
        const index = +last<string>(x.key.split('.'))!
        // console.log('p', x.name, parentKey, parentChildren)
        return (
          <Tree.TreeNode
            disabled={!x.name}
            title={
              <>
                {x.label}
                {!x.name && index + 1}
                {x.type === 'array' && (
                  <Button size="small" type="link" onClick={add(x)}>
                    增加一项
                  </Button>
                )}
                {!x.name && (
                  <Button
                    size="small"
                    type="link"
                    onClick={add(
                      {
                        key: parentKey,
                        children: parentChildren
                      },
                      index
                    )}
                  >
                    向下复制
                  </Button>
                )}
                {!x.name && parentChildren.length > 1 && (
                  <Button size="small" type="link" onClick={remove(x.key)}>
                    删除
                  </Button>
                )}
              </>
            }
            key={x.key}
          >
            {renderTreeNode(x.children)}
          </Tree.TreeNode>
        )
      }
      return (
        <Tree.TreeNode
          title={
            <Form layout="horizontal">
              <Form.Item
                label={x.label}
                style={{ marginBottom: 0 }}
                validateStatus={
                  x.type === 'JSON' && x.value && !isJSON(x.value)
                    ? 'error'
                    : 'success'
                }
                help={
                  x.type === 'JSON' && x.value && !isJSON(x.value)
                    ? '请输入JSON格式数据'
                    : null
                }
              >
                {x.type === 'richText' ? (
                  <Editor
                    value={x.value}
                    onChange={value => onChange(value, x.key)}
                  />
                ) : (
                  <InputIME
                    size="small"
                    value={x.value}
                    onChange={value => onChange(value, x.key)}
                  />
                )}
              </Form.Item>
            </Form>
          }
          key={x.key}
        />
      )
    })

  return (
    <>
      <div style={{ display: 'flex', paddingTop: 50 }}>
        <ReactJson src={defaultData} collapsed={3} displayDataTypes={false} />
        <Tree
          showLine
          selectable={false}
          defaultExpandAll
          expandedKeys={expandKeys}
          onExpand={setExpandKeys}
        >
          {renderTreeNode(data)}
        </Tree>
        <ReactJson src={formData} collapsed={3} displayDataTypes={false} />
      </div>
    </>
  )
}

export default JsonForm
