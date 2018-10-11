import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import './index.scss';

class EditorStringArray extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: [],
    };
    this.newRow = this.newRow.bind(this);
    this.delRow = this.delRow.bind(this);
    this.sendChanges = this.sendChanges.bind(this);
  }
  sendChanges() {
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  onChange(index) {
    return (e) => {
      e.persist();
      this.setState((previousState) => {
        const value = previousState.value;
        value[index] = e.target.value;
        this.sendChanges();
        return {
          value
        };
      });
    };
  }
  newRow() {
    this.setState((previousState) => {
      const value = previousState.value;
      value.push('');
      this.sendChanges();
      return {
        value
      };
    });
  }
  delRow(index) {
    return () => {
      this.setState((previousState) => {
        const value = previousState.value;
        value.splice(index, 1);
        this.sendChanges();
        return {
          value
        };
      });
    };
  }
  render() {
    return (
      <div className="full-width editor-string-array">
        <FormattedMessage id={`pages.edit.${this.props.id}.title`}>
          {((label) => (
            <label>{label}</label>
          ))}
        </FormattedMessage>
        <button type="button" onClick={this.newRow}>
          <FormattedMessage id={`pages.edit.${this.props.id}.add`} />
        </button>
        {this.state.value.map((value, index) =>
          <div className="row editor-string-array-row" key={index}>
            <button type="button" onClick={this.delRow(index)}><FormattedMessage id="forms.delete" /></button>
            <FormattedMessage id={`pages.edit.${this.props.id}.placeholder`}>
              {((placeholder) => (
                <input placeholder={placeholder} onChange={this.onChange(index)} value={value}></input>
              ))}
            </FormattedMessage>
          </div>
        )}
      </div>
    );
  }
}

EditorStringArray.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
};

export default EditorStringArray;
