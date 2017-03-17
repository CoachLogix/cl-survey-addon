import Ember from 'ember';
import layout from '../templates/components/survey-response-answer-single-group';
const { Component } = Ember;

export default Component.extend({
  answerType: 'single',
  answerValue: null,
  layout,

  init() {
    this._super(...arguments);
    this.sendAction('registerAction', this);
  }
});
