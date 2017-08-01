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

  responses: computed.map('questionComponents.@each.answerValue', function(component) {
    let answerType = component.get('answerType');

    return {
      id: component.get('model.id'),
      answer: component.get('answerValue'),
      answerOptions: component.get('model.answerOptions').toArray(),
      answerType,
    };
  }),

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
      let responses = this.get('responses');

      for (let response of responses) {
        if (response.answerType === 'multi') {
          continue;
        }

        // HACK Some questions don't have possible answers, it would be a shame to require mandatory answers for them
        if (response.answerType === 'single' && response.answerOptions.length === 0) {
          continue;
        }

        if (!response.answer) {
          alert('Please fill all required fields.');
          return;
        }
      }

      let payload = {
        disposition: 'respond',
        responses
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
