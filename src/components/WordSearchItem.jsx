import React from 'react'

export default class WordSearchItem extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let { word, count } = this.props
        return <div onClick={(e) => this.props.onClick(e, word)}>
            <h1>{word}</h1>
            <h2>{count}</h2>
        </div>
    }
}
