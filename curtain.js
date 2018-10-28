const sentencesCount૦ = 10

document.addEventListener("DOMContentLoaded", function () {
    delete lang.dummy
    const words૪ = prepareWordObj()
    const word﹍ = getFrequentWord() // find a fairly frequent word
    render(words૪, word﹍)

    function getFrequentWord() {
        const randWord﹍ = rand.objectProperty(words૪)
        if (words૪[randWord﹍].length < sentencesCount૦) {
            return getFrequentWord()
        } else {
            return randWord﹍
        }
    }
})

function prepareWordObj() {
    // i: global object lang
    // o: object with keys being words 
    // and values being numbers of sentences which contain these words
    const words૪ = {}
    for (let key﹍ in lang) {
        let sentence﹍ = clearPunctuation(lang[key﹍]['s'].toLowerCase())
        let wordsΔ = sentence﹍.split(' ')
        wordsΔ.forEach(word﹍ => {
            if (!is.numberStr(word﹍)) {
                // skip words that are in fact numbers
                // e.g.: word﹍ may not be '6137', '1342.83'
                presetBranch(words૪, word﹍, [])
                words૪[word﹍].push(key﹍)
            }
        })
    }
    return words૪
}

function getSentenceArr(words૪, word﹍) {
    // array of *all* sentences which contain word
    const sentencesΔ = words૪[word﹍]
        .map(sentenceNum => lang[sentenceNum]['s'])

    // array of *selected amount* of sentences which contain word
    const selectedSentencesΔ = []
    for (let i = 0; i < sentencesCount૦; i += 1) {
        selectedSentencesΔ.push(
            rand.arrayEl.mutating(sentencesΔ))
    }
    return selectedSentencesΔ
}

function render(words૪, word﹍) {
    word﹍ = word﹍.toLowerCase()
    const column = dom.make('div', { class: 'results' })
    const columnFragment = document.createDocumentFragment()
    const sentencesΔ = getSentenceArr(words૪, word﹍)

    sentencesΔ.forEach(sentence﹍ => {
        const sentence = dom.make('div', {}, columnFragment)
        const wordΔ = sentence﹍.split(" ")

        for (let word﹍ of wordΔ) {
            const word_el = dom.make('a', { text: word﹍ }, sentence)
            word_el.addEventListener('click', function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement,
                    text = target.textContent || text.innerText;
                text = clearPunctuation(text)
                render(words૪, text)
            }, false)
            dom.make('span', { text: ' ' }, sentence)
        }
        column.appendChild(sentence)
    })
    //column.appendChild(columnFragment)
    id('wrap').appendChild(column)
    window.scrollBy(1000000, 0)
}

(function () {
    function scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        document.documentElement.scrollLeft -= (delta * 240); // Multiplied by 40
        document.body.scrollLeft -= (delta * 240); // Multiplied by 40
        e.preventDefault();
    }
    if (window.addEventListener) {
        // IE9, Chrome, Safari, Opera
        window.addEventListener("mousewheel", scrollHorizontally, false);
        // Firefox
        window.addEventListener("DOMMouseScroll", scrollHorizontally, false);
    } else {
        // IE 6/7/8
        window.attachEvent("onmousewheel", scrollHorizontally);
    }
})();
