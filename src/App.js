import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Input, TextArea, GenericInput} from 'react-text-input';

function Ex(props){
  return(
      <div>
        <div>
          <Input>{props.result.skills.list.var1}</Input>
          <Input>{props.result.skills.list.operator}</Input>
          <Input>{props.result.skill.list.var2}</Input>
        </div>
        <div>
          <TextArea>{props.result.skills.list.options[0]}</TextArea>
          <TextArea>{props.result.skills.list.options[1]}</TextArea>
          <TextArea>{props.result.skills.list.options[2]}</TextArea>
          <TextArea>{props.result.skills.list.options[3]}</TextArea>
        </div>
      </div>
    );
}

function ExList(props) {
  console.log('Exlist props')
  console.log(JSON.stringify(props.result))
  const listEX = props.result.skills;
  return(
      <div>
        {listEX.map((list, i) => <Ex key = {i}/>)}
      </div>
    );
}

ExList.propTypes = {
  result: React.PropTypes.array.isRequired
}

class App extends Component {
  constructor() {
    super();
    this.state ={
      exs: []
    };
    this.callApi = this.callApi.bind(this);
  }

  componentWillMount(){
    console.log('ExList: componentWillMount')
    this.callApi();
  }

  componentDidMount() {
    console.log('ExList: componentDidMount');
  }

  callApi(){
    fetch('http://51.15.128.208:3000/api/Exercises/generate', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"options":[{"type":"Calculating","options":[{"id":0,"label":"Addition","quantity":5,"level":{"min":0,"max":5}},
            {"id":1,"label":"Subtraction","quantity":5,"level":{"min":0,"max":5}}]}]})
    })
    .then(function(res){
      return res.json();
    })
    .then((data) => {
      console.log('callApi was Called') 
      this.setState({exs: data});
      console.log(JSON.stringify(this.state.exs))
      //console.log( JSON.stringify( data ) ); 
    })
  }

  render() {
    console.log('rendering')
    console.log(this.state.exs)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <ExList result = {this.state.exs}/>
        </p>
      </div>
    );
  }
}

export default App;
