import Ember from 'ember';
import layout from '../templates/components/survey-response-answer-multi-group';

export default Ember.Component.extend({
  answerType: 'multi',
  answerValue: Ember.computed(function() {
  	return Ember.A([]);
  }),
  layout: layout,

  init: function() {
  	this._super();
  	this.sendAction('registerAction', this);
  }
});
