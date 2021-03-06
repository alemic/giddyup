require('selectable');

GiddyUp.ProjectItemView = Ember.View.extend(GiddyUp.Selectable);
GiddyUp.ScorecardItemView = Ember.View.extend(GiddyUp.Selectable);
GiddyUp.TestResultItemView = Ember.View.extend(GiddyUp.Selectable);
GiddyUp.ArtifactItemView = Ember.View.extend(GiddyUp.Selectable);
GiddyUp.HelpView = Ember.View.extend();

GiddyUp.ArtifactView = Ember.View.extend({
  classNames: ['span9'],
  templateName: function(){
    var ctype = this.get('controller.contentType'),
        type, major, minor;

    if(Ember.isNone(ctype))
      return 'artifact/download';

    type = ctype.toString().split(";")[0].trim().split("/");
    major = type[0];
    minor = type[1];

    if(major === 'text')
      return 'artifact/text';
    else if (major === 'image')
      return 'artifact/image';
    else
      return 'artifact/download';
  }.property('controller.contentType')
});

GiddyUp.BubbleView = Ember.View.extend({
  tagName: 'div',
  backgroundStyle: function(){
    var status = this.get('content.status'),
        testResults, gradient, stepSize,
        red = "#b94a48", green = "#468847";
    if(status === 'warning'){
      testResults = this.get('content.testResults').getEach('status').slice(0,4);
      stepSize = 100 / testResults.get('length');
      gradient = "linear-gradient(right";
      testResults.forEach(function(st, idx){
        var color = (st === true) ? green : red;
        gradient += ", " + color + " " + (stepSize * idx) + "%";
        gradient += ", " + color + " " + (stepSize * (idx+1)) + "%";
      });
      gradient += ")";
      return Ember.A(["-moz-", "-ms-", "-o-", "-webkit-", ""]).
        map(function(prefix){ return "background-image: " + prefix + gradient; }).
        join("; ");
    } else {
      return "";
    }
  }.property('content.status'),
  statusClasses: function(){
    var status = this.get('content.status'),
        classes = ['badge'];

    if(status === true) {
      classes.push('badge-success');
    }
    if(status === false) {
      classes.push('badge-important');
    }
    if(status === 'warning') {
      classes.push('badge-warning');
    }
    if(status === undefined) {
      classes.push('badge-loading');
    }
    return classes.join(' ');
  }.property('content.status')
});

GiddyUp.DropdownSelectableView = Ember.View.extend({
  tagName: 'li',
  dropdown: true,
  classNameBindings: ['dropdown', 'isActive:active'],
  selectedTextProperty: null,
  unselectedText: null,

  isActive: function(){
    var content = this.get('content'),
        item = this.get('controller.selectedItem');
    return !Ember.isNone(item) && content.contains(item);
  }.property('controller.selectedItem', 'content'),

  togglerText: function(){
    var active = this.get('isActive'),
        textProp = this.get('selectedTextProperty'),
        unselected = this.get('unselectedText'),
        selectedItem = this.get('controller.selectedItem');

    if(active){
      return selectedItem.get(textProp);
    } else {
      return unselected;
    }
  }.property('isActive', 'selectedTextProperty', 'unselectedText')
});
