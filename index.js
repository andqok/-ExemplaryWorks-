const fs = require('fs')

click('.switch', e => {
    alert('good')
})

function findSentence(newNum, lang) {
    var a = []
    fs.readdirSync('./language/')
        .filter(str => str.includes(lang))
        .map(el => {
            return el.slice(0, el.length - 5).slice(4, 99)
        }).forEach(el => {
            a.push(+el)
        })
    a = a.sort((x, y) => x - y)
    let b = Array.from(a)
    b.push(newNum)
    b.sort((x, y) => x - y)
    b = b.indexOf(newNum)
    let index = a[b - 1]
    var lines = require('readline').createInterface({
        input: require('fs').createReadStream(`language/${lang}-` + index + '.json')
    })
    lines.on('line', line => {
        if (line.includes(newNum + '')) {
            console.log(line)
            return line
        }
    })
}

function getLang(lang) {
    let scr = document.createElement('script')
    scr.src = 'language/' + lang + '.js'
    document.body.appendChild(scr)
}

function getLangsAvailable() {
    return Array.from(
                new Set(
                    fs.readdirSync('./language/')
                     .map(fName => fName.slice(0, 3))
                )
    )
}
