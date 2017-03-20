import Ember from 'ember';
import layout from '../templates/components/survey-response-question';
const { Component, computed, A } = Ember;

export default Component.extend({
  answerComponents: computed(function() {
    return A([]);
  }),
  layout,

  classNames: ['survey_response-question'],

  answerValue: computed('answerComponents', 'answerComponents.@each.answerValue', function() {
    let component = this.get('answerComponents.firstObject');
    if (component) {
      let answerType = this.get('answerType'),
        answerValue = component.get('answerValue');

      if (answerType === 'text') {
        return answerValue;
      }
      else if (answerType === 'single') {
        if (answerValue) {
          return answerValue.get('id');
        }
        return null;
      }
      else if (answerType === 'multi') {
        if (answerValue) {
          return answerValue.mapBy('id');
        }
        return [];
      }
    }
    return null;
  }),


  answerType: computed('answerComponents', 'answerComponents.@each.answerType', function() {
    let component = this.get('answerComponents.firstObject');
    if (component) {
      return component.get('answerType');
    }
    return null;
  }),

  init() {
    this._super(...arguments);
    this.sendAction('registerAction', this);
  },

  actions: {
    registerAnswerComponent(component) {
      this.get('answerComponents').pushObject(component);
    }
  }
});
