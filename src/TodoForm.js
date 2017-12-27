import React, { Component } from 'react';
import './App.css';
var objMain = [];
export default class TodoForm extends Component{
    constructor (props) {
        super(props);
        this._onSubmit = this._onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.title  = '';
        this.body  = '';
        this.state = {
            refresh : false,
            updated : true,
        }
    }
    handleChange(v){
        if (!this.state.updated) {
            this.setState({updated : true});
        }  
    }
    componentWillReceiveProps(n){
        this.title = this.props.selected.text;
        this.body = this.props.selected.body;
    }
    render () {
        if ( objMain.indexOf(this.props.selected) == -1 ) {
            let obj = this.props.selected;
            objMain.push(obj);
            this.title = this.props.selected.text;
            this.state.updated = false;
        }
        
        return (<div className="col-md-9 border-left col-sm-9 col-xs-7">
            <div className="col-md-12 npr pt-lg">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="pull-right">
                        <button type="button" className="btn btn-default">
                            <span className="glyphicon glyphicon-plus mr"></span><span>Add Note</span>
                        </button>
                    </div>
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <form onSubmit={this._onSubmit} ref='form'>
                        <div className="form-group">
                            <label >Title : </label>
                            {
                                this.state.updated ? <input type='text' ref='text' className="form-control"/>
                            :   <input type='text' ref='text' className="form-control" value={this.title} onChange={(title,v)=>this.handleChange(title,v)}/>
                            }
                        </div>
                        <div className="form-group">
                            <label >Body : </label>
                            {
                                this.state.updated ? <textarea type="text" className="form-control" ref="body" rows="20"></textarea>
                                : <textarea type="text" className="form-control" ref="body" rows="20" onKeyPress={(title,v)=>this.handleChange(title,v)} value={this.body}></textarea>
                            }
                        </div>
                        <div className="pull-right"><input type='submit' value='Save' className="btn btn-primary"/></div>
                    </form>
                </div>
            </div>
        </div>);
    }
    _onSubmit (e) {
            e.preventDefault();
            var text = this.refs.text.value;
            var body = this.refs.body.value;
            this.props.addTodo(text,body);
            this.refs.form.reset();
        }
}