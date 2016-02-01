import Model from './model';
import DS from 'ember-data';
import Ember from 'ember';
const { attr, belongsTo, hasMany } = DS;
const { computed } = Ember;

export default Model.extend({
  value: attr('string'),
  question: belongsTo('question', {
    async: false,
    inverse: null
  }),
  selected: hasMany('answerOption', {
    async: true,
    inverse: null
  }),
  response: belongsTo('response', {
    async: true,
    inverse: null
  }),
  respondent: computed.alias('response.user'),
  respondentReady: computed.alias('respondent.isFulfilled')
});
