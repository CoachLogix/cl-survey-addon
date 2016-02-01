import Model from './model';
import DS from 'ember-data';
const { attr, hasMany } = DS;

export default Model.extend({
  name: attr('string'),
  description: attr('string'),
  questions: hasMany('question', {
    async: true,
    inverse: null
  }),
  responses: hasMany('response', {
    async: true,
    inverse: null
  }),
  aggregate: attr('array'),

  sortedQuestions: function() {
    return this.get('questions').sortBy('order');
  }.property('questions.length', 'questions.@each.order')
});
