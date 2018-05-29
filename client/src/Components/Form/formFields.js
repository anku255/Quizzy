import React from 'react';

export const renderTextField = ({
  input,
  label,
  type,
  helpText,
  placeholder,
  meta: { touched, error }
}) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <input
        {...input}
        className="input"
        type={type}
        placeholder={placeholder}
      />
    </div>
    <p className="help is-danger">{touched && error}</p>
    <p className="help has-text-grey">{helpText}</p>
  </div>
);

export const renderTextAreaField = ({
  input,
  label,
  rows,
  placeholder,
  meta: { touched, error }
}) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <textarea
        {...input}
        className="textarea"
        placeholder={placeholder}
        rows={rows}
      />
    </div>
    <p className="help is-danger">{touched && error}</p>
  </div>
);

// CSS style
const isFullWidth = {
  width: '100%'
};

export const renderSelectField = ({
  input,
  label,
  valuesArray,
  helpText,
  meta: { touched, error }
}) => (
  <div className="field ">
    <label className="label ">{label}</label>
    <div className="control ">
      <div className="select" style={isFullWidth}>
        <select {...input} style={isFullWidth}>
          <option />
          {valuesArray.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
    <p className="help is-danger">{touched && error}</p>
    <p className="help has-text-grey">{helpText}</p>
  </div>
);
