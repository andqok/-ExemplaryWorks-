/**
 * Now working with links:
 */
// Skim through links.csv
// i: tmp/active.json
//    csv/links.csv
// o: tmp/links.json

function step2() {
    'use strict'
    const   fs = require('fs')
    const path = require('path')

    const activePath = path.join(__dirname, '../tmp/active.json')
    const active = readFileObject(activePath)

    const linksPath = path.join(__dirname, '../csv/links.csv')
    const linksCsvReader = require('readline').createInterface({
        input: require('fs').createReadStream(linksPath)
    })

    const outputPath = path.join(__dirname, '../tmp/links.json')
    let output = fs.createWriteStream(outputPath)
    output.write('{')

    var currentIndex = 1
    var linesGroup = []

    linksCsvReader.on('line', line => {

        line = line.split("\t")
        let index1 = +line[0]
        let index2 = +line[1]

        /**
         * Form a group (linesGroup) of corresponding sentence numbers:
         * left column (index1) is always the same,
         * index2 are this sentence in different languages */
        if (active[ index1 ] && active[ index2 ]) {
            /** If this sentence pair corresponds to current sentence */
            if (index1 === currentIndex) {
                linesGroup.push([index1, index2])
            }
            /** When sentence group is formed */
            if (index1 > currentIndex) {
                processGroup()
                linesGroup = [ [index1, index2] ]
                currentIndex = index1
            }
        }


    })

    linksCsvReader.on('close', () => {
        output.write('"dummy": {}}')
        setTimeout(function () {
            step3()
        }, 1000)
    })

    function processGroup() {
        var result = {}
        for (let line of linesGroup) {
            var index1 = [line[0]]
            var index2 = line[1]
            if (active[index2]) {
                result[active[index2]] = index2
            }
        }
        result = JSON.stringify(result)
        output.write('"' + index1 + '":')
        output.write(result + ',\n')
    }

    /**
     * @param  {string} filePath
     * @returns {object} parsedFile
     */
    function readFileObject (filePath) {
        let readFile = fs.readFileSync(filePath, 'utf8')
        let parsedFile = JSON.parse(readFile)
        return parsedFile
    }
}
