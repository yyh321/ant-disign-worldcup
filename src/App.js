import React, { Component } from 'react';
// import Button from "antd/lib/button";
import { Checkbox,Radio,Table  } from "antd";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
// import {}
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
}];


class App extends Component {
  
  render() {
    return (
      <div className="App">
          
          <nav className="navbar navbar-light bg-light">
            <div className="container">
              <a className="navbar-brand" href="/">WorldCup 2018</a>
            </div>
          </nav>
          <div className="container mt-3">
            <div className="filter my-3">
              <Checkbox >显示红牌</Checkbox>
              <Checkbox>显示黄牌</Checkbox>
              <RadioGroup  defaultValue="0">
                <RadioButton value="0">简体</RadioButton>
                <RadioButton value="1">繁体</RadioButton>
                <RadioButton value="2">English</RadioButton>
              </RadioGroup>
            </div>
          

          <Table dataSource={dataSource} columns={columns} pagination={false} size="small"/>
          </div>
      </div>
    );
  }
}

export default App;



