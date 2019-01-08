import React, { Component } from 'react';
// import Button from "antd/lib/button";
import { Checkbox,Radio,Table,Badge,Dropdown,Icon,Menu,message  } from "antd";
import reqwest from 'reqwest';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
// import {}
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class App extends Component {
  state = {
    data: [],
    loading:false,
    lang:0,
    showRed:true,
    showYellow:true
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
  // 切换语言
  handleLangChange = (e) => {
    this.setState({
      lang: e.target.value
    })
  }
  // 显示红牌
  handleShowRedChange = (e) => {
    this.setState({showRed: e.target.checked})
  }
  // 显示黄牌
  handleShowYellowChange = (e) => {
    this.setState({showYellow: e.target.checked})
  }
  // 主队进球
  handleOperation = (matchId) => {
    // message.success('This is a prompt message for success, and it will disappear in 10 seconds', 10);
    let index = this.state.data.findIndex(x => x.matchId === matchId);
    if(index !==-1) {
      let currentMatch = this.state.data[index];
      let currentMatchHome = currentMatch.home[this.state.lang];
      let currentMatchGuest = currentMatch.guest[this.state.lang];
      currentMatch.homeScore++;
      let msg = <span><b className="text-danger"> {currentMatchHome} {currentMatch.homeScore} </b>: {currentMatch.guestScore} {currentMatchGuest} </span>
      message.success(msg,2);
      this.setState({
        data: this.state.data
      })
    }
  }
  render() {
    const columns = [
      {
      title:'赛事',
      dataIndex:'league',
      render:league => <span> {league[this.state.lang]} </span>
      },
      {
      title:'时间',
      dataIndex:'matchTime',
      render:(value, record) => <span title={record.matchYear + '-' + record.matchDate + ' ' + record.matchTime}> {record.matchDate + ' ' + record.matchTime}</span>
      },
      {
      title:'主队',
      dataIndex:'home',
      render:(home,record) =><div> 
        <Badge className="mr-1" count={record.homeYellow} style={{display:this.state.showYellow?'block':'none' ,borderRadius:0, backgroundColor:'yellow',color:'#999',boxShadow:'0 0 0 1px #d9d9d9 inset'}} />
        <Badge className="mr-1" count={record.homeRed} style={{display:this.state.showRed?'block':'none' ,borderRadius:0, backgroundColor:'red',color:'#fff',boxShadow:'0 0 0 1px #d9d9d9 inset'}} />
        <span> {home[this.state.lang]} </span>
        </div>
      },
      {
        title:'全场比分',
        dataIndex:'score',
        render:(value, record) => <span> {record.homeScore} - {record.guestScore} </span>
      },
      {
        title:'客队',
        dataIndex:'guest',
        render:(guest,record) =><div> 
        <span> {guest[this.state.lang]} </span>
        <Badge className="ml-1" count={record.guestRed} style={{display:this.state.showRed?'block':'none', borderRadius:0, backgroundColor:'red',color:'#fff',boxShadow:'0 0 0 1px #d9d9d9 inset'}} />
        <Badge className="ml-1" count={record.guestYellow} style={{display:this.state.showYellow?'block':'none',borderRadius:0, backgroundColor:'yellow',color:'#999',boxShadow:'0 0 0 1px #d9d9d9 inset'}} />
        </div>
      },
      {
        title:'半场比分',
        dataIndex:'halfScore',
        render:(value, record) => <span> {record.homeHalfScore} - {record.guestHalfScore} </span>
      },
      {
        title:'本地模拟',
        dataIndex:'operation',
        render:(value, record) => <Dropdown overlay={
          <Menu>
            <Menu.Item key="0">
              <a onClick={e=>this.handleOperation(record.matchId)}>主队进球+1</a>
            </Menu.Item>
            <Menu.Divider />
          </Menu>
        } trigger={['click']}>
        <a className="ant-dropdown-link">
          模拟 <Icon type="down"/>
        </a>
      </Dropdown>,
      },
    ];
    return (
      <div className="App">
          
          <nav className="navbar navbar-light bg-light">
            <div className="container">
              <a className="navbar-brand" href="/">WorldCup 2018</a>
            </div>
          </nav>
          <div className="container mt-3">
            <div className="filter my-3">
              <Checkbox checked={this.state.showRed} onChange={this.handleShowRedChange}>显示红牌</Checkbox>
              <Checkbox checked={this.state.showYellow} onChange={this.handleShowYellowChange} >显示黄牌</Checkbox>
              <RadioGroup  defaultValue={this.state.lang} onChange={this.handleLangChange}>
                <RadioButton value={0}>简体</RadioButton>
                <RadioButton value={1}>繁体</RadioButton>
                <RadioButton value={2}>English</RadioButton>
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



