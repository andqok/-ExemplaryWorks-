var a = function(i) {
    return `
div
    div
        input type:radio, name:group, value:${i}, id:id${i}
        label text:${i}, for:id${i}
    div
        input type:checkbox
        label text:${i}
`
}
