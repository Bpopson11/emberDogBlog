import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('entry', params.entry_id);
  },
  actions: {
    update(entry, params) {
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          entry.set(key,params[key]);
        }
      });
      entry.save();
      this.transitionTo('index');
    },
    saveComment3(params) {
      var newComment = this.store.createRecord('comment', params);
      console.log(newComment);
      var entry = params.entry;
      console.log(entry);
      entry.get('comments').addObject(newComment);
      newComment.save().then(function() {
        return entry.save();
      });
      this.transitionTo('entry', params.entry);
    },
    destroyEntry(entry) {
      entry.destroyRecord();
      this.transitionTo('index');
    }
  }
});
