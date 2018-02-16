import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment } from '../../reducers/counter'

@connect((state) => {
	return {
		count: state.counter.count
	};
},{
	increment
})
  
export default class App extends Component{

	constructor(){
    	super();
	}
	
	componentDidMount = () => {
		setTimeout(() => {
			this.incrementTime();
		}, 2000)
	}

	incrementTime = () => {
		console.log("here");
		const { increment } = this.props;
		increment();
	}

	render = () => {
		const { count, increment } = this.props;

		console.log(count)
		return (
			<div className="container text-center">
				<div>COUNT: {count}</div>
				
				{this.props.children}
			</div>
		);
	}
};

App.defaultProps = {

};
