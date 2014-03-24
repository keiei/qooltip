# Qooltip

Minimal vanilla js tooltip with no options. Intended only for text, but tags like ```<strong>``` and ```<em>``` can be used to highlight some words. Think of this plugin as native title attribute tooltip replacement.

## Browser support
IE8+

## Demo
https://qarlis.github.io/qooltip

## Usage
1) add this to your css file

```css
#qooltip {
    background: #000;
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

2) add ```qooltip.min.js``` to your site <br>
3) add ```data-qooltip="Lorem ipsum"``` to any element

## Example

```html
<a href="#" data-qooltip="Only 1.14 KB <em>minified</em>">Download</a>
```

## Example 2
If elements that have tooltip are added dynamically then ```data-qooltip-delegate``` attribute needs to be added to one of the parents.

```html
<ul data-qooltip-delegate>
    <li class="i-am-dynamically-added" data-qooltip="Lorem ipsum!">Item 1</li>
    <li class="i-am-dynamically-added" data-qooltip="Lorem ipsum!">Item 2</li>
    <li class="i-am-dynamically-added" data-qooltip="Lorem ipsum!">Item 3</li>
</ul>
```
