import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('survey-response-answer-text', 'Integration | Component | survey response answer text', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{survey-response-answer-text}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#survey-response-answer-text}}
      template block text
    {{/survey-response-answer-text}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
