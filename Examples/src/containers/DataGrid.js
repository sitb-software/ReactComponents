import React from 'react';
import Component from 'react-components/AbstractComponent';
import DataGridComponent from 'react-components/DataGrid';

const basicColumns = [{
  label: '#',
  key: 'id',
  resizable: false,
  width: 30
}, {
  label: 'First Name',
  key: 'firstName',
  resizable: true
}, {
  label: 'Last Name',
  key: 'lastName',
  resizable: true
}, {
  label: 'Age',
  key: 'age',
  resizable: true
}];

function basicDataSource() {
  let data = [];
  for (let i = 0; i < 1000; i++) {
    data.push({
      id: i,
      firstName: `First Name-${i}`,
      lastName: `Last Name-${i}`,
      age: `Age ${i}`
    });
  }
  return data;
}

/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 16/8/24
 */
class DataGrid extends Component {

  state = {
    stripedRows: false,
    resizable: false,
    selectable: 'none'
  };

  handleChange(key) {
    return (event) => {
      console.log(event);
      let state = this.state;
      if (key === 'stripedRows') {
        state[key] = event.target.checked;
      } else {
        state[key] = event.target.value;
      }
      this.setState(state);
    };
  }

  render() {
    return (
      <div className="data-grid-example">
        <div className="option">
          <input defaultChecked={this.state.stripedRows}
                 onChange={this.handleChange('stripedRows')}
                 type="checkbox"
          />
          {'StripedRows'}
        </div>
        <div className="option">
          {'Selectable'}
          <select defaultValue={this.state.selectable}
                  onChange={this.handleChange('selectable')}
          >
            <option value="none">{'Disable - none'}</option>
            <option value="single">{'single'}</option>
            <option value="multiple">{'multiple'}</option>
          </select>
        </div>
        <DataGridComponent columns={basicColumns}
                           dataSource={basicDataSource()}
                           selectable={this.state.selectable}
                           stripedRows={this.state.stripedRows}
                           style={{height: 400}}
        />
      </div>
    );
  }

}

export default DataGrid;
