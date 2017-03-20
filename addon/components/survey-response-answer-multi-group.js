import Ember from 'ember';
import layout from '../templates/components/survey-response-answer-multi-group';
const { Component, computed, A } = Ember;

export default Component.extend({
  answerType: 'multi',
  answerValue: computed(function() {
    return A([]);
  }),
  layout,

  init() {
    this._super(...arguments);
    this.sendAction('registerAction', this);
  }
});
