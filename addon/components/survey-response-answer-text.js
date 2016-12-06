import Ember from 'ember';
import layout from '../templates/components/survey-response-answer-text';
const { Component } = Ember;

export default Component.extend({
  answerType: 'text',
  answerValue: '',
  layout,

  init() {
    this._super(...arguments);
    this.sendAction('registerAction', this);
  }
});
