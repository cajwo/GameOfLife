/*
  CIS 197 - React HW
  Author - Devesh Dayal
  RequireJS path configuration file and init file inclusion
*/
require.config({
  /*  The file locations for each of the files RequireJS might need to load are below
    JSX and Text are both RequireJS Plugins
      - JSX is used to pre-compile JSX files to JS on requiring
      - Text is used to require raw text/json files
    Plugins are used in the following format: plugin_name!file_to_require
  */
  paths: {
    underscore: 'vendor/underscore',
    react: 'vendor/react.min',
    JSXTransformer: 'vendor/JSXTransformer',
    jsx: 'vendor/jsx',
    text: 'vendor/text'
  }
});

// Underscore if first required
// then init.js is loaded using the JSX compiler plugin
// NOTE: as you will see, any file containing JSX code will be loaded via the jsx plugin
require(['underscore', 'jsx!init'])
