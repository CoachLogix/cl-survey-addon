import Model from './model';
import DS from 'ember-data';
const { attr, belongsTo, hasMany } = DS;

export default Model.extend({
  answerOptions: hasMany('answerOption', {
    async: true,
    inverse: null
  }),
  value: attr('string'),
  survey: belongsTo('survey', {
    async: true,
    inverse: null
  }),
  order: attr('number'),
  type: attr('string'),

  isText: function() {
    return (this.get('type') === '2');
  }.property('this.type'),

  notText: function() {
    return (this.get('type') !== '2');
  }.property('this.type'),

  isMultiChoice: function() {
    return (this.get('type') === '1');
  }.property('this.type'),

  isSingleChoice: function() {
    return (this.get('type') === '0');
  }.property('this.type')
});
