// app/assets/javascripts/components/post.js

(function() {
	this.Post = React.createClass({
		getInitialState: function() {
			return {
				edit: false
			};
		},
		getDefaultProps: function() {
			return {
				post: {
					title: 'ERROR Post was not loaded'
				}
			};
		},
		updatePost: function(e) {
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
				method: 'PUT',
				url: "/admin/posts/" + this.props.post.id,
				dataType: 'JSON',
				data: {
					post: data
				},
				success: (function(_this) {
					return function(data) {
						_this.setState({
							edit: false
						});
						return _this.props.handleUpdatePost(_this.props.post, data);
					};
				})(this)
			});
		},
		toggleEdit: function() {
			return this.setState({
				edit: !this.state.edit
			});
		},
		deletePost: function() {
			return $.ajax({
				method: 'DELETE',
				url: "/admin/posts/" + this.props.post.id,
				dataType: 'JSON',
				success: (function(_this) {
					return function() {
						return _this.props.handleDeletePost(_this.props.post);
					};
				})(this)
			});
		},
		commedTags: function() {
			if (this.props.post.tags) {
				return this.props.post.tags.map(function(o) {
					return o.name;
				}).join(', ');
			} else {
				return '';
			}
		},
		render: function() {
			if (this.state.edit) {
				return this.postEdit();
			} else {
				return this.postShow();
			}
		},
		postEdit: function() {
			return React.DOM.div({
				className: 'post--edit'
			}, React.DOM.div(
				{className: 'caption'},
				'Title:'
			), React.DOM.input({
				className: 'form-control post__title',
				type: 'text',
				defaultValue: this.props.post.title
			}), React.DOM.div({
				className: 'form-control post__created-at'
			}, moment(this.props.post.created_at).format('DD / MM / YYYY HH:MM:SS')), React.DOM.div({
				className: 'post__image'
			}, this.props.image ? React.DOM.img({
				src: this.props.image.image.url
			}) : void 0), React.DOM.div(
				{className: 'caption'},
				'Text:'
			), React.DOM.textarea({
				className: 'form-control post__text',
				defaultValue: this.props.post.text
			}), React.DOM.div(
				{className: 'caption'},
				'Permalink:'
			), React.DOM.input({
				className: 'form-control post__permalink',
				type: 'text',
				defaultValue: this.props.post.permalink
			}), React.DOM.div(
				{className: 'caption'},
				'Tags:'
			), React.DOM.input({
				className: 'form-control post__tags',
				type: 'text',
				defaultValue: this.commedTags()
			}), React.DOM.div({
				className: 'btns'
			}, React.DOM.div({
				className: 'btn btn--orange',
				onClick: this.updatePost
			}, 'Update'), React.DOM.div({
				className: 'btn btn--red',
				onClick: this.toggleEdit
			}, 'Cancel')));
		},
		postShow: function() {
			return React.DOM.div({
				className: 'post'
			}, React.DOM.div({
				className: 'post__title'
			}, this.props.post.title), React.DOM.div({
				className: 'post__created-at'
			}, moment(this.props.post.created_at).format('DD / MM / YYYY HH:MM:SS')), React.DOM.div({
				className: 'post__image'
			}, this.props.image ? React.DOM.img({
				src: this.props.image.image.url
			}) : void 0), React.DOM.div({
				className: 'post__text',
				dangerouslySetInnerHTML: {
					__html: this.props.post.text
				}
			}, null), React.DOM.div({
				className: 'post__permalink'
			}, this.props.post.permalink), this.props.post.tags ? React.createElement(Tags, {
				key: this.props.post.id,
				tags: this.props.post.tags
			}) : void 0, React.DOM.div({
				className: 'btns'
			}, React.DOM.div({
				className: 'btn btn--orange',
				onClick: this.toggleEdit
			}, 'Edit'), React.DOM.div({
				className: 'btn btn--red',
				onClick: this.deletePost
			}, 'Delete')));
		}
	});

}).call(this);
