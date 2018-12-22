function findSentences(arr, lang) {
    'use strict'
    var fs = require('fs')
    const path = require('path')
    var dirPath = path.join( __dirname, '../data/' )

    var a = fs.readdirSync(dirPath)
        .filter(str => str.includes(lang))
        .map(el => {
            return el.slice(0, el.length - 5).slice(4, 99)
        }).reduce( (ar, el) => {
            return ar.concat(+el)
        }, []).sort((x, y) => x - y)

    return arr.map(el => {
        return processOne(el)
    })

    function processOne(newNum) {
        newNum = +newNum
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
        let readFile = fs.readFileSync(`${dirPath}${lang}-${index}.json`, 'utf8')
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
