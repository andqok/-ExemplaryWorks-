import React from 'react'

export default class Card extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        let { lang, sentence } = this.props
        return <div >
            <img src={ `../resources/img/${lang}.png` }></img>
            <p>{sentence}</p>
        </div>
    }
}
