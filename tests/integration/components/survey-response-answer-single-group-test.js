import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('survey-response-answer-single-group', 'Integration | Component | survey response answer single group', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{survey-response-answer-single-group}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#survey-response-answer-single-group}}
      template block text
    {{/survey-response-answer-single-group}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
