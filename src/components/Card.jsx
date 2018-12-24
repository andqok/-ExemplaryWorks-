import React from 'react'
import CardSentenceItem from './CardSentenceItem.jsx'

export default class Card extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        let { sentences } = this.props
        return <div>
            { sentences.map((one, keyIndex) => {
                let { lang, sentence } = one

                return <CardSentenceItem
                    lang={lang}
                    key={keyIndex}
                    sentence={sentence}/>
            }) }
        </div>
    }
}
