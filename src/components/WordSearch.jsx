import React from 'react'
import { lemmatized } from '../../resources/english/lemmatized.js'
import WordSearchItem from './WordSearchItem.jsx'

export default class WordSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputVal: '',
            suggestions: []
        }
        this.onInputChange = this.onInputChange.bind(this)
        this.getCount = this.getCount.bind(this)
        this.clickItem = this.clickItem.bind(this)
    }
    keys = Object.keys(lemmatized)

    onInputChange(e) {
        let inputVal = e.target.value
        let newState = Object.assign(this.state)
        newState.inputVal = inputVal
        newState.suggestions = this.keys.filter(word => {
            if (inputVal.length > 1 &&  word.slice(0, inputVal.length ) === inputVal) {
                return true
            }
            return false
        })
        this.setState(newState)
    }
    getCount(i) {
        let arr = wordseng['-words'][i]
        let length = 0
        if (Array.isArray(arr)) {
            length = arr.length
        }
        return length
    }

    clickItem(e, word) {
        let sentences = findSentences(wordseng['-words'][word], 'eng')
        console.log(sentences)
        let news = sentences.map(i => {
            let arr = [{
                lang: 'eng',
                sentence: i.s
            }]
            Object.keys(i.o).forEach(lang => {
                arr.push({
                    lang: lang,
                    sentence: findSentences( [ i['o'][lang] ] , lang)[0].s
                })
            })
            return arr
        })
        this.props.addCards(news)
    }

    render() {
        return <div>
            <input onChange={this.onInputChange}
                   value={this.state.inputVal}></input>
            <ul>
                { this.state.suggestions.map((i, key) => {
                    return <WordSearchItem
                                key={key}
                                word={i}
                                count={ this.getCount(i) }
                                onClick={this.clickItem}/>
                }) }
            </ul>
        </div>
    }
}
