import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './component/card.js';
import Cardlist from './cardlist.js';
import Edit from './component/edit.js'

class App extends Component {
    constructor(props) {
        super(props);
        let list=[];
        for(let i=0;i<72;i++)
            list[i]=i;
        this.state={
            isEdit:false,
            list:list,
            cardsContent:'cards-content',
        }
    }

    handleClick=(index)=>{
        this.setState({
            isEdit:true,
            currentIndex:index,
        })
    }

    back=()=>{
        this.setState({
            isEdit:false
        })
        for(let x in this.refs.edit.refs){
            this.refs.edit.refs[x].value='';
            this.refs.edit.refs[x].innerHTML='';
        }

    }

    changeCards=()=>{
        if(this.state.list[0]<48) {
            this.setState({
                cardsContent: "cards-content-next",
            });
            let timer = setTimeout(this.changeList.bind(this), 1000);
        }
    }
    changeCards1=()=>{
        if(this.state.list[0]>0) {
            let list = [];
            let a=this.state.list[0];
            for(let i=0;i<24;i++) {
                list.unshift(--a);
            }
            this.setState({list:list.concat(this.state.list)});

                this.setState({
                    cardsContent: "cards-content-pre",
                });
                let timer = setTimeout(this.changeList1.bind(this), 1000);
        }
    }
    changeList(){
        this.setState({list:this.state.list.slice(24)});
        this.setState({
            cardsContent:"cards-content",
        });
    }

    changeList1(){

        this.setState({
            cardsContent:"cards-content",
        });
    }
  render() {
      return (
      <div className="App">
        <header className={this.state.isEdit?"App-header-edit":"App-header"}>
          <img style={{display:this.state.isEdit?"none":""}} src={logo} className="App-logo" alt="logo" />
            {this.state.isEdit?<h2 className="Edit-title">{Cardlist[this.state.currentIndex]}</h2>:<h1 className="App-title">开始书写</h1>}
        </header>
        <p style={{display:this.state.isEdit?"none":"block"}} className="App-intro">
          选择一个词牌以开始：
        </p>
          <div className="cards-wrapper" style={{display:this.state.isEdit?"none":"block"}}>
          <div className={this.state.cardsContent}>
              {
                  this.state.list.map((index)=>{
                      return(
                          <div onClick={()=>this.handleClick(index)} key={index}>
                          <Card index={index}/>
                          </div>
                      )
                  })
              }
          </div>
          </div>
          <div className="change-cards-label" style={{display:this.state.isEdit?"none":""}}>
              <p><a onClick={this.changeCards1}>上一组</a></p>
          <p><a onClick={this.changeCards}>下一组</a></p>
          </div>
          <div style={{display:this.state.isEdit?"block":"none"}} className="edit-wrapper">
              <a className="goback" onClick={this.back}>返回</a>
              <Edit ref='edit' index={this.state.currentIndex}/>
          </div>
      </div>
    );
  }
}

export default App;
