import React, { useCallback, useEffect, useReducer } from 'react'
import {
  Button,
  Collapse,
  Input,
  Switch,
  Grid,
  Card,
  Checkbox
} from '@alifd/next'
import { createPatch } from 'diff'
import ReactJson from 'react-json-view'
import qs from 'qs'
import { useSelections } from 'ahooks'

const Index = () => {
  const getOrderText = (text: string) =>
    qs.stringify(qs.parse(text), {
      sort: (a, b) => a.localeCompare(b)
    })

  const init = (text: string) => {
    const orderText = getOrderText(text)
    return {
      text,
      orderText: getOrderText(text),
      json: qs.parse(orderText),
      parse: true
    }
  }

  const reducer = (state: any, action: any) => {
    // console.log(state, action)
    switch (action.type) {
      case 'parse':
        return { ...state, parse: action.payload }
      default:
        const orderText = getOrderText(action.payload)
        return {
          ...state,
          text: action.payload,
          orderText,
          json: qs.parse(orderText)
        }
    }
  }

  const [left, dispatchLeft] = useReducer(
    reducer,
    'path=myBank&env=gray&scene=draft',
    init
  )
  const [right, dispatchRight] = useReducer(
    reducer,
    'env=gray&path=myBankCard&scene=draft',
    init
  )

  const { selected, isSelected, toggle } = useSelections(['text', 'json'])
  const {
    selected: diffStyleSelected,
    isSelected: isDiffStyleSelected,
    toggle: toggleDiffStyle
  } = useSelections(['text', 'json'])

  const draw = useCallback(
    (id: string, diffString: string) => {
      const targetElement = document.getElementById(id)
      const configuration = {
        drawFileList: false,
        diffStyle: isDiffStyleSelected(id) ? 'char' : 'word',
        outputFormat: isSelected(id) ? 'side-by-side' : 'line-by-line',
        matching: 'words',
        highlight: true
      }
      const diff2htmlUi = new Diff2HtmlUI(
        targetElement,
        diffString,
        configuration
      )
      diff2htmlUi.draw()
      diff2htmlUi.highlightCode()
    },
    [isDiffStyleSelected, isSelected]
  )

  const showDiffHtml = useCallback(() => {
    const diffText = createPatch(
      'text',
      left.parse ? left.orderText : left.text,
      right.parse ? right.orderText : right.text
    )
    const diffJson = createPatch(
      'json',
      JSON.stringify(left.json, null, 4),
      JSON.stringify(right.json, null, 4)
    )
    draw('text', diffText)
    draw('json', diffJson)
  }, [
    draw,
    left.json,
    left.orderText,
    left.parse,
    left.text,
    right.json,
    right.orderText,
    right.parse,
    right.text
  ])

  useEffect(() => {
    showDiffHtml()
  }, [diffStyleSelected, selected, showDiffHtml])

  return (
    <>
      <Grid.Row gutter={30}>
        {['left', 'right'].map(x => {
          const cur = x === 'left' ? left : right
          const dispatch = x === 'left' ? dispatchLeft : dispatchRight
          return (
            <Grid.Col key={x}>
              <Card
                actions={
                  <Checkbox
                    checked={cur.parse}
                    onChange={checked =>
                      dispatch({ type: 'parse', payload: checked })
                    }
                  >
                    反序列化
                  </Checkbox>
                }
              >
                <Input.TextArea
                  style={{ width: '100%', marginBottom: 10 }}
                  placeholder={`文本${x === 'left' ? '1' : '2'}`}
                  value={x === 'left' ? left.text : right.text}
                  onChange={value =>
                    dispatch({ type: 'value', payload: value })
                  }
                />
                <Card.Divider />
                {cur.parse && (
                  <ReactJson
                    displayDataTypes={false}
                    src={x === 'left' ? left.json : right.json}
                  />
                )}
              </Card>
            </Grid.Col>
          )
        })}
      </Grid.Row>
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <Button
          type="primary"
          onClick={showDiffHtml}
          style={{ marginRight: 20 }}
        >
          比对
        </Button>
      </div>
      <Collapse defaultExpandedKeys={['text', 'json']}>
        {['text', 'json'].map(x => (
          <Collapse.Panel title={x} key={x}>
            <Grid.Row justify="space-between">
              <Switch
                autoWidth
                checkedChildren="char"
                unCheckedChildren="word"
                checked={isDiffStyleSelected(x)}
                onChange={() => toggleDiffStyle(x)}
              />
              <Switch
                autoWidth
                checkedChildren="side-by-side"
                unCheckedChildren="line-by-line"
                checked={isSelected(x)}
                onChange={() => toggle(x)}
              />
            </Grid.Row>
            <div id={x} style={{ marginTop: 10 }} />
          </Collapse.Panel>
        ))}
      </Collapse>
    </>
  )
}

export default Index
