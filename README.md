Description
===
ZWebStyles is a collection of hint files that can be used with build tools to validate coding styles. 


Usage
===
The usage depends on the tools your using.  To get the package itself, you can use npm.

```
npm install zwebstyles --save-dev
```

Available Styles
===
The following styling options are included in this package.


|Config File|For|Description|
|----|--|---------|
|.jshintrc|Javascript|Used for [jshint](https://github.com/jshint/jshint) checks.|
|.htmlhintrc|HTML|Used for [htmlhint](https://github.com/yaniswang/HTMLHint) checks.|
|.sasslint.yml|SASS|Used for [sasslint](https://github.com/sasstools/sass-lint) checks.|


Example
===
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
            src: ['app/**/*.js']
        }
    },
    test: {
        files: {
            src: ['app/**/*.spec.js']
        }
    }
}
```