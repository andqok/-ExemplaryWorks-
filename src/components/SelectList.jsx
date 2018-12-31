import React from 'react'

class SelectList extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let { langs } = this.props
        return <div>
        { langs.map((lang, keyIndex) => {
            return <div key={keyIndex}>
                <input type="checkbox"
                       id={`input-${lang}`}
                       onChange={this.props.inputChange}></input>
                <label htmlFor={`input-${lang}`}>{lang}</label>
                <span id={`count-${lang}`}></span>
            </div>
        }) }
    </div>
    }
}

export default SelectList
