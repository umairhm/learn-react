import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.css';

var TodoList = React.createClass({
    render: function () {
        return <ul>
            {this.props.items.map(function (item) {
                return <li key={item.id}>{item.text}</li>;
            }) }
        </ul>;
    }
});

var TodoForm = React.createClass({
    getInitialState: function () {
        return { item: '' };
    },
    handleSubmit: function (e) {
        e.preventDefault();
        this.props.onFormSubmit(this.state.item);
        this.setState({ item: '' });
        ReactDOM.findDOMNode(this.refs.item).focus();
        return;
    },
    onChange: function (e) {
        this.setState({
            item: e.target.value
        });
    },
    render: function () {
        return (
            <form role="form" onSubmit={this.handleSubmit}>
                <input type='text' ref='item' onChange={this.onChange} value={this.state.item} className="form-control todo" placeholder="Enter what you need to be reminded for" />
                <input type='submit' className="btn btn-primary" value='Add'/>
            </form>
        );
    }
});

var ToDoApp = React.createClass({
    getInitialState: function () {
        return { items: [] };
    },
    componentDidMount: function () {
        this.serverRequest = $.get("http://localhost:3000/todos", function (data) {
            this.setState({
                items: data
            });
        }.bind(this));
    },
    componentWillUnmount: function () {
        this.serverRequest.abort();
    },
    updateItems: function (newItem) {
        var item = {
            text: newItem,
            completed: false
        };
        $.post("http://localhost:3000/todos", item, function(data){
            console.log('Item added');
        });
        var allItems = this.state.items.concat(item);
        this.setState({
            items: allItems
        });
    },
    render: function () {
        return <div className="container-fluid">
            <div className="row">
                <div className="col-xs-12 bg-primary text-center">
                    <a href="#" className="pull-left todo-menu">
                        <h3><i className="fa fa-bars" aria-hidden="true"></i></h3>
                    </a>
                    <a href="#" className="pull-right todo-add">
                        <h3><i className="fa fa-plus" aria-hidden="true"></i></h3>
                    </a>
                    <h3>Tasks &amp; Todos</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 text-center">
                    <TodoForm onFormSubmit={this.updateItems} />
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-md-6 col-md-offset-3">
                    <TodoList items={this.state.items}/>
                </div>
            </div>
        </div>;
    }
});

ReactDOM.render(<ToDoApp />, document.getElementById('app'));