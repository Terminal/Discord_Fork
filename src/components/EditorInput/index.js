import React from 'react';
import { FormattedMessage } from 'react-intl'

export default class EditorInput extends React.Component {
  render() {
    let input = null;
    if (this.props.choices) {
      input = (
        <select className="full-width" id={this.props.id} defaultValue="" required>
          <FormattedMessage id="forms.select">
            {(msg) => (<option value="" disabled hidden>{ this.props.placeholder || msg}</option>)}
          </FormattedMessage>
          {
            Object.keys(this.props.choices).map((key) => (<option value={key} key={key}>{this.props.choices[key]}</option>))
          }
        </select>
      )
    } else {
      input = (
        <FormattedMessage id={`pages.edit.${this.props.id}.placeholder`}>
          {((placeholder) => (
            <input className="full-width" placeholder={placeholder} id={this.props.id}></input>
          ))}
        </FormattedMessage>
      )
    }

    return (
      <div className={this.props.className || 'one-half column'}>
        <FormattedMessage id={`pages.edit.${this.props.id}.title`}>
          {((label) => (
            <label htmlFor={this.props.id}>{label}</label>
          ))}
        </FormattedMessage>
        {input}
      </div>
    )
  }
}