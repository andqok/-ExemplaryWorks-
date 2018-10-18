'use strict';

function id(el) {
    return document.getElementById(el)
}

function query(el) {
    return document.querySelector(el)
}

function clearPunctuation (word) {
    if (typeof word === 'string') {
        word = word.replace(/[\n,.?!:;()¿¡"«»\\%—–…]/g, "")
        // specific line - may not need this
        word = word.replace(/\`/g, "\'")
        return word
    } else {
        console.log('not a string ' + word)
    }
}

const is = { empty: {} }
is.array = function (smth) {
    return Array.isArray(smth)
}
is.numberStr = function (smth) {
    // true: '23423', '12.564'
    return !Number.isNaN(+smth)
}
is.emptyVar = function (smth) {
    // true: undefined and null
    // note: other falsy values (0, NaN, '', false)
    // make variable non-empty
    if (typeof smth == 'undefined') {
        return true
    }
    return false
}
is.empty.array = function (smth) {
    if (is.array(smth)) {
        return smth.length === 0
    } else {
        console.log('not array')
    }
}

const dom = {}
dom.getId = id
dom.getQuery = query
dom.setIfDefined = function (val, set, pt) {
    if (!is.emptyVar(val)) {
        set[pt] = val
    }
}
dom.make = function (tag, options, parent) {
    var element = document.createElement(tag);
    ['id', 'type', 'value', 'name', 'src'].forEach(el => {
      // if options includes some of these html attributes, 
      //   set them to the created object 
      dom.setIfDefined(options[el], element, el)
    })
    // special cases — name of attribute in options (and in html)
    //   doesn't correspond to the name of attribute in JS
    dom.setIfDefined(options["class"], element, 'className')
    dom.setIfDefined(options.for, element, 'htmlFor')
    if (options.text) {
      element.appendChild(document.createTextNode(options.text));
    }
    if (parent) {
      parent.appendChild(element)
    }
    return element
}

dom.render = function (scheme) {
    var element
    if (scheme.el) {
        element = dom.make(scheme.el[0], scheme.el[1])

        if (scheme.ch) {
            // just one child
            if (is.object(scheme.ch)) {
                element.appendChild(this.render(scheme.ch))
            }
            // multiple children
            if (is.array(scheme.ch)) {
                scheme.ch.forEach(child => {
                    element.appendChild(this.render(child))
                })
            }
        }
    }
    return element
}

const rand = { 
    arrayEl: {}
}
rand.arrayIndex = function (arr) {
    return Math.floor(Math.random() * arr.length)
}
rand.arrayEl.nonMutating = function (arr) {
  return arr[rand.arrayIndex(arr)]
}
rand.arrayEl.mutating = function randElCut(arr) {
  const index = rand.arrayIndex(arr)
  const out = arr[index]
  arr.splice(index, 1)
  return out
}
rand.objectProperty = function (obj) {
    return rand.arrayEl.nonMutating(Object.keys(obj))
}

function presetBranch(trunk, branch, value) {
    if (is.emptyVar(trunk[branch])) {
        trunk[branch] = value
    }
}

const time = {}
time.getAllYearDays = function (year) {
    const arr = []
    const start = new Date(year + '-01-01')
    const end = new Date(year + '-12-31')

    while (start <= end) {
        arr.push(new Date(start))
        start.setDate(start.getDate() + 1)
    }
    return arr
}
