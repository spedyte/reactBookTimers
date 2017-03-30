import React from 'react'

export class TimerActionButton extends React.Component{
	constructor(props){
		super(props);
	}
	
	render () {
		if (this.props.timerIsRunning) {
			return (
				<div
					className='ui bottom attached red basic button'
					onClick={this.props.onStopClick}
				>
					Stop
				</div>
			);
		} 
		else
		{
			return (
				<div
					className='ui bottom attached green basic button'
					onClick={this.props.onStartClick}
				>
					Start
				</div>
			);
		}
	}
}