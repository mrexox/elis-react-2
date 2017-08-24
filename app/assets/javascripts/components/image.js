// app/assets/javascripts/components/image.js

(function() {
    this.Image = React.createClass({
	handleDelete: function() {
	    return this.props.handleDeleteImage(this.props.image);
	},
	handleUse: function(e) {
	    return this.props.handleUseImageForBrief(this.props.image);
	},
	toggleEditMode: function(e) {
	    var parent;
	    e.preventDefault;
	    if (e.target.tagName.toLowerCase() === 'img') {
		parent = e.target.parentNode;
	    } else if (e.target.tagName.toLowerCase() === 'div') {
		parent = e.target;
	    }
	    $(parent).find('.image-delete').toggle();
	    return $(parent).find('.image-use-btn').toggle();
	},
	offEditMode: function(e) {
	    $('.image-delete').hide();
	    return $('.image-use-btn').hide();
	},
	render: function() {
	    return React.DOM.div({
		className: 'image',
		onClick: this.toggleEditMode,
		onMouseLeave: this.offEditMode,
		'data-imageId': this.props.image.id
	    }, React.createElement('img', {
		src: 'http://localhost:3000' + this.props.image.image.url,
		alt: 'Image here'
	    }), React.DOM.span({
		className: 'image-delete',
		onClick: this.handleDelete,
		hidden: true
	    }, 'X'), React.DOM.div({
		className: 'image-use-btn',
		onClick: this.handleUse,
		hidden: true
	    }, 'Use'));
	}
    });

}).call(this);
