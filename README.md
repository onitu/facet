Facet
=====

Onitu's web interface

Contributing
============

Setup
------------
If you want to build Facet, you'll need NodeJS. It's not required for the runtime, but for the building process. When you have NodeJS installed, you can run the following commands:

```shell
$ git clone https://github.com/onitu/facet.git
$ cd facet
$ sudo npm install -g gulp # only needed if don't have Gulp installed
$ npm install
```

When all is installed, you can run `gulp` to build the assets and open the interface. Each time you make a modification in the source, the assets will be recompiled and the page reloaded.

Resources
=========
Facet is built with AngularJS, CoffeeScript and Sass. Here is the reference for the main dependencies:

- [Sass reference](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)
- [AngularJS documentation](https://docs.angularjs.org/api)
- [CoffeeScript Cookbook](http://coffeescriptcookbook.com/)
- [Restangular](https://github.com/mgonto/restangular) - Replace Angular's $resource with a nice and powerful API
- [AngularUI Router](https://github.com/angular-ui/ui-router) - Replace Angular's $route service by a new shiny router with states
- [AngularUI Bootstrap](http://angular-ui.github.io/bootstrap/) - Bootstrap components for AngularJS
