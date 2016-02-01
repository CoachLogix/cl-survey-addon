import Model from './model';
import DS from 'ember-data';
const { attr, belongsTo } = DS;

export default Model.extend({
  value: attr('string'),
  question: belongsTo('question', {
    inverse: null
  }),
  weight: attr('number'),
  isChecked: false,
});
