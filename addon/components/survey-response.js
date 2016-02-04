import Ember from 'ember';
import layout from '../templates/components/survey-response';

export default Ember.Component.extend({
  layout: layout,

  assignment: Ember.computed.alias('model.actionObject'),
  engagement: Ember.computed.alias('assignment.engagement'),
  surveyResource: Ember.computed.alias('assignment.resource'),
  survey: Ember.computed.alias('surveyResource.survey'),
  questions: Ember.computed.alias('survey.questions'),

  actions: {
    submit: function() {
      // TODO: gather responses

      // TODO: package payload

      // TODO: post to pendingActions/set_disposition endpoint

      // TODO: catch success/failure and bubble actions appropriately
      this.sendAction('successAction');
    },

    testSuccess: function() {
      this.sendAction('successAction');
    },
    testFailure: function() {
      this.sendAction('errorAction');
    }
  }
});
