import React, { Component } from 'react';
// import Button from "antd/lib/button";
import { Checkbox,Radio,Table  } from "antd";
import reqwest from 'reqwest';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
// import {}
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const columns = [
  {
  title:'赛事',
  dataIndex:'league[0]'
  },
  {
  title:'时间',
  dataIndex:'matchTime',
  render:(value, record) => <span title={record.matchYear + '-' + record.matchDate + ' ' + record.matchTime}> {record.matchDate + ' ' + record.matchTime}</span>
  },
  {
  title:'主队',
  dataIndex:'home[0]'
  },
  {
    title:'全场比分',
    dataIndex:'score',
    render:(value, record) => <span> {record.homeScore} - {record.guestScore} </span>
  },
  {
    title:'客队',
    dataIndex:'guest[0]'
  },
  {
    title:'半场比分',
    dataIndex:'halfScore',
    render:(value, record) => <span> {record.homeHalfScore} - {record.guestHalfScore} </span>
  },
];

class App extends Component {
  state = {
    data: [],
    loading:false
  };

  fetch = () => {
    this.setState({ loading: true });
    this.setState({loading:true});
    reqwest({
      url: 'worldcup_2018.json',
      method: 'get',
      type: 'json',
    }).then((data) => {
      // Read total count from server
      // pagination.total = data.totalCount;
      this.setState({
        data: data.results,
        loading:false
      });
    });
  }

  componentDidMount() {
    this.fetch();
  }
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
          

          <Table 
          dataSource={this.state.data} 
          columns={columns} 
          pagination={false}
          rowKey={(record) => record.matchId} 
          loading={this.state.loading}
          size="small"/>
          </div>
      </div>
    );
  }
}

export default App;



