import React from 'react'

export default class Card extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        let { lang, text } = this.props
        return <div>
            <img src={ `img/${lang}.png` }></img>
            <p>{text}</p>
        </div>
    }
}
