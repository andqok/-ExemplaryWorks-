/**
 * 1. Generate separate csv files for each language of *langsSelected*
 * 2. Generate active.json
 *
 * @param {array} langsSelected
 * @param {function} refreshPercent
 * @reads csv/sentences.csv
 * @writes
 *     1. tmp/${lang}.csv --- difference from sentences.csv is that
 *     the middle column is absent, no need to specify language
 *
 *     2. tmp/active.json --- stringified object which maps
 *     sentence number and corresponding language
 * @returns undefined
 */

function step1(langsSelected, refreshPercent) {
    'use strict'
    const   fs = require('fs')
    const path = require('path')

    /**
     * *specialCounters* --- for each language count number of sentences
     * selected from sentences.csv */
    var specialCounters = {}
    langsSelected.forEach(lang =>
        specialCounters[lang] = 0
    )

    const sentencesPath = path.join(__dirname, '../csv/sentences.csv')
    const sentencesReader = require('readline').createInterface({
        input: require('fs').createReadStream(sentencesPath)
    })

    var writeStreams = {}
    langsSelected.forEach(lang => {
        let tmpPath = path.join(__dirname, `../tmp/${lang}.csv`)
        writeStreams[lang] = fs.createWriteStream(tmpPath)
    })

    var lineCountTotal = 0
    var active  = {}
    sentencesReader.on('line', (line) => {
        line = line.split("\t")
        let num = line[0]
        let lang = line[1]
        let sentence = line[2]

        if (langsSelected.includes(lang)) {
            writeStreams[lang].write(num + '\t' + sentence + '\r\n')
            active[line[0]] = line[1]
            specialCounters[lang] += 1
        }

        /** Once in a while, report progress to parent component */
        lineCountTotal += 1
        if (lineCountTotal % 50000 === 0) {
            let percent = Math.round(( lineCountTotal / 7400000) * 100)
            refreshPercent(
                percent,
                Object.assign({}, specialCounters)
            )
        }
    })

    sentencesReader.on('close', () => {
        let activePath = path.join(__dirname, '../tmp/active.json')
        fs.writeFile(activePath, JSON.stringify(active), (e) => { })

        setTimeout(function () {
            //step2()
        }, 1000)
    })
}
