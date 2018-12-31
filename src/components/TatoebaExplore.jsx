import React from 'react'
import SelectList from './SelectList.jsx'

export default class TatoebaExplore extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            langs: ["fra", "ukr", "spa", "por", "eng", "pol", "ita", "ces", "lat", "tur"],
            selectedLangs: []
        }
        this.inputChange = this.inputChange.bind(this)
        this.submit = this.submit.bind(this)
    }
    inputChange(e) {
        let selectedLang = e.target.id.slice(-3)
        this.setState(
            Object.assign({}, this.state, {
                selectedLangs: this.state.selectedLangs.concat(selectedLang)
             })
        )
        console.log(this.state.selectedLangs)
    }
    submit() {
        step1(this.state.selectedLangs, (percent, specialCounters) => {
            console.log(percent, specialCounters)
        })
    }

    render() {
        return <div>
            <SelectList
                langs={this.state.langs}
                inputChange={this.inputChange}/>
            <button onClick={this.submit}>Submit</button>
        </div>
    }
}
