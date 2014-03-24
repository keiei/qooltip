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
 *                background: #000;
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
 *    2) minify this file and add to your site
 *    3) add data-qooltip="Lorem ipsum" to any element
 *    4) deal with it
 *
 * Example:
 *     <a href="#" data-qooltip="Only 1.14KB <em>minified</em>">Download</a>
 *
 */
(function (window, document)
{
    'use strict';

    var winWidth,
        winHeight,
        tipTriggers,
        tipTriggerDelegates,
        tip = document.createElement('div'),
        tipWidth,
        tipHeight,
        tipOffsetX = 20, // Margin between tooltip and cursor
        tipOffsetY = 5,  //
        mouseX, // Mouse coordinates
        mouseY, //
        mouseEvents = ['mouseover', 'mousemove', 'mousedown', 'mouseout'],
        mouseEvent,
        eventTarget = document.attachEvent ? 'srcElement' : 'target';

    addEventListener(document, 'DOMContentLoaded', function()
    {
        var i, j;

        tip.id = 'qooltip';
        document.body.appendChild(tip);

        tipTriggerDelegates = document.querySelectorAll('[data-qooltip-delegate]');
        i = tipTriggerDelegates.length;

        while(i--) {
            j = 4; // 4 mouse events
            while(j--) {
                addEventListener(tipTriggerDelegates[i], mouseEvents[j], handleEvent);
            }
        }

        tipTriggers = document.querySelectorAll('[data-qooltip]');
        i = tipTriggers.length;

        while(i--) {
            j = 4; // 4 mouse events
            while(j--) {
                addEventListener(tipTriggers[i], mouseEvents[j], handleEvent);
            }
        }
    });

    /**
     * Handles all mouse events
     *
     * @param  {obj} e Event object
     */
    function handleEvent(e)
    {
        mouseEvent = e.type;

        // Bail early if not qooltip element/trigger
        // This is needed for delegated events
        if ( ! e[eventTarget].attributes['data-qooltip']) {
            return;
        }

        if (mouseEvent === 'mouseover') {
            // Stop bubbling so elements inside
            // other elements can have tooltip
            if(e.stopPropagation) {
                e.stopPropagation();
            } else {
                e.returnValue = false;
            }

            // Populate tooltip with some content
            tip.innerHTML = e[eventTarget].getAttribute('data-qooltip');

            // Get width and height of tooltip
            tipWidth = tip.offsetWidth;
            tipHeight = tip.offsetHeight;

            // Get width and height of window
            winWidth = document.documentElement.clientWidth;
            winHeight = document.documentElement.clientHeight;
        } else if (mouseEvent === 'mousemove') {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Set default position
            tip.style.top = mouseY + tipOffsetY + 'px';
            tip.style.left = mouseX + tipOffsetX + 'px';

            // Check if tooltip is not going out of the horizontal window bonds
            if ((mouseX + tipWidth + tipOffsetX) > winWidth) {
                // - 6 so offset looks as same as on the right side (Mac Chrome 33.0.1750.152)
                tip.style.left = mouseX - tipWidth - (tipOffsetX - 6) + 'px';
            }

            // Check if tooltip is not going out of the vertical window bonds
            if ((mouseY + tipHeight + tipOffsetY) > winHeight) {
                tip.style.top = mouseY - tipHeight - tipOffsetY + 'px';
            }

            // Sometimes when mouse is moved slowly out of the window mouseout event
            // doesn't fire so we have to manually hide the tooltip (Mac Chrome 33.0.1750.152)
            if (mouseY < 1 || mouseY > winHeight || mouseX < 1 || mouseX > winWidth) {
                tip.style.top = '-99%';
            }
        } else if (mouseEvent === 'mousedown' || 'mouseout') {
            tip.style.top = '-99%';
        }
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
        if (el.addEventListener) {
            el.addEventListener(eventName, handler);
        } else {
            if (eventName === 'DOMContentLoaded') {
                document.attachEvent('onreadystatechange', function()
                {
                    if (document.readyState === 'complete') {
                        handler();
                    }
                });
            } else {
                el.attachEvent('on' + eventName, handler);
            }
        }
    }
})(this, this.document);
