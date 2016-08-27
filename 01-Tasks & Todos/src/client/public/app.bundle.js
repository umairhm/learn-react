webpackJsonp([0],{

/***/ 0:
/*!**********************************!*\
  !*** ./src/client/app/index.jsx ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 34);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _styles = __webpack_require__(/*! ./styles.css */ 172);
	
	var _styles2 = _interopRequireDefault(_styles);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TodoList = _react2.default.createClass({
	    displayName: 'TodoList',
	
	    render: function render() {
	        return _react2.default.createElement(
	            'ul',
	            null,
	            this.props.items.map(function (item) {
	                return _react2.default.createElement(
	                    'li',
	                    { key: item.id },
	                    item.text
	                );
	            })
	        );
	    }
	});
	
	var TodoForm = _react2.default.createClass({
	    displayName: 'TodoForm',
	
	    getInitialState: function getInitialState() {
	        return { item: '' };
	    },
	    handleSubmit: function handleSubmit(e) {
	        e.preventDefault();
	        this.props.onFormSubmit(this.state.item);
	        this.setState({ item: '' });
	        _reactDom2.default.findDOMNode(this.refs.item).focus();
	        return;
	    },
	    onChange: function onChange(e) {
	        this.setState({
	            item: e.target.value
	        });
	    },
	    render: function render() {
	        return _react2.default.createElement(
	            'form',
	            { role: 'form', onSubmit: this.handleSubmit },
	            _react2.default.createElement('input', { type: 'text', ref: 'item', onChange: this.onChange, value: this.state.item, className: 'form-control todo', placeholder: 'Enter what you need to be reminded for' }),
	            _react2.default.createElement('input', { type: 'submit', className: 'btn btn-primary', value: 'Add' })
	        );
	    }
	});
	
	var ToDoApp = _react2.default.createClass({
	    displayName: 'ToDoApp',
	
	    getInitialState: function getInitialState() {
	        return { items: [] };
	    },
	    componentDidMount: function componentDidMount() {
	        this.serverRequest = $.get("http://localhost:3000/todos", function (data) {
	            this.setState({
	                items: data
	            });
	        }.bind(this));
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        this.serverRequest.abort();
	    },
	    updateItems: function updateItems(newItem) {
	        var item = {
	            text: newItem,
	            completed: false
	        };
	        $.post("http://localhost:3000/todos", item, function (data) {
	            console.log('Item added');
	        });
	        var allItems = this.state.items.concat(item);
	        this.setState({
	            items: allItems
	        });
	    },
	    render: function render() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'container-fluid' },
	            _react2.default.createElement(
	                'div',
	                { className: 'row' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'col-xs-12 bg-primary text-center' },
	                    _react2.default.createElement(
	                        'a',
	                        { href: '#', className: 'pull-left todo-menu' },
	                        _react2.default.createElement(
	                            'h3',
	                            null,
	                            _react2.default.createElement('i', { className: 'fa fa-bars', 'aria-hidden': 'true' })
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'a',
	                        { href: '#', className: 'pull-right todo-add' },
	                        _react2.default.createElement(
	                            'h3',
	                            null,
	                            _react2.default.createElement('i', { className: 'fa fa-plus', 'aria-hidden': 'true' })
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'h3',
	                        null,
	                        'Tasks & Todos'
	                    )
	                )
	            ),
	            _react2.default.createElement(
	                'div',
	                { className: 'row' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'col-xs-12 text-center' },
	                    _react2.default.createElement(TodoForm, { onFormSubmit: this.updateItems })
	                )
	            ),
	            _react2.default.createElement(
	                'div',
	                { className: 'row' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'col-xs-12 col-md-6 col-md-offset-3' },
	                    _react2.default.createElement(TodoList, { items: this.state.items })
	                )
	            )
	        );
	    }
	});
	
	_reactDom2.default.render(_react2.default.createElement(ToDoApp, null), document.getElementById('app'));

/***/ },

/***/ 172:
/*!***********************************!*\
  !*** ./src/client/app/styles.css ***!
  \***********************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=app.bundle.js.map