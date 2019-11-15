/**
 * Created by linwai on 2017/11/24.
 */
import React, { Component } from 'react';
import Contentlist from '../contentlist.js';
import yunlist from '../pingshui.js';
import './edit.css';

class Edit extends Component{
    constructor(props) {
        super(props);
        this.state={
            index:this.props.index,
            yunword:''
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            index:nextProps.index
        })
    }

    handleEnter(value,index,e){
        if(e.key==='Enter') {
            if(this.refs['input'+(index+1)])
            this.refs['input'+(index+1)].focus();
        }
    }

    check(value,index,e){
        let text = e.target.value;
        let valarr = value.split(/[\，\、\。]/);
        valarr = valarr.slice(0, valarr.length - 1);
        valarr=valarr.map((val,i)=>{
            let tmp=[];
            if(val.indexOf('（')>0){
                val=val.substring(0,val.length-3);
                for(let i=0;i<val.length;i++){
                    tmp[i]=val[i];
                }
                if(tmp[tmp.length-1]==='平')
                    tmp[tmp.length-1]='平韵';
                else
                    tmp[tmp.length-1]='仄韵'
                return tmp;
            }
            for(i=0;i<val.length;i++){
                tmp[i]=val[i];
            }
            return tmp;
        });
        if(text) {
            let textarr = text.split(/[\，\、\。\！\？]/);
            if (textarr.length > 1){
                textarr = textarr.map((val, i) => {
                    let tmp = [];
                    for (let i = 0; i < val.length; i++) {
                        tmp[i] = val[i];
                    }
                    return tmp;
                });
            textarr = textarr.slice(0, textarr.length - 1);
            if (index === 0) {
                let yunline = textarr[textarr.length - 1];
                this.setState({
                    yunword: yunline[yunline.length - 1]
                }, () => console.log(this.state.yunword))
            }
            console.log(textarr, this.refs['spans' + index]);
            textarr.map((textword, i) => {
                let lineword = valarr[i];
                for (let m = 0; m < textword.length; m++) {
                    this.refs['spans' + index].innerHTML += '<span>&nbsp;&nbsp;</span>';
                    if (i < textarr.length - 1 && m === textword.length - 1) {
                        this.refs['spans' + index].innerHTML += '<span>&nbsp;&nbsp;</span>';
                    }
                }
                if (textword.length !== lineword.length) {
                    alert('字数不匹配，请检查')
                }
                textword.forEach((v, j) => {
                    if (!this.checkPz(v, lineword[j])) {
                        console.log('"' + v + '"' + '出律');
                        let inum=i;
                        let errNum = j + 1;
                        while (inum > 0) {
                            errNum += textarr[inum - 1].length + 1;
                            inum--;
                        }
                        this.refs['spans' + index].querySelector('span:nth-child(' + errNum + ')').innerText = '—';
                    }
                    ;
                    if (index !== 0 && (lineword[j] === '平韵' || lineword[j] === '仄韵')) {
                        if (!this.checkYunjiao(v)) {
                            let errNum = j + 1;
                            let inum=i;
                            while (inum > 0) {
                                errNum += textarr[inum - 1].length + 1;
                                inum--;
                            }
                            this.refs['spans' + index].querySelector('span:nth-child(' + errNum + ')').innerText = '—';
                        }
                        ;
                    }
                })
            });
        }
        else{
                alert('请检查标点')
            }
        }
    }

    checkPz(word,pz){
        let output=false;
        let output1=false;
        let patt = new RegExp(word);
        if(pz==='平'){
            for(let x in yunlist){
                if(x==='shangping'||x==='shangsheng'||x==='xiaping'){
                    yunlist[x].forEach((value,index)=>{
                        if(patt.test(value.word)){
                            output=true;
                        }
                    })
                }else{
                    yunlist[x].forEach((value,index)=>{
                        if(patt.test(value.word)){
                            output1=true;
                        }
                    })
                    if(output===false&&output1===false)
                        output=true;
                }
            }
        }
        else if(pz==='仄') {
            for (let x in yunlist) {
                if (x === 'qusheng' || x === 'rusheng') {
                    yunlist[x].forEach((value, index) => {
                        if (patt.test(value.word)) {
                            output = true;
                        }
                    })
                }else{
                    yunlist[x].forEach((value,index)=>{
                        if(patt.test(value.word)){
                            output1=true;
                        }
                    })

                    if(output===false&&output1===false)
                        output=true;
                }
            }
        }
        else
            output=true;
        return output;
    }

    clearError(value,index,e){
        this.refs['spans'+index].innerHTML='';
        this.refs['input'+(index)].focus();
    }


    checkYunjiao(yunzi){
        let yunstr='';
        let patt=new RegExp(this.state.yunword);
        let patt1=new RegExp(yunzi);
        for(let x in yunlist){
            yunlist[x].forEach((value,index)=>{
                if(patt.test(value.word)){
                    yunstr=value.word;
                }
            })
        }
        if(!patt1.test(yunstr)) {
            console.log(yunzi+'出韵');
            return false;
        }
        return true;
    }
    render(){
        let content=Contentlist[this.state.index]?Contentlist[this.state.index].split('\n'):[];
        return(
            <div className="content-wrapper">
                <form>
                    {content.map((value,index)=>{
                        return (
                            <div key={index}>
                                <label>{value}</label>
                                <input ref={'input'+index} onFocus={(e)=>this.clearError(value,index,e)} onBlur={(e)=>this.check(value,index,e)} onKeyPress={(e)=>this.handleEnter(value,index,e)} type="text"/>
                                <div ref={'spans'+index} onClick={(e)=>this.clearError(value,index,e)} className="spans"></div>
                            </div>
                        )
                    })}
                </form>
            </div>
        )
    }
}
export default Edit;