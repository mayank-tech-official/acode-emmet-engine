EMMET ENGINE
============

A fast lightweight Emmet-style HTML expansion engine for Acode Editor.

WHAT IS THIS?
-------------
Emmet Engine is a custom plugin that brings VS Code-like Emmet power to mobile coding in Acode editor.

It helps you write HTML faster using shortcuts like:
div.hero
div>ul>li
div*3

FEATURES
--------
- Fast HTML expansion
- Support for nesting using >
- Multiplication support using *
- Class and ID support (div.hero#main)
- Lightweight and fast
- Works inside Acode editor

EXAMPLES
--------

Input:
```html
div.hero
```
Output:
```html
<div class="hero"></div>
```
--------------------

Input:
```html
div>ul>li
```
Output:
```html
<div>
  <ul>
    <li></li>
  </ul>
</div>
```
--------------------

Input:
```html
div*3
```
Output:
```html
<div></div>
<div></div>
<div></div>
```

INSTALLATION
------------

Option 1 (GitHub):
1. Open Acode
2. Go to Plugins
3. Install from GitHub
4. Paste repository URL

Option 2 (Local):
1. Download ZIP
2. Extract it
3. Select plugin.json in Acode local plugin option

PROJECT STRUCTURE
------------------
acode-emmet-engine/
- plugin.json
- main.js
- icon.png
- README.txt
- changelog.txt

TECH USED
---------
- JavaScript
- Acode Plugin API
- Custom Emmet parser

FUTURE PLANS
------------
- Tab stop system ($1, $2)
- Multi-cursor support
- JSX support
- CSS Emmet support
- Advanced snippet engine

AUTHOR
------
Made for mobile developers to speed up coding.

LICENSE
-------
MIT License - Free to use and modify

STATUS
------
Version: 1.0.0
Platform: Android (Acode)
Status: Active Development
