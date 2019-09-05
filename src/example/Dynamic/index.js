import React from "react";

const MyInput = ({value, onChange}) => (
    <div>
      <input
          value={value}
          onChange={e => onChange(e.target.value)}
      />
      &nbsp;&nbsp;
      <button onClick={() => onChange()}>设置默认值</button>
    </div>
)

class Dynamic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comps: []
    };
  }

  addComp = () => {
    this.setState({comps: [...this.state.comps, {value: ''}]});
  };

  onChange = index => (value = 'abc') => {
    const {comps} = this.state
    comps[index].value = value // mutable
    // this.setState({comps})
  }

  render() {
    const {comps} = this.state;
    return (
        <div>
          {comps.map(({value}, i) => <MyInput key={i} value={value} onChange={this.onChange(i)}/>)}
          <p>---------------</p>
          <button onClick={this.addComp}>加组件</button>
        </div>
    );
  }
}

export default Dynamic
