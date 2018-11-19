var langsDualSelect = function(i) {
    return `
div
    div
        input type=radio, name=group, value=${i}, id=id${i}
        label for=id${i}, text=${i}
    div
        input type=checkbox, value=${i}
        label text=${i}
`
}

var card = function(s, lang, num) {
return `
div
    div id=${num}
    img src=img/${lang}.png
    h3 text=${s}
`
}

function actionify(template, parent) {
    return {
        render: function() {
            return dom.render(template, parent)
        },
        rm: function() {
            dom.removeAllChildren(parent)
        }
    }
}
