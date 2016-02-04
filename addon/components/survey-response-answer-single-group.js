import Ember from 'ember';
import layout from '../templates/components/survey-response-answer-single-group';

export default Ember.Component.extend({
  answerType: 'single',
  answerValue: null,
  layout: layout,

  init: function() {
  	this._super();
  	this.sendAction('registerAction', this);
  }
});
