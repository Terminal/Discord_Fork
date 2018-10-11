import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

class EditorInput extends React.Component {
  render() {
    let input = null;
    if (this.props.choices && typeof this.props.choices === 'object' && Array.isArray(this.props.choices)) {
      input = (
        <select className="full-width" id={this.props.id} defaultValue="" required onChange={this.props.onChange} name={this.props.name}>
          <FormattedMessage id="forms.select">
            {(msg) => (<option value="" disabled hidden>{ this.props.placeholder || msg}</option>)}
          </FormattedMessage>
          {
            this.props.choices.map((key) => (
              <FormattedMessage id={`pages.edit.${this.props.id}.${key}`} key={key}>
                {(msg) => (<option value={key}>{msg}</option>)}
              </FormattedMessage>)
            )
          }
        </select>
      );
    } else if (this.props.choices && typeof this.props.choices === 'object') {
      input = (
        <select className="full-width" id={this.props.id} defaultValue="" required onChange={this.props.onChange} name={this.props.name}>
          <FormattedMessage id="forms.select">
            {(msg) => (<option value="" disabled hidden>{ this.props.placeholder || msg}</option>)}
          </FormattedMessage>
          {
            Object.keys(this.props.choices).map((key) => (<option value={key} key={key}>{this.props.choices[key]}</option>))
          }
        </select>
      );
    } else if (this.props.type === 'field') {
      input = (
        <textarea className="full-width" id={this.props.id} onChange={this.props.onChange} name={this.props.name} defaultValue={this.props.children}/>
      );
    } else {
      input = (
        <FormattedMessage id={`pages.edit.${this.props.id}.placeholder`}>
          {((placeholder) => (
            <input className="full-width" placeholder={placeholder} id={this.props.id} onChange={this.props.onChange} name={this.props.name}></input>
          ))}
        </FormattedMessage>
      );
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
    );
  }
}

EditorInput.propTypes = {
  choices: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.objectOf(PropTypes.string)
  ]),
  placeholder: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
};

export default EditorInput;
