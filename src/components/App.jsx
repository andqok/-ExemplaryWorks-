import React, {Component} from 'react';
import WordSearch from './WordSearch.jsx'
import Card from './Card.jsx'
import '../styles/App.css'

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
        console.log(newState)
        this.setState(newState)
    }
    render () {
        let { cards } = this.state

        return <div className="App">
            <WordSearch addCards={this.addCards}/>
            <div>
                { cards.map((c, keyIndex) => {
                    return <Card
                                key={keyIndex}
                                sentences={c} />
                }) }
            </div>
        </div>
    }
}
