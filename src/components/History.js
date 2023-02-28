import React, { Component } from 'react'
import '../styles/history.css'
import ClearHistoryButton from './ClearHistoryButton'
class History extends Component {
    render() {
        const { history, clearHistory, historyButtonState } = this.props
        if (history != null && history !== '' && Array.isArray(history) && history.length > 0) {
            return (
                <div>
                    <div className="history-container">
                        <div className="history-heading">History
                    </div>

                        <ClearHistoryButton clearHistory={clearHistory} historyButtonState={historyButtonState} />
                    </div>
                    <div className="history-wrapper">
                        <ul className="history-list">
                            {
                                history.map((el, index) => <li className="list-item" key={index}><div className="equation-item">{el.equation}</div><div className="output-item"> = {el.output}</div></li>)
                            }
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="warning">History is Empty</div>
            )
        }
    }
}

export default History
