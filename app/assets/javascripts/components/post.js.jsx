// app/assets/javascripts/components/post.js

(function() {
  this.Post = React.createClass({
		getInitialState: function() {
			return {};
		},
		getDefaultProps: function() {
			return {
				post: undefined
			};
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

		render: function() {
			return (
				<div className='post'>
					<div className='post__title'>
						{this.props.post.title}
					</div>
					<div className='post__created-at'>
						{moment(this.props.post.created_at).format('DD MMMM YYYY, HH:MM:SS')}
					</div>
					<div className='post__image'>
						{ this.props.post.logo ? React.DOM.img({
							src: this.props.post.logo.url
						}) : void 0}
					</div>
					<div className='right-side'>
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
					</div>
			);
		}});
}).call(this);
