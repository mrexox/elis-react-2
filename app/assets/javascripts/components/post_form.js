// Form for creating a new Post
// app/assets/javascripts/components/post_form.js

(function() {
    this.PostForm = React.createClass({
	createPost: function(e) {
	    var brief, data;
	    brief = $(e.target).parent().parent();
	    data = {
		title: brief.find('.post__title').val(),
		text: brief.find('.post__text').val(),
		tags: brief.find('.post__tags').val().split(/,\s*/),
		image_id: this.props.post.image_id,
		permalink: brief.find('.post__permalink').val()
	    };
	    return $.ajax({
		method: 'POST',
		url: '/admin/posts',
		dataType: 'JSON',
		data: {
		    post: data
		},
		success: (function(_this) {
		    return function(data) {
			return _this.props.handleCreatePost(data);
		    };
		})(this)
	    });
	},
	render: function() {
	    return React.DOM.div({
		className: 'post--edit'
	    }, React.DOM.div(
		{className: 'caption'},
		'Title:'
	    ), React.DOM.input({
		className: 'form-control post__title',
		type: 'text'
	    }), React.DOM.div({
		className: 'post__image'
	    }, this.props.image ? React.DOM.img({
		src: this.props.image.image.url
	    }) : void 0), React.DOM.div(
		{className: 'caption'},
		'Text:'
	    ), React.DOM.textarea({
		className: 'form-control post__text'
	    }), React.DOM.div(
		{className: 'caption'},
		'Permalink:'
	    ), React.DOM.input({
		className: 'form-control post__permalink',
		type: 'text'
	    }), React.DOM.div(
		{className: 'caption'},
		'Tags:'
	    ), React.DOM.input({
		className: 'form-control post__tags',
		type: 'text'
	    }), React.DOM.div({
		className: 'btns'
	    }, React.DOM.div({
		className: 'btn btn--orange',
		onClick: this.createPost
	    }, 'Create'), React.DOM.div({
		className: 'btn btn--red',
		onClick: this.props.cancelNewPost
	    }, 'Cancel')));
	}
    });

}).call(this);
