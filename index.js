const fs = require('fs')

//click('.switch', e => {
//    alert('good')
//})
//getLang('eng')

let checked = {
    second: []
}
let langsAvailable = getLangsAvailable()
for (let lang of langsAvailable) {
    //let langsSelect = actionify( langsDualSelect(lang), query('.langs') )
    dom.render(langsDualSelect(lang), query('.langs')).addEventListener('click', e => {
        console.log('good')
        checked.first = queryArr('input[type=radio]:checked')[0].value
        checked.second = queryArr('input[type=checkbox]:checked').map(val => {
            return val.value
        })
    })
}
id('words').addEventListener('click', e => {
    loadLang(checked.first)
})

id('form').addEventListener('submit', e => {
    e.preventDefault()
    dom.removeAllChildren(query('.autocomplete'))
    let text = query('.submissionfield').value
    let res = all(text)
    let res2 = res.filter(el => {
        let otherLangs = Object.keys(el.o)
        let res
        otherLangs.forEach(lang => {
            if (checked.second.includes(lang)) {
                    res = el
            }
        })
        if (res) {
            return res
        }
    })
    console.log(res)
    console.log(res2)
    res2.forEach(s => {
        let toRender = {
            el: 'div.card',
            ch: [ dom.decode(card(s.s, 'eng', 1)) ]
        }
        for (let lang in s.o) {
            let sentences = findSentences( [s.o[lang] ], lang )
            if (sentences) {
                let theSentence = sentences[0].s
                toRender.ch.push( dom.decode( card(theSentence, lang)) )
            }
        }
        console.log(toRender)
        dom.render(toRender, id('autocomplete'))
    })
    //    }
    //}, 100)
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

function findSentences(arr, lang) {
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
        let included = false
        if (!b.includes(newNum)) {
            b.push(newNum)
        } else {
            included = true
        }
        b.sort((x, y) => x - y)
        b = b.indexOf(newNum)
        let index
        if (!included) {
            index = a[b - 1]
        } else {
            index = a[b]
        }
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
    let resArr = findSentences(arr, 'eng')
    return resArr
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
