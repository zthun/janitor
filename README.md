Description
===========
ZWebStyles is a collection of hint files that can be used with build tools to validate coding styles. 


Usage
=====
The usage depends on the tools your using.  To get the package itself, you can use npm.

```
npm install zwebstyles --save-dev
```

Available Styles
================
The following styling options are included in this package.


|Config File|For|Description|
|-----------|---|-----------|
|.jshintrc|Javascript|Used for [jshint](http://jshint.com/) checks.|
|.htmlhintrc|HTML|Used for [htmlhint](http://htmlhint.com/) checks.|
|.sasslint.yml|SASS|Used for [sasslint](https://github.com/sasstools/sass-lint) checks.|
|.eslintrc|Javascript|Used for [eslint](http://eslint.org/) checks.|
|tslint.json|Typescript|Used for [tslint](https://palantir.github.io/tslint/) checks.|


Example
=======
In grunt, you can use this with the grunt-contrib-jshint plugin:

```
jshint: {
    options: {
        jshintrc: 'node_modules/zwebstyles/.jshintrc'
    },
    self: {
        files: {
            src: ['gruntfile.js']
        }
    },
    main: {
        files: {
            src: ['src/**/*.js']
        }
    },
    test: {
        files: {
            src: ['src/**/*.spec.js']
        }
    }
}
```

You can also use them on the command line with various tools.

```
eslint src/**/*.js config/**/*.js --config=node_modules/zwebstyles/.eslintrc --parser babel-eslint
sass-lint src/**/*.scss --config=node_modules/zwebstyles/.sasslint.yml -v -q
htmlhint src/**/*.html --config=node_modules/zwebstyles/.htmlhintrc
```