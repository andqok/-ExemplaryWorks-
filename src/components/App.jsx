import React, {Component} from 'react';
import WordSearch from './WordSearch.jsx'
import Card from './Card.jsx'
import TatoebaExplore from './TatoebaExplore.jsx'
import '../styles/App.css'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: []
        }
        this.addCards = this.addCards.bind(this)
    }
    /** mode - either 'new', 'add */
    addCards(arr, mode) {
        let newState = Object.assign(this.state)
        if (mode === 'new') {
            newState.cards = arr
        } else if (mode === 'add') {
            newState.cards = newState.cards.concat(arr)
        }
        this.setState(newState)
    }
    render () {
        let { cards } = this.state
        return <TatoebaExplore/>
        /*
        return <div className="App">
            <WordSearch addCards={this.addCards}/>
            <div>
                { cards.map((c, keyIndex) => {
                    return <Card
                                key={keyIndex}
                                sentences={c} />
                }) }
            </div>
        </div>*/
    }
}
