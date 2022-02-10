// jshint multistr:true

(function (w, d) {
  'use strict'
  global.hljsInited = false

  var TABLE_NAME = 'hljs-ln'
  var LINE_NAME = 'hljs-ln-line'
  var CODE_BLOCK_NAME = 'hljs-ln-code'
  var NUMBERS_BLOCK_NAME = 'hljs-ln-numbers'
  var NUMBER_LINE_NAME = 'hljs-ln-n'
  var COVER_LINE_NAME = 'hljs-ln-cov'
  var NOT_COVER_LINE_NAME = 'hljs-ln-nocov'
  var COUNT_CLASS_NAME = 'count-class-name'
  var DATA_ATTR_NAME = 'data-line-number'
  var BREAK_LINE_REGEXP = /\r\n|\r|\n/g

  function initLn() {
    if (w.hljs) {
      global.hljsInited = true
      w.hljs.initLineNumbersOnLoad = initLineNumbersOnLoad
      w.hljs.lineNumbersBlock = lineNumbersBlock
      w.hljs.lineNumbersValue = lineNumbersValue
      w.hljs.lineNumbersInternal = lineNumbersInternal
      w.hljs.addLineNumbersBlockFor = addLineNumbersBlockFor
      addStyles()
    } else {
      w.console.error('highlight.js not detected!')
    }
  }

  global.initLn = initLn

  function isHljsLnCodeDescendant(domElt) {
    var curElt = domElt
    while (curElt) {
      if (curElt.className && curElt.className.indexOf('hljs-ln-code') !== -1) {
        return true
      }
      curElt = curElt.parentNode
    }
    return false
  }

  function getHljsLnTable(hljsLnDomElt) {
    var curElt = hljsLnDomElt
    while (curElt.nodeName !== 'TABLE') {
      curElt = curElt.parentNode
    }
    return curElt
  }

  // Function to workaround a copy issue with Microsoft Edge.
  // Due to hljs-ln wrapping the lines of code inside a <table> element,
  // itself wrapped inside a <pre> element, window.getSelection().toString()
  // does not contain any line breaks. So we need to get them back using the
  // rendered code in the DOM as reference.
  function edgeGetSelectedCodeLines(selection) {
    // current selected text without line breaks
    var selectionText = selection.toString()

    // get the <td> element wrapping the first line of selected code
    var tdAnchor = selection.anchorNode
    while (tdAnchor.nodeName !== 'TD') {
      tdAnchor = tdAnchor.parentNode
    }

    // get the <td> element wrapping the last line of selected code
    var tdFocus = selection.focusNode
    while (tdFocus.nodeName !== 'TD') {
      tdFocus = tdFocus.parentNode
    }

    // extract line numbers
    var firstLineNumber = parseInt(tdAnchor.dataset.lineNumber)
    var lastLineNumber = parseInt(tdFocus.dataset.lineNumber)

    // multi-lines copied case
    if (firstLineNumber != lastLineNumber) {
      var firstLineText = tdAnchor.textContent
      var lastLineText = tdFocus.textContent

      // if the selection was made backward, swap values
      if (firstLineNumber > lastLineNumber) {
        var tmp = firstLineNumber
        firstLineNumber = lastLineNumber
        lastLineNumber = tmp
        tmp = firstLineText
        firstLineText = lastLineText
        lastLineText = tmp
      }

      // discard not copied characters in first line
      while (selectionText.indexOf(firstLineText) !== 0) {
        firstLineText = firstLineText.slice(1)
      }

      // discard not copied characters in last line
      while (selectionText.lastIndexOf(lastLineText) === -1) {
        lastLineText = lastLineText.slice(0, -1)
      }

      // reconstruct and return the real copied text
      var selectedText = firstLineText
      var hljsLnTable = getHljsLnTable(tdAnchor)
      for (var i = firstLineNumber + 1; i < lastLineNumber; ++i) {
        var codeLineSel = format('.{0}[{1}="{2}"]', [CODE_BLOCK_NAME, DATA_ATTR_NAME, i])
        var codeLineElt = hljsLnTable.querySelector(codeLineSel)
        selectedText += '\n' + codeLineElt.textContent
      }
      selectedText += '\n' + lastLineText
      return selectedText
      // single copied line case
    } else {
      return selectionText
    }
  }

  // ensure consistent code copy/paste behavior across all browsers
  // (see https://github.com/wcoder/highlightjs-line-numbers.js/issues/51)
  document.addEventListener('copy', function (e) {
    // get current selection
    var selection = window.getSelection()
    // override behavior when one wants to copy line of codes
    if (isHljsLnCodeDescendant(selection.anchorNode)) {
      var selectionText
      // workaround an issue with Microsoft Edge as copied line breaks
      // are removed otherwise from the selection string
      if (window.navigator.userAgent.indexOf('Edge') !== -1) {
        selectionText = edgeGetSelectedCodeLines(selection)
      } else {
        // other browsers can directly use the selection string
        selectionText = selection.toString()
      }
      e.clipboardData.setData('text/plain', selectionText)
      e.preventDefault()
    }
  })

  function addStyles() {
    var css = d.createElement('style')
    css.type = 'text/css'
    css.innerHTML = format(
      '.{0}{border-collapse:collapse}' +
      '.{0} td{padding:0}' +
      '.{1}:before{content:attr({2})}',
      [
        TABLE_NAME,
        NUMBER_LINE_NAME,
        DATA_ATTR_NAME
      ])
    d.getElementsByTagName('head')[0].appendChild(css)
  }

  function initLineNumbersOnLoad(options) {
    if (d.readyState === 'interactive' || d.readyState === 'complete') {
      documentReady(options)
    } else {
      w.addEventListener('DOMContentLoaded', function () {
        documentReady(options)
      })
    }
  }

  function documentReady(options) {
    try {
      var blocks = d.querySelectorAll('code.hljs,code.nohighlight')

      for (var i in blocks) {
        if (blocks.hasOwnProperty(i)) {
          lineNumbersBlock(blocks[i], options)
        }
      }
    } catch (e) {
      w.console.error('LineNumbers error: ', e)
    }
  }

  function lineNumbersBlock(element, options) {
    if (typeof element !== 'object') return

    async (function () {
      element.innerHTML = lineNumbersInternal(element, options)
    })
  }

  function lineNumbersValue(value, options) {
    if (typeof value !== 'string') return

    var element = document.createElement('code')
    element.innerHTML = value

    return lineNumbersInternal(element, options)
  }

  function lineNumbersInternal(element, options) {
    // define options or set default
    options = options || {
      singleLine: false
    }

    // convert options
    var firstLineIndex = options.singleLine ? 0 : 1

    duplicateMultilineNodes(element)

    return addLineNumbersBlockFor(element.innerHTML, firstLineIndex)
  }

  function addLineNumbersBlockFor(inputHtml, firstLineIndex) {
    var lines = getLines(inputHtml)
    // if last line contains only carriage return remove it
    if (lines[lines.length - 1].trim() === '') {
      lines.pop()
    }

    if (lines.length > firstLineIndex) {
      var html = ''
      let arr = JSON.parse(localStorage.getItem('validLines'))
      let hitLines = JSON.parse(localStorage.getItem('hitLines'))
      for (var i = 0, l = lines.length; i < l; i++) {
        if (arr.includes((i + 1).toString()) && hitLines[i + 1] !== undefined) {
          html += format(
            '<tr>' +
            '<td class="{0} {1} {7}" {3}="{5}">' +
            '<span class="{2}" {3}="{5}"></span>' + '<span class="{8}">' + hitLines[i + 1] + '</span>' +
            '</td>' +
            '<td class="{0} {4} {7}" {3}="{5}">' +
            '{6}' +
            '</td>' +
            '</tr>',
            [
              LINE_NAME,
              NUMBERS_BLOCK_NAME,
              NUMBER_LINE_NAME,
              DATA_ATTR_NAME,
              CODE_BLOCK_NAME,
              i + 1,
              lines[i].length > 0 ? lines[i] : ' ',
              COVER_LINE_NAME,
              COUNT_CLASS_NAME
            ])
        } else if (arr.includes((i + 1).toString()) && hitLines[i + 1] === undefined) {
          html += format(
            '<tr>' +
            '<td class="{0} {1} {7}" {3}="{5}">' +
            '<span class="{2}" {3}="{5}"></span>' +
            '</td>' +
            '<td class="{0} {4} {7}" {3}="{5}">' +
            '{6}' +
            '</td>' +
            '</tr>',
            [
              LINE_NAME,
              NUMBERS_BLOCK_NAME,
              NUMBER_LINE_NAME,
              DATA_ATTR_NAME,
              CODE_BLOCK_NAME,
              i + 1,
              lines[i].length > 0 ? lines[i] : ' ',
              NOT_COVER_LINE_NAME
            ])
        } else {
          html += format(
            '<tr>' +
            '<td class="{0} {1}" {3}="{5}">' +
            '<div class="{2}" {3}="{5}"></div>' +
            '</td>' +
            '<td class="{0} {4}" {3}="{5}">' +
            '{6}' +
            '</td>' +
            '</tr>',
            [
              LINE_NAME,
              NUMBERS_BLOCK_NAME,
              NUMBER_LINE_NAME,
              DATA_ATTR_NAME,
              CODE_BLOCK_NAME,
              i + 1,
              lines[i].length > 0 ? lines[i] : ' '
            ])
        }
      }
      return format('<table class="{0}">{1}</table>', [TABLE_NAME, html])
    }
    return inputHtml
  }

  /**
   * Recursive method for fix multi-line elements implementation in highlight.js
   * Doing deep passage on child nodes.
   * @param {HTMLElement} element
   */
  function duplicateMultilineNodes(element) {
    var nodes = element.childNodes
    for (var node in nodes) {
      if (nodes.hasOwnProperty(node)) {
        var child = nodes[node]
        if (getLinesCount(child.textContent) > 0) {
          if (child.childNodes.length > 0) {
            duplicateMultilineNodes(child)
          } else {
            duplicateMultilineNode(child.parentNode)
          }
        }
      }
    }
  }

  /**
   * Method for fix multi-line elements implementation in highlight.js
   * @param {HTMLElement} element
   */
  function duplicateMultilineNode(element) {
    var className = element.className

    if (!/hljs-/.test(className)) return

    var lines = getLines(element.innerHTML)

    for (var i = 0, result = ''; i < lines.length; i++) {
      var lineText = lines[i].length > 0 ? lines[i] : ' '
      result += format('<span class="{0}">{1}</span>\n', [className, lineText])
    }

    element.innerHTML = result.trim()
  }

  function getLines(text) {
    if (text.length === 0) return []
    return text.split(BREAK_LINE_REGEXP)
  }

  function getLinesCount(text) {
    return (text.trim().match(BREAK_LINE_REGEXP) || []).length
  }

  function async (func) {
    w.setTimeout(func, 0)
  }

  /**
   * {@link https://wcoder.github.io/notes/string-format-for-string-formating-in-javascript}
   * @param {string} format
   * @param {array} args
   */
  function format(formatStr, args) {
    return formatStr.replace(/\{(\d+)\}/g, function (m, n) {
      return args[n] ? args[n] : m
    })
  }
}(window, document))