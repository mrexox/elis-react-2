// app/assets/javascripts/components/tags.js

(function(){
    this.Tags = React.createClass({
	render: function() {
	    return React.DOM.div(
		{className: 'post__tags'},
		(function(){
		    var i, len, ref, results;
		    ref = this.props.tags;
		    results = [];
		    for (i = 0, len = ref.length; i < len; ++i) {
			tag = ref[i];
			results.push(
			    React.createElement(Tag, {
				key: tag.id, tag: tag
			    })); 
		    }
		    return results;
		}).call(this));
	}	
    });	
}).call(this);
