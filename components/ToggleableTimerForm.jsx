import React from 'react'
import {TimerForm} from './TimerForm.jsx'

export class ToggleableTimerForm extends React.Component{
	constructor(props){
		super(props);
		this.handleFormOpen = this.handleFormOpen.bind(this);
		this.handleFormClose = this.handleFormClose.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.state={isOpen: false};
	}

	handleFormOpen() {
		this.setState({ isOpen: true });
	}

	handleFormClose() {
		this.setState({ isOpen: false });
	}

	handleFormSubmit(timer) {
		this.props.onFormSubmit(timer);
		this.setState({ isOpen: false });
	}

	render(){
		if (this.state.isOpen) 
		{
			return (
				<TimerForm
					onFormSubmit={this.handleFormSubmit}
					onFormClose={this.handleFormClose}
				/>
			);
		}
		else
		{
			return (
				<div className='ui basic content center aligned segment'>
					<button className='ui basic button icon'
						onClick={this.handleFormOpen}>
						<i className='plus icon'></i>
					</button>
				</div>
			);
		}
	}
}