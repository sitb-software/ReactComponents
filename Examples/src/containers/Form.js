import React from 'react';
import Component from 'react-components/AbstractComponent';
import FormComponent from 'react-components/form/Form';

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/9/1
 */
class Form extends Component {

  form;

  getFormValue() {
    let formValue = this.form.getFormValue();
    console.log(formValue);
  }

  getFormData() {
    console.log(this.form.getFormData());
  }

  render() {
    return (
      <FormComponent className="form"
                     ref={form => this.form = form}
      >
        <input name="checkbox"
               type="checkbox"
        />
        <input name="checkbox"
               type="checkbox"
        />
        <input name="checkbox"
               type="checkbox"
        />
        <input name="color"
               type="color"
        />
        <input name="date"
               type="date"
        />
        <input name="datetime"
               type="datetime"
        />
        <input name="datetime-local"
               type="datetime-local"
        />
        <input name="month"
               type="month"
        />
        <input name="week"
               type="week"
        />
        <input name="time"
               type="time"
        />
        <input name="file"
               type="file"
        />
        <input name="hidden"
               type="hidden"
               value="hidden"
        />
        <input name="radio"
               type="radio"
               value="1"
        />
        <input name="radio"
               type="radio"
               value="2"
        />
        <input name="range"
               type="range"
        />
        <select name="option">
          <option>{'123'}</option>
        </select>
        <div>{'2'}</div>
        <span>{'1'}</span>

        <button onClick={this.getFormValue}
                type="button"
        >
          {'Get FormValue'}
        </button>
        <button onClick={this.getFormData}
                type="button"
        >
          {'Get FormData'}
        </button>
      </FormComponent>
    );
  }

}

export default Form;
