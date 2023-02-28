import React from 'react';
import History from './History'
import ScreenWrapper from './screenWrapper'
import Keypad from './keypad';
class Calculator extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            equation: '',
            output: 0,
            history: [],
            historyButtonState: false
        }
    }
    componentDidMount() {
        const history = localStorage.getItem('history')
        if (history !== null && history !== '') {
            this.setState({ 'history': JSON.parse(history), historyButtonState: true })
        }
    }

    onButtonPress = event => {
        let equation = this.state.equation;
        const pressedButton = event.target.innerHTML;
        if (pressedButton === 'C') return this.clear();
        else if ((pressedButton >= '0' && pressedButton <= '9') || pressedButton === '.') {
            equation += pressedButton;
            this.setState({ equation: equation });
        }
        else if (['+', '-', '*', '/', '%'].indexOf(pressedButton) !== -1) {
            equation += ' ' + pressedButton + ' ';
            this.setState({ equation: equation });
        }
        else if (pressedButton === '=') {
            try {
                const evalResult = Function('"use strict";return (' + equation + ')')();
                const output = Number.isInteger(evalResult) ? evalResult : evalResult.toFixed(2);
                this.setState({ output });
                this.setState({ equation: equation });
            } catch (error) {
                this.setState({ equation: '' });
                alert('Invalid Mathematical Expression');
            }
        }
        else {
            equation = equation.trim();
            equation = equation.substr(0, equation.length - 1);
            this.setState({ equation: equation });
        }
    }

    clearHistory = () => {
        localStorage.setItem('history', [])
        this.setState({ equation: '', output: 0, history: [], historyButtonState: false });
    }

    clear() {
        let history = localStorage.getItem('history');
        if (history === null || history === '') {
            history = [{
                equation: this.state.equation,
                output: this.state.output
            }]
            localStorage.setItem('history', JSON.stringify(history))
            this.setState({
                equation: '', output: 0,
                history: history,
                historyButtonState: true
            })
        }
        else if (this.state.output !== 0 && this.state.equation !== '') {
            history = JSON.parse(history)
            history.unshift({
                equation: this.state.equation,
                output: this.state.output
            })
            localStorage.setItem('history', JSON.stringify(history))
            this.setState({ equation: '', output: 0, history: history });
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="row">
                    <div className="column">
                        <div className="title">Simple Calculator</div>
                        <div className="calculator">
                            <ScreenWrapper equation={this.state.equation} output={this.state.output} />
                            <Keypad onButtonPress={this.onButtonPress} />
                        </div>
                    </div>
                    <div className="column">
                        <History history={this.state.history} historyButtonState={this.state.historyButtonState} clearHistory={this.clearHistory} />
                    </div>
                </div>
            </div>
        )
    }
}
export default Calculator;