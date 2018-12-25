import React from 'react'

export default class TatoebaExplore extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            langs: ["fra", "ukr", "spa", "por", "eng", "pol", "ita", "ces", "lat", "tur"],
            selectedLangs: []
        }
        this.inputChange = this.inputChange.bind(this)
    }
    inputChange(e) {
        console.log(e.target.id)
    }
    render() {
        let { langs, selectedLangs } = this.state
        return <div>
            { langs.map((lang, keyIndex) => {
                return <div key={keyIndex}>
                    <input type="checkbox"
                           id={`input-${lang}`}
                           onChange={this.inputChange}></input>
                    <label htmlFor={`input-${lang}`}>{lang}</label>
                    <span id={`count-${lang}`}></span>
                </div>
            }) }
        </div>
    }
}
