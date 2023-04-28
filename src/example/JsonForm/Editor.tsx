import { Component } from 'react'
import ReactQuill from 'react-quill'
import { BeakerIcon, ZapIcon, StarFillIcon } from '@primer/octicons-react'
import { uniqueId } from 'lodash/fp'
import 'react-quill/dist/quill.snow.css'
import './editor.css'
import React from 'react'

interface IProps {
  value: string | undefined
  onChange: (value: string) => void
}

/*
 * Custom "star" icon for the toolbar using an Octicon
 * https://octicons.github.io
 */
const CustomButton = () => <StarFillIcon />
/*
 * Event handler to be attached using Quill toolbar module (see line 73)
 * https://quilljs.com/docs/modules/toolbar/
 */
// function insertStar(value: string | any[]) {
//   const cursorPosition = this.quill.getSelection().index
//   this.quill.insertText(cursorPosition, value)
//   this.quill.setSelection(cursorPosition + value.length)
// }

/*
 * Editor component with custom toolbar and content containers
 */
class Editor extends Component<IProps> {
  [x: string]: any
  id: string
  modules: {
    toolbar: {
      container: string
      handlers: { insertStar: (value: any) => void }
    }
  }
  static defaultProps: IProps
  constructor(props: IProps) {
    super(props)
    this.id = uniqueId('toolbar')
    /*
     * Quill modules to attach to editor
     * See https://quilljs.com/docs/modules/ for complete options
     */
    this.modules = {
      toolbar: {
        container: `#${this.id}`,
        handlers: {
          insertStar: value => {
            const cursorPosition = this.quill.getSelection().index
            this.quill.insertText(cursorPosition, value)
            this.quill.setSelection(cursorPosition + value.length)
          }
        }
      }
    }
  }

  /*
   * Custom toolbar component including insertStar button and dropdowns
   */
  renderToolbar = () => {
    return (
      <div id={this.id}>
        <button className="ql-bold" />
        <select className="ql-color">
          <option value="red" />
          <option value="green" />
          <option value="blue" />
          <option value="orange" />
          <option value="violet" />
          <option value="#d0d1d2" />
          <option selected />
        </select>
        <button className="ql-insertStar" value="★">
          <CustomButton />
        </button>
        <button className="ql-insertStar" value="beaker">
          <BeakerIcon />
        </button>
        <button className="ql-insertStar" value="zap">
          <ZapIcon />
        </button>
      </div>
    )
  }

  render() {
    const { value, onChange } = this.props
    return (
      <div className="text-editor">
        {this.renderToolbar()}
        <ReactQuill
          onChange={onChange}
          value={value}
          placeholder="Write something or insert a star ★"
          modules={this.modules}
        />
      </div>
    )
  }
}

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
// Editor.formats = [
//   "header",
//   "font",
//   "size",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
//   "color"
// ]

Editor.defaultProps = {
  onChange: () => {},
  value: ''
}

export default Editor
