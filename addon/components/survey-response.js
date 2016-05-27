import Ember from "ember";
import layout from "../templates/components/survey-response";

export default Ember.Component.extend({
  layout: layout,

  classNames: ['survey_response'],

  ajax: Ember.inject.service(),
  ajaxPending: false,

  assignment: Ember.computed.alias('model.actionObject'),
  engagement: Ember.computed.alias('assignment.engagement'),
  surveyResource: Ember.computed.alias('assignment.resource'),
  survey: Ember.computed.alias('surveyResource.survey'),
  questions: Ember.computed.alias('survey.questions'),
  questionComponents: Ember.computed(function() {
    return Ember.A([]);
  }),

  gatherResponses: function() {
    const questionComponents = this.get('questionComponents');
    let questionsAnswersArray = Ember.A();

    questionComponents.forEach(function(questionComponent) {
      let questionAnswerHash = {};

      questionAnswerHash.id = questionComponent.get('model.id');
      questionAnswerHash.answer = questionComponent.get('answerValue');
      questionAnswerHash.answerType = questionComponent.get('answerType');

      questionsAnswersArray.pushObject(questionAnswerHash);
    });

    return questionsAnswersArray;
  },

  apiEndpoint: function() {
    let modelId = this.get('model.id');
    return `/api/pendingActions/${modelId}/set_disposition`;
  }.property('model'),

  actions: {
    registerQuestionComponent: function(component) {
      this.get('questionComponents').pushObject(component);
    },

    submit: function() {
      // gather responses, build payload
      let ajax = this.get('ajax'),
        component = this,
        endpoint = this.get('apiEndpoint'),
        responses = this.gatherResponses(),
        payload = {
          disposition: 'respond',
          responses: responses
        };

      component.set('ajaxPending', true);

      // post to pendingActions/set_disposition endpoint
      let request = ajax.request(endpoint, {
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({pendingAction: payload})
      });

      // catch success/failure and bubble actions appropriately
      let onSuccess = function() {
          component.set('ajaxPending', false);
          component.sendAction('successAction');
        },
        onError = function() {
          component.set('ajaxPending', false);
          component.sendAction('errorAction');
        };

      request.then(onSuccess, onError);
    },

    testSuccess: function() {
      this.sendAction('successAction');
    },
    testFailure: function() {
      this.sendAction('errorAction');
    }
  }
});
