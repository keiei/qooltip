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
 *     <a href="#" data-qooltip="Only 765 KB <em>minified</em>">Download</a>
 *
 */
(function (window, document)
{
    'use strict';

    var winWidth,
        winHeight,
        addEventListener = 'addEventListener', // Save some bytes
        dataAttrName = 'data-qooltip',         //
        style = 'style',                       //
        target = 'target',                     //
        attributes = 'attributes',             //
        tip = document.createElement('div'),
        tipWidth,
        tipHeight,
        tipOffsetX = 20, // Margin between tooltip and cursor
        tipOffsetY = 5,  //
        mouseX, // Mouse coordinates (ex e.clientX)
        mouseY; //

    document[addEventListener]('DOMContentLoaded', function()
    {
        tip.id = 'qooltip';

        // js-styles
        // Uncomment these lines if you want to add style with js instead
        // tip[style].background = 'rgba(0, 0, 0, 0.8)';
        // tip[style].borderRadius = '4px';
        // tip[style].color = '#fff';
        // tip[style].left = '-99%';
        // tip[style].font = '12px/1 sans-serif';
        // tip[style].position = 'fixed';
        // tip[style].padding = '5px 10px';
        // tip[style].whiteSpace = 'nowrap';
        // tip[style].zIndex = 9999;

        document.body.appendChild(tip);
    });

    document[addEventListener]('mouseover', function(e)
    {
        if (e[target][attributes][dataAttrName]) {
            mouseOverHandler(e);
        }
    });

    document[addEventListener]('mousemove', function(e)
    {
        if (e[target][attributes][dataAttrName]) {
            mouseMoveHandler(e);
        }
    });

    document[addEventListener]('mousedown', function(e)
    {
        // if (e[target][attributes][dataAttrName]) {
        //     hideTip();
        // }

        hideTip();
    });

    document[addEventListener]('mouseout', function(e)
    {
        // if (e[target][attributes][dataAttrName]) {
        //     hideTip();
        // }

        hideTip();
    });

    function mouseOverHandler(e)
    {
        // Stop bubbling so elements inside
        // other elements can have tooltip
        e.stopPropagation();

        // Populate tooltip with some content
        tip.innerHTML = e[target].getAttribute(dataAttrName);

        // Get width and height of tooltip
        tipWidth = tip.offsetWidth;
        tipHeight = tip.offsetHeight;

        // Get width and height of window
        winWidth = window.innerWidth;
        winHeight = window.innerHeight;
    }

    function mouseMoveHandler(e)
    {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Set default position
        tip[style].top = mouseY + tipOffsetY + 'px';
        tip[style].left = mouseX + tipOffsetX + 'px';

        // Check if tooltip is not going out of the horizontal window bonds
        if ((mouseX + tipWidth + tipOffsetX) > winWidth) {
            // - 6 so offset looks as same as on the right side (Mac Chrome 33.0.1750.152)
            tip[style].left = mouseX - tipWidth - (tipOffsetX - 6) + 'px';
        }

        // Check if tooltip is not going out of the vertical window bonds
        if ((mouseY + tipHeight + tipOffsetY) > winHeight) {
            tip[style].top = mouseY - tipHeight - tipOffsetY + 'px';
        }

        // Sometimes when mouse is moved slowly out of the window mouseout event
        // doesn't fire so we have to manually hide the tooltip (Mac Chrome 33.0.1750.152)
        if (mouseY < 1 || mouseY > winHeight || mouseX < 1 || mouseX > winWidth) {
            hideTip();
        }
    }

    function hideTip()
    {
        tip[style].top = '-99%'
    }
})(window, document);
