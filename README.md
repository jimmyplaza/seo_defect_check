

# SEO HTML defect checker
Basic module for checking SEO HTML defects

<b>Built for</b>
- [NodeJS](https://nodejs.org)

# Status

[![Build Status](https://travis-ci.org/doha99/seo-html-defect-checker.svg?branch=master)](https://travis-ci.org/doha99/seo-html-defect-checker)

## Installation

This is node.js libarary. Install nodejs first, then:

```npm install seo_defect_check```

or

```yarn add seo_defect_check ```

## How to use?

There are 7 defined rules that you can use to validate HTML.

1. Detect if there are any `<img />` tags without alt attribute
2. Detect if there are any `<a />` tags without rel attribute
3. In <head> tag
* Detect if there is any header that doesn’t have `<title>` tag
* Detect if there is any header that doesn’t have `<meta name=“descriptions” … />` tag
* Detect if there is any header that doesn’t have `<meta name=“keywords” … />` tag
4. Detect if there are more than 15 `<strong>` tag in HTML (15 is a value should be configurable by user)
5. Detect if a HTML have more than one `<H1>` tag.

```
For example:

```javascript
var seo = require('seo_defect_check')
seo.Parsing()
```

## Features

- [x] Detect basic HTML tag defect by the defined rules

## Contribute

Let people know how they can contribute into your project.

## License
A short snippet describing the license (MIT, Apache etc)

MIT © [jimmyko]

