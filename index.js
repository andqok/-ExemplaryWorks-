const fs = require('fs')

//click('.switch', e => {
//    alert('good')
//})
//getLang('eng')

let checked = {}
let langsAvailable = getLangsAvailable()
for (let lang of langsAvailable) {
    dom.render(a(lang), query('.langs')).addEventListener('click', e => {
        console.log('good')
        checked.first = queryArr('input[type=radio]:checked')[0].value
    })
}
id('words').addEventListener('click', e => {
    loadLang(checked.first)
})

id('form').addEventListener('submit', e => {
    e.preventDefault()
    let text = query('.submissionfield').value
    all(text)
    //let forms = lemmatizedEng[text]
    //let allForms = [text]
    //if (is.array(forms)) {
    //    allForms = allForms.concat(forms)
    //} else {
    //    allForms.push(forms)
    //}
    //console.log(allForms)
    //let sentences = []
    //for (let word of allForms) {
    //    console.log(word)
    //    console.log(wordseng['-words'][word])
    //}
})

function findSentences(arr, lang, lvl) {
    lvl = lvl || 0
    var a = []
    fs.readdirSync('./language/')
        .filter(str => str.includes(lang))
        .map(el => {
            return el.slice(0, el.length - 5).slice(4, 99)
        }).forEach(el => {
            a.push(+el)
        })
    a = a.sort((x, y) => x - y)
    let result = []
    arr.forEach(el => {
        result.push( processOne(el) )
    })
    return result
    
    function processOne(newNum) {
        let b = Array.from(a)
        b.push(newNum)
        b.sort((x, y) => x - y)
        b = b.indexOf(newNum)
        let index = a[b - 1]
        let readFile = fs.readFileSync(`language/${lang}-${index}.json`, 'utf8')
        let parsed = readFile.split('\r\n')
        let res
        for (let i = 0; i < parsed.length; i += 1) {
            let line = parsed[i]
            if (res == null && line.includes(newNum)) {
                res = {
                    s: line.match(/"s":"(.*)",/)[1],
                    o: JSON.parse(line.match(/"o":(.*)},/)[1])
                    }
                
            }
        }
        return res
    }
}

function loadLang(lang) {
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

function all(word) {
    console.log(word)
    let arr = wordseng['-words'][word.toLowerCase()]
    let resArr = getNeighboring( findSentences(arr, 'eng') )
    //resArr.forEach(i => {
    //    console.log(i)
    //})
    console.log(resArr)
}

function getNeighboring(arr) {
    return arr.map(el => {
        Object.keys(el.o).forEach(lang => {
            let num = el.o[lang]
            el.o[lang] = findSentences([num], lang)[0]['s']
        })
        return el
    })
}

//console.log(
//    findSentence(390298, 'fra')
//)
