/*
 * Qooltip
 *
 * Minimal vanilla js tooltip with no options. Intended only for text,
 * but tags like <strong> and <em> can be used to highlight some words.
 *
 * Author: Kārlis Andersons
 * Demo: https://qarlis.github.io/qooltip
 * Source: https://github.com/qarlis/qooltip
 *
 * Usage:
 *     1) add this to your css file
 *
 *            #qooltip {
 *                background: #000; // IE8 fallback
 *                background: rgba(0, 0, 0, 0.8);
 *                border-radius: 4px;
 *                color: #fff;
 *                font: 12px/1 sans-serif;
 *                top: -99%;
 *                position: fixed;
 *                padding: 5px 10px;
 *                white-space: nowrap;
 *                z-index: 9999;
 *            }
 *
 *            Don't want to use css? Scroll down to js-styles.
 *
 *    2) minify this file and add to your site
 *    3) add data-qooltip="Lorem ipsum" to any element
 *    4) deal with it
 *
 * Example:
 *     <a href="#" data-qooltip="Only 968 KB <em>minified</em>">Download</a>
 *
 */
(function (window, document)
{
    'use strict';

    var winWidth,
        winHeight,
        addEventListenerString = 'addEventListener',                          // Save some bytes
        dataAttrNameString = 'data-qooltip',                                  //
        styleString = 'style',                                                //
        attachEventString = 'attachEvent',                                    //
        targetString = document[attachEventString] ? 'srcElement' : 'target', //
        attributesString = 'attributes',                                      //
        domContentLoadedString = 'DOMContentLoaded',                          //
        tip = document.createElement('div'),
        tipWidth,
        tipHeight,
        tipOffsetX = 20, // Margin between tooltip and cursor
        tipOffsetY = 5,  //
        mouseX, // Mouse coordinates (ex e.clientX)
        mouseY; //

    addEventListener(document, domContentLoadedString, function()
    {
        tip.id = 'qooltip';

        // js-styles
        // Uncomment these lines if you want to add style with js instead
        // tip[styleString].background = document[attachEventString] ? '#000' : 'rgba(0, 0, 0, 0.8)';
        // tip[styleString].borderRadius = '4px';
        // tip[styleString].color = '#fff';
        // tip[styleString].left = '-99%';
        // tip[styleString].font = '12px/1 sans-serif';
        // tip[styleString].position = 'fixed';
        // tip[styleString].padding = '5px 10px';
        // tip[styleString].whiteSpace = 'nowrap';
        // tip[styleString].zIndex = 9999;

        document.body.appendChild(tip);
    });

    addEventListener(document, 'mouseover', function(e)
    {
        if (e[targetString][attributesString][dataAttrNameString]) {
            mouseOverHandler(e);
        }
    });

    addEventListener(document, 'mousemove', function(e)
    {
        if (e[targetString][attributesString][dataAttrNameString]) {
            mouseMoveHandler(e);
        } else {
            hideTip();
        }
    });

    addEventListener(document, 'mousedown', hideTip);

    addEventListener(document, 'mouseout', hideTip);

    /**
     * Mouseover event handler for elements that have data-qooltip attribute
     *
     * @param {object} e event object
     */
    function mouseOverHandler(e)
    {
        // Stop bubbling so elements inside
        // other elements can have tooltip
        if(e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.returnValue = false;
        }

        // Populate tooltip with some content
        tip.innerHTML = e[targetString].getAttribute(dataAttrNameString);

        // Get width and height of tooltip
        tipWidth = tip.offsetWidth;
        tipHeight = tip.offsetHeight;

        // Get width and height of window
        winWidth = document.documentElement.clientWidth;
        winHeight = document.documentElement.clientHeight;
    }

    /**
     * Mousemove event handler for elements that have data-qooltip attribute
     *
     * @param {object} e event object
     */
    function mouseMoveHandler(e)
    {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Set default position
        tip[styleString].top = mouseY + tipOffsetY + 'px';
        tip[styleString].left = mouseX + tipOffsetX + 'px';

        // Check if tooltip is not going out of the horizontal window bonds
        if ((mouseX + tipWidth + tipOffsetX) > winWidth) {
            // - 6 so offset looks as same as on the right side (Mac Chrome 33.0.1750.152)
            tip[styleString].left = mouseX - tipWidth - (tipOffsetX - 6) + 'px';
        }

        // Check if tooltip is not going out of the vertical window bonds
        if ((mouseY + tipHeight + tipOffsetY) > winHeight) {
            tip[styleString].top = mouseY - tipHeight - tipOffsetY + 'px';
        }

        // Sometimes when mouse is moved slowly out of the window mouseout event
        // doesn't fire so we have to manually hide the tooltip (Mac Chrome 33.0.1750.152)
        if (mouseY < 1 || mouseY > winHeight || mouseX < 1 || mouseX > winWidth) {
            hideTip();
        }
    }

    /**
     * Hides tooltip by moving it out of the viewport
     */
    function hideTip()
    {
        tip[styleString].top = '-99%';
    }

    /**
     * Legacy wrapper for addEventListener
     *
     * @param {node} el
     * @param {string} eventName
     * @param {function} handler
     */
    function addEventListener(el, eventName, handler)
    {
        if (el[addEventListenerString]) {
            el[addEventListenerString](eventName, handler);
        } else {
            if (eventName === domContentLoadedString) {
                document[attachEventString]('onreadystatechange', function()
                {
                    if (document.readyState === 'complete') {
                        handler();
                    }
                });
            } else {
                el[attachEventString]('on' + eventName, handler);
            }
        }
    }
})(window, document);
