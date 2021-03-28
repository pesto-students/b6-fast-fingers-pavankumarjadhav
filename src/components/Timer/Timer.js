import React, { Component } from 'react';
import './Timer.css';

export default class Timer extends Component {

    state = {
        time: undefined,
        timer: undefined,
        minutes: undefined,
        seconds: undefined
    }

    interval = undefined;

    getMinutes(time) {
        return Math.floor( time/ 60);
    }

    getSeconds(time) {
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return seconds;
    }

    clearSetInterval() {
        if(this.interval) {
            clearInterval(this.interval);
        }
    }

    start() {
        this.clearSetInterval();
        this.interval = setInterval(() => {
            if(this.state.timer > 0) {
                const timer = this.state.timer - 1;
                const minutes = this.getMinutes(timer);
                const seconds = this.getSeconds(timer);
                this.setState({timer, minutes, seconds});
                this.props.postCurrentUserTime(this.props.time - this.state.timer);
                this.setCircleDashArray();
            } else {
                this.clearSetInterval();
                this.props.onTimeExpired();
            }
        }, 1000);
    }

    setCircleDashArray() {
        const circleDashArray = `${( ((this.state.timer) / this.props.time) * 283 ).toFixed(0)} 283`;
        if(document.getElementById('base-timer-path-remaining')) {
            document.getElementById('base-timer-path-remaining')
                    .setAttribute("stroke-dasharray", circleDashArray);
        }
    };

    componentDidMount() {
        const { time } = this.props;
        const minutes = this.getMinutes(time);
        const seconds = this.getSeconds(time);
        this.setState({time, timer: time, minutes, seconds});
        this.start();
    }

    componentDidUpdate() {
        if( this.state.time !== this.props.time ) {
            this.clearSetInterval();
            const minutes = this.getMinutes(this.props.time);
            const seconds = this.getSeconds(this.props.time);
            this.setState({time: this.props.time, timer: this.props.time, minutes, seconds});
            this.start();
            this.start();
        } 
    }
    

    componentWillUnmount() {
		this.clearSetInterval();
	}

    render() {
        const { minutes, seconds } = this.state;
        return (
            <div className="timer">
            <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g className="base-timer__circle">
                    <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                    <path
                        id="base-timer-path-remaining"
                        strokeDasharray="283"
                        className="base-timer__path-remaining"
                        d="
                        M 50, 50
                        m -45, 0
                        a 45,45 0 1,0 90,0
                        a 45,45 0 1,0 -90,0
                        "
                    ></path>
                </g>
            </svg>
            <span id="base-timer-label" className="base-timer__label">
                {minutes}:{seconds}
            </span>
        </div>
        )
    }
}
