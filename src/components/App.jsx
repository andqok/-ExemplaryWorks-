import React, {Component} from 'react';
import WordSearch from './WordSearch.jsx'
import Card from './Card.jsx'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: []
        }
        this.addCards = this.addCards.bind(this)
    }
    addCards(arr) {
        let newState = Object.assign(this.state)
        newState.cards = arr
        this.setState(newState)
    }
    render () {
        let { cards } = this.state

        return <div>
            <WordSearch addCards={this.addCards}/>
            <div>
                { cards.map(c => {
                    return <Card sentences={c} />
                }) }
            </div>
        </div>
    }
}
