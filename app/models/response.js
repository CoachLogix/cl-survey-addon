import Model from './model';
import DS from 'ember-data';
const { attr, belongsTo, hasMany } = DS;

export default Model.extend({
	user: belongsTo('user', {
	  async: true,
	  inverse: null
	}),
	answers: hasMany('answer', {
	  async: true,
	  inverse: null
	}),
	survey: belongsTo('survey', {
	  async: true,
	  inverse: null
	}),

	created: attr('date'),
	updated: attr('date'),
	assignment: belongsTo('assignment', {
	  async: true,
	  inverse: null
	})
});
