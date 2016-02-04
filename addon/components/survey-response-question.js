import Ember from 'ember';
import layout from '../templates/components/survey-response-question';

export default Ember.Component.extend({
  answerComponents: Ember.computed(function() {
    return Ember.A([]);
  }),
  layout: layout,

  answerValue: function() {
    let component = this.get('answerComponents.firstObject');
    if (component) {
      let answerType = this.get('answerType'),
          answerValue = component.get('answerValue');

      if (answerType == 'text') {
        return answerValue;	
      }
      else if (answerType == 'single') {
        if (answerValue) {
          return answerValue.get('id');	
        }
        return null;
      }
      else if (answerType == 'multi') {
        if (answerValue) {
          return answerValue.mapBy('id');
        }
       	return [];
      }
    }
    return null;
  }.property('answerComponents', 'answerComponents.@each.answerValue'),

  answerType: function() {
    let component = this.get('answerComponents.firstObject');
    if (component) {
      return component.get('answerType');
    }
    return null;
  }.property('answerComponents', 'answerComponents.@each.answerType'),

  init: function() {
    this._super();
    this.sendAction('registerAction', this);
  },

  actions: {
    registerAnswerComponent: function(component) {
      this.get('answerComponents').pushObject(component);
    }
  }
});
