import React from 'react'
import helpers from '../js/helpers.js'
import {TimerActionButton} from './TimerActionButton.jsx'

export class Timer extends React.Component{
	constructor(props){
		super(props);
		this.handleTrashClick=this.handleTrashClick.bind(this);
		this.handleStartClick=this.handleStartClick.bind(this);
		this.handleStopClick=this.handleStopClick.bind(this);
		
	}

	handleTrashClick () {
		this.props.onTrashClick(this.props.id);
	}

	componentDidMount () {
		this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
	}

	componentWillUnmount () {
		clearInterval(this.forceUpdateInterval);
	}

	handleStartClick () {
		this.props.onStartClick(this.props.id);
	}

	handleStopClick () {
		this.props.onStopClick(this.props.id);
	}

	render(){
		const elapsedString = helpers.renderElapsedString(
				this.props.elapsed, this.props.runningSince
			);
		return (
			<div className='ui centered card'>
				<div className='content'>
					<div className='header'>
						{this.props.title}
					</div>
					<div className='meta'>
						{this.props.project}
					</div>
					<div className='center aligned description'>
						<h2>
							{elapsedString}
						</h2>
					</div>
					<div className='extra content'>
						<span
							className='right floated edit icon'
							onClick={this.props.onEditClick}
							>
								<i className='edit icon'></i>
						</span>
						<span
							className='right floated trash icon'
							onClick={this.handleTrashClick}
						>
							<i className='trash icon'></i>
						</span>
					</div>
				</div>
				<div className='ui bottom attached blue basic button'>
					Start
				</div>
				<TimerActionButton
					timerIsRunning={!!this.props.runningSince}
					onStartClick={this.handleStartClick}
					onStopClick={this.handleStopClick}
				/>
			</div>
		);
	}
}