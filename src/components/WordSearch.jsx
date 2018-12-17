import React, {Component} from 'react';
//import {time} from '../../../Util/util-time.js'

export default class WordInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        let { title } = this.props
        return <h1>{
            title
        }</h1>
    }
}
