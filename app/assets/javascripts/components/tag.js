// app/assets/javascripts/components/tag.js

(function(){
    this.Tag = React.createClass({
	render: function(){
	    return React.DOM.div(
		{ className: 'tag', onClick: this.handleChangeBrief },
		this.props.tag.name);
	}
    })
}).call(this);
