import Ember from "ember";
import layout from "../templates/components/survey-response-answer-multi";

export default Ember.Component.extend({
  layout: layout,
  optionChecked: Ember.computed('values', {
    get() {
      let values = this.get('values'),
        model = this.get('model');

      return values.contains(model);
    },
    set(key, value) {
      let values = this.get('values'),
        model = this.get('model'),
        contained = values.contains(model);

      if (value && !contained) {
        values.pushObject(model);
      }
      else if (!value && contained) {
        values.removeObject(model);
      }
      return value;
    }
  })
});
