ordino_product [![Phovea][phovea-image]][phovea-url] [![CircleCI](https://circleci.com/gh/Caleydo/ordino_product.svg?style=svg)](https://circleci.com/gh/Caleydo/ordino_product) 
=====================
[![Phovea][phovea-image]][phovea-url] [![Build Status][circleci-image]][circleci-url]


Installation
------------

```
git clone https://github.com/Caleydo/ordino_product.git
cd ordino_product
npm install
```

Testing
-------

```
npm test
```

## Run Cypress tests

On Windows 10 + WLS 2 [install and run the VcXsrv](https://dev.to/nickymeuleman/using-graphical-user-interfaces-like-cypress-in-wsl2-249j) before proceeding.

1. `npm install`
2. `npm run cy:run` for headless mode or `npm run cy:open` to open the dashboard and select test manually


Building
--------

```
npm run build
```



***

<a href="https://caleydo.org"><img src="http://caleydo.org/assets/images/logos/caleydo.svg" align="left" width="200px" hspace="10" vspace="6"></a>
This repository is part of **[Phovea](http://phovea.caleydo.org/)**, a platform for developing web-based visualization applications. For tutorials, API docs, and more information about the build and deployment process, see the [documentation page](http://phovea.caleydo.org).


[phovea-image]: https://img.shields.io/badge/Phovea-Product-FABC15.svg
[phovea-url]: https://phovea.caleydo.org
[circleci-image]: https://circleci.com/gh/Caleydo/ordino_product.svg?style=shield
[circleci-url]: https://circleci.com/gh/Caleydo/ordino_product
