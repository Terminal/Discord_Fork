import React from 'react';

export default class EditorInput extends React.Component {
  render() {
    let input = null;
    if (this.props.choices) {
      input = (
        <select className="full-width" id={this.props.id} required>
          <option value="" disabled hidden>{ this.props.placeholder || 'Please select...'}</option>
          {
            Object.keys(this.props.choices).map((key) => (<option value={key} key={key}>{this.props.choices[key]}</option>))
          }
        </select>
      )
    } else {
      input = (
        <input className="full-width" placeholder={this.props.placeholder} id={this.props.id}></input>
      )
    }

    return (
      <div className={this.props.className || 'one-half column'}>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        {input}
      </div>
    )
  }
}