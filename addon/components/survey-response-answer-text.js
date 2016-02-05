import Ember from 'ember';
import layout from '../templates/components/survey-response-answer-text';

export default Ember.Component.extend({
  answerType: 'text',
  answerValue: '',
  layout: layout,

  init: function() {
  	this._super();
  	this.sendAction('registerAction', this);
  }
});
