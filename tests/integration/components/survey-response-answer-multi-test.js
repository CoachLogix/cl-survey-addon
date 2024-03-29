import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('survey-response-answer-multi', 'Integration | Component | survey response answer multi', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{survey-response-answer-multi}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#survey-response-answer-multi}}
      template block text
    {{/survey-response-answer-multi}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
