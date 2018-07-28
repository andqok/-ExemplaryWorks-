const fs = require('fs')
const util = {
    readFile: (filename) => {
        let   readFile = fs.readFileSync(filename, 'utf8')
        let parsedFile = JSON.parse(readFile)
        return parsedFile
    },
    removePunctuation: (word) => {
        word = word.replace(/[,.?!:;()¿¡"«»\\%]/g, "")
        word = word.replace(/\`/g, "\'")
        return word
    },
    percent: (arg1, arg2) => {
        return Math.floor((arg1 / arg2) * 100)
    },
    time: (time, startTime) => {
      if (!time) {
        time = new Date()
      }
      let hours   = addZero(time.getHours())
      let minutes = addZero(time.getMinutes())
      let seconds = addZero(time.getSeconds())
      return `${hours}:${minutes}:${seconds}`

      function addZero(a) {
        if (a <= 9) {
          return '0' + a
        } else {
          return a
        }
      }
    }
}

var langs = util.readFile('0 - langs.js')
var ex = []
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//combination('eng', 'lat') // for just one language combination
allCombinations(langs)    // for all language combinations
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function combination (firstlang, otherlang) {
    console.log(firstlang + otherlang + '  ' + util.time())
    words(firstlang, otherlang, 1)
    words(otherlang, firstlang, 2)
    //console.log(firstlang + otherlang + '  ' + util.time())
}

function allCombinations(langs) {
    const firstlang = langs.shift()

    if (langs.length > 0) {
        for (const otherlang of langs) {
            combination(firstlang, otherlang)
        }
        allCombinations(langs)
    } else {
        return false
    }
}

function words(lang, otherlang, num) {

    var active = util.readFile(`tmp/garbage-${lang}.json`)
    var length = Object.keys(active).length
    var sentence, words
    var corpus = ''
    var tree      = {}
    var words     = {}
    var mostused  = {}
    var count     = 0
    var exceptins = 0
    var delCount  = 0
    
    for (let key in active) {
        count += 1

        if ( !active[key]['o'] || 
             (active[key]['o'] && !active[key]['o'][otherlang] ) ) {
            delete active[key]
            delCount += 1
        } else {
            // delete references to other languages
            langs.forEach((lang) => {
                if (active[key]['o'] && lang != otherlang) {
                    delete active[key]['o'][lang]
                }
            })
            //console.log(util.time(new Date()) + '  ' + util.percent(count, length) + '%')
            sentence = active[key]['s']
            corpus += sentence + ' '
            processWords(words, tree, sentence.split(" "), key)
        }
    }
    var resultLen = Object.keys(words).length
    var resultCount = 0

    for (let key in words) {
        resultCount += 1
        //console.log(` ${util.time(new Date())}  ${lang
        //           }  key: ${resultCount}  of ${resultLen}`)
        let obj = words[key]
        if (obj.length > 23) {
            if (mostused[obj.length]) {
                mostused[obj.length].push(key)
            } else {
                mostused[obj.length] = [key]
            }
        }
    }

    

    active['-words']    = words
    active['-mostused'] = mostused
    active['-tree']     = tree
    active['-lang']     = lang
    fs.writeFileSync(`res/${lang}${otherlang}.js`, 
                     `var lang${num} = ${JSON.stringify(active, null, 2)}`)
}

function processWords(words, tree, wordsArr, key) {

   for (let word of wordsArr) {
       if (typeof word === 'string') {
           word = word.toLowerCase()
           word = util.removePunctuation(word)
           makeTree(tree, word)
           makeWords(words, word, key)
       } else {
          ex.push(word)
       }
   } 
}


function makeWords(words, word, key) {
    if (words[word]) {
        try {
            words[word].push(key)
        } catch (e) {
            console.log(typeof words[word])
            console.log(JSON.stringify(words) + ' error ' + e)
            ex.push(words[word])
            //exceptins += 1
        }
    } else {
        words[word] = [key]
    }
}

function makeTree(address, word) {
    let wordArr = word.split('')
    let char = wordArr.shift()
    let newWord = wordArr.join('')
    if (char != null) {
      if (!address[char]) {
        address[char] = {}
        if (wordArr.length === 0) {
          address[char]['end?'] = 'possible...'
        }
      }
      makeTree(address[char], newWord)
    } else {
      return false
    }
}
