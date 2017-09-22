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
			return (
				<div className='post--edit'>
					<div className='caption'>
						Title:
					</div>
					<input className='form-control post__title'
								 type='text'
								 defaultValue={this.props.post.title} />
					<div className='form-control post__created-at'>
						{moment(this.props.post.created_at).format('DD MMMM YYYY, HH:MM:SS')}
					</div>
					<div className='post__image'>
						{ this.props.image ? React.DOM.img({
							src: this.props.image.image.url
						}) : void 0}
					</div>
					<div className='caption'>
						Text:
					</div>
					<textarea
						 className='form-control post__text'
						 defaultValue={this.props.post.text} />
					<div className='caption'>
						Permalink:
					</div>
					<input
						 className='form-control post__permalink'
						 type='text'
						 defaultValue={this.props.post.permalink} />
					<div className='caption'>
						Tags:
					</div>
					<input
						 className='form-control post__tags'
						 type='text'
						 defaultValue={this.commedTags()} />
					<div className='btns'>
						<div
							 className='btn btn--orange'
							 onClick={this.updatePost}>
							Update
						</div>
						<div
							 className='btn btn--red'
							 onClick={this.toggleEdit}>
							Cancel
						</div>
					</div>
				</div>
			);
		},
		postShow: function() {
			return (
				<div className='post'>
					<div className='post__title'>
						{this.props.post.title}
					</div>
					<div className='post__created-at'>
						{moment(this.props.post.created_at).format('DD MMMM YYYY, HH:MM:SS')}
					</div>
					<div className='post__image'>
						{ this.props.image ? React.DOM.img({
							src: this.props.image.image.url
						}) : void 0}
					</div>
					<div className='post__text'
							 dangerouslySetInnerHTML={{
								 __html: this.props.post.text
							 }}>
					</div>
					<div className='post__permalink'>
						{this.props.post.permalink}
					</div>
					{this.props.post.tags	?
						React.createElement(Tags, {
							key: this.props.post.id,
							tags: this.props.post.tags
						})
					: void 0}
					<div className='btns'>
						<div className='btn btn--orange'
								 onClick={this.props.handleEdit}>
							Edit
						</div>
						<div className='btn btn--red'
								 onClick={this.deletePost}>
							Delete
						</div>
					</div>
				</div>
				
			);
		}});
}).call(this);
