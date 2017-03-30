import React from 'react'
import {EditableTimerList} from './EditableTimerlist.jsx'
import {ToggleableTimerForm} from './ToggleableTimerForm.jsx'
import helpers from '../js/helpers.js'

export class TimersDashboard extends React.Component{
	constructor(props)
	{
		super(props);
		this.state={timers: [
				{
					title: 'Practice squat',
					project: 'Gym Chores',
					id: 1,//uuid.v4(),
					elapsed: 5456099,
					runningSince: Date.now(),
				},
				{
					title: 'Bake squash',
					project: 'Kitchen Chores',
					id: 2,//uuid.v4(),
					elapsed: 1273998,
					runningSince: null,
				},
			]
		};
		this.handleCreateFormSubmit = this.handleCreateFormSubmit.bind(this);
		this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this);
		this.handleTrashClick = this.handleTrashClick.bind(this);
		this.handleStartClick = this.handleStartClick.bind(this);
		this.handleStopClick = this.handleStopClick.bind(this);

	}

	startTimer (timerId) {
		const now = Date.now();
		this.setState({
			timers: this.state.timers.map((timer) => {
				if (timer.id === timerId) {
					return Object.assign({}, timer, {
					runningSince: now,
					});
				}
				else
				{
					return timer;
				}
			}),
		});
	}

	stopTimer (timerId) {
		const now = Date.now();
		this.setState({
			timers: this.state.timers.map((timer) => {
				if (timer.id === timerId) {
					const lastElapsed = now - timer.runningSince;
					return Object.assign({}, timer, {
						elapsed: timer.elapsed + lastElapsed,
						runningSince: null,
					});
				}
				else
				{
					return timer;
				}
			}),
		});
	}


	handleTrashClick (timerId) {
		this.deleteTimer(timerId);
	}

	deleteTimer (timerId) {
		this.setState({
			timers: this.state.timers.filter(t => t.id !== timerId),
		});
	}

	handleCreateFormSubmit(timer) {
		this.createTimer(timer);
	}
	
	createTimer(timer) {
		const t = helpers.newTimer(timer);
		this.setState({
			timers: this.state.timers.concat(t),
		});
	}

	handleEditFormSubmit (attrs) {
		this.updateTimer(attrs);
	}

	updateTimer (attrs) {
		this.setState({
			timers: this.state.timers.map((timer) => {
				if (timer.id === attrs.id) {
					return Object.assign({}, timer, {
						title: attrs.title,
						project: attrs.project,
					});
				} 
				else
				{
					return timer;
				}
			}),
		});
	}

	handleStartClick (timerId) {
		this.startTimer(timerId);
	}

	handleStopClick (timerId) {
		this.stopTimer(timerId);
	}

	render(){

		return (
			<div className='ui three column centered grid'>
				<div className='column'>
					<EditableTimerList timers={this.state.timers}
					onFormSubmit={this.handleEditFormSubmit}
					onTrashClick={this.handleTrashClick}
					onStartClick={this.handleStartClick}
					onStopClick={this.handleStopClick}/>
					<ToggleableTimerForm
						onFormSubmit={this.handleCreateFormSubmit}
					/>
				</div>
			</div>
		);
	}
}