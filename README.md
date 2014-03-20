# Qooltip

Minimal vanilla js tooltip with no options. Intended only for text, but tags like ```<strong>``` and ```<em>``` can be used to highlight some words. Think of this plugin as native title attribute tooltip replacement.

## Browser support
```qooltip.min.js``` supports IE9+ and ```qooltip.legacy.min.js``` supports IE8+ <br><br>
*Note: Legacy version is made only because I'm sometimes forced to support IE8*

## Demo
https://qarlis.github.io/qooltip

## Usage
1) add this to your css file

```css
#qooltip {
    background: #000; // IE8 fallback
    background: rgba(0, 0, 0, 0.8);
    border-radius: 4px;
    color: #fff;
    font: 12px/1 sans-serif;
    top: -99%;
    position: fixed;
    padding: 5px 10px;
    white-space: nowrap;
    z-index: 9999;
}
```

If you you don't want to use CSS open ```qooltip.js``` and uncomment js styling lines

2) add ```qooltip.min.js``` or ```qooltip.legacy.min.js``` to your site <br>
3) add ```data-qooltip="Lorem ipsum"``` to any element

## Example

```html
<a href="#" data-qooltip="Only 707 B <em>minified</em>">Download</a>
```
