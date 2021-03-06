'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var ComposeCssGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic ComposeCss generator.'));

    var formats = ['bootstrap', 'pure', 'foundation', 'topcoat'];
    var prompts = [{
      type: 'list',
      name: 'format',
      message: 'Which framework would you like to use?',
      choices: formats
    }];

    this.prompt(prompts, function (props) {
      this.format = props.format;

      if ( this.format === 'bootstrap' ) {
        this.composeWith('bootstrap');
      } else if ( this.format === 'foundation' ) {
        this.composeWith('zurb-foundation');
      } else if ( this.format === 'topcoat' ) {
        this.composeWith('topcoat-touch');
      } else if (this.format === 'pure') {
        this.composeWith('pure');
      }

      done();
      
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/templates');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = ComposeCssGenerator;