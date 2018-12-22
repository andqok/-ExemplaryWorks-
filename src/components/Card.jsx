import React from 'react'

export default class Card extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        let { sentences } = this.props
        return <div>
            { sentences.map(one => {
                let { lang, text } = one

                return <CardSentenceItem
                    lang={lang}
                    text={text}/>
            }) }
        </div>
    }
}
