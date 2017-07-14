import Ember from 'ember';
import layout from '../templates/components/survey-response';
const { Component, computed, inject, A } = Ember;

export default Component.extend({
  layout,

  classNames: ['survey_response'],

  ajax: inject.service(),
  ajaxPending: false,

  assignment: computed.alias('model.actionObject'),
  surveyResource: computed.alias('assignment.resource'),
  survey: computed.alias('surveyResource.survey'),
  rawQuestions: computed.alias('survey.questions'),

  questionSorting: ['order:asc'],
  questions: computed.sort('rawQuestions', 'questionSorting'),
  questionComponents: computed(function() {
    return A([]);
  }),

  gatherResponses() {
    const questionComponents = this.get('questionComponents');
    let questionsAnswersArray = A();

    questionComponents.forEach(function(questionComponent) {
      let questionAnswerHash = {};

      questionAnswerHash.id = questionComponent.get('model.id');
      questionAnswerHash.answer = questionComponent.get('answerValue');
      questionAnswerHash.answerType = questionComponent.get('answerType');

      questionsAnswersArray.pushObject(questionAnswerHash);
    });

    return questionsAnswersArray;
  },

  apiEndpoint: computed('model', function() {
    let modelId = this.get('model.id');
    return `/api/pendingActions/${modelId}/set_disposition`;
  }),

  actions: {
    registerQuestionComponent(component) {
      this.get('questionComponents').pushObject(component);
    },

    submit() {
      // gather responses, build payload
      let ajax = this.get('ajax');
      let endpoint = this.get('apiEndpoint');
      let responses = this.gatherResponses();
      let payload = {
        disposition: 'respond',
        responses: responses
      };

      this.set('ajaxPending', true);

      // post to pendingActions/set_disposition endpoint
      let request = ajax.request(endpoint, {
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ pendingAction: payload })
      });

      // catch success/failure and bubble actions appropriately
      let onSuccess = () => {
        this.set('ajaxPending', false);
        this.sendAction('successAction');
      };
      let onError = () => {
        this.set('ajaxPending', false);
        this.sendAction('errorAction');
      };

      request.then(onSuccess, onError);
    },

    testSuccess() {
      this.sendAction('successAction');
    },
    testFailure() {
      this.sendAction('errorAction');
    }
  }
});
