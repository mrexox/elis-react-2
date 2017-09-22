// app/assets/javascripts/components/console.js.jsx

(function() {
	this.Console = React.createClass({
		getInitialState: function() {
			return {
				newPost: false,
				brief: this.props.posts[0],
				posts: this.props.posts,
				images: this.props.images,
				messages: this.props.messages
			};
		},
		
		getDefaultProps: function() {
			return {
				posts: [],
				images: [],
				messages: []
			};
		},
		
		changeBrief: function(post) {
			return this.setState({
				brief: post,
				editPost: false,
				newPost: false
			});
		},
		
		handleSavedImage: function(image) {
			var images;
			images = this.state.images;
			images.unshift(image);
			this.setState({
				images: images
			});
		},

		handleEditPost: function() {
			this.setState({
				editPost: true
			});
		},
		
		handleNewPost: function() {
			this.setState({
				newPost: true,
				brief: {}
			});
		},
		
		cancelNewPost: function() {
			this.setState({
				newPost: false,
				brief: this.state.posts[0]
			});
		},
		
		handleCreatePost: function(data) {
			var posts;
			posts = this.state.posts;
			posts.unshift(data);
			console.log(data);
			this.setState({
				newPost: false,
				posts: posts,
				brief: posts[0]
			});
		},
		
		handleCancelNewPost: function() {
			this.setState({
				newPost: false,
				brief: this.state.posts[0]
			});
		},
		handleCancelEditPost: function() {
			this.setState({
				editPost: false
			});
		},
		
		handleUpdatePost: function(post, data) {
			var index, p;
			index = this.state.posts.indexOf(post);
			p = this.state.posts[index];
			p.image_id = data.image_id;
			p.title = data.title;
			p.permalink = data.permalink;
			p.text = data.text;
			p.tags = data.tags;
			return this.setState({
				posts: this.state.posts
			});
		},
		
		handleDeletePost: function(post) {
			var index, posts;
			posts = this.state.posts;
			index = posts.indexOf(post);
			posts.splice(index, 1);
			this.setState({
				posts: posts,
				brief: posts[0]
			});
		},

		handleDeleteMessage: function(messageId) {
			var index, message, messages;
			messages = this.state.messages;
			message = $.grep(messages, function(mess){return mess.id == messageId;})[0];
			index = messages.indexOf(message);
			messages.splice(index, 1);
			this.setState({
				messages: messages
			});
		},
		
		useForBrief: function(image) {
			var brief;
			brief = this.state.brief;
			brief.image_id = image.id;
			return this.setState({
				brief: brief
			});
		},
				
		render: function() {
			var briefImage, postBrief;
			briefImage = this.state.images.find((function(_this) {
				return function(img) {
					return img.id === _this.state.brief.image_id;
				};
			})(this));
			if (this.state.newPost) {
				postBrief = (
					<PostForm
						 handleSendPost={this.handleUpdatePost}
						 cancelFormPost={this.handleCancelEditPost} />
				);
			} else if (this.state.editPost) {
				postBrief = (
					<PostForm
						 post={this.state.brief}
						 handleSendPost={this.handleCreatePost}
						 cancelFormPost={this.handleCancelNewPost} />
				);
			} else {
				postBrief = (
					<Post
					 post={this.state.brief}
					 handleUpdatePost={this.handleUpdatePost}
					 handleDeletePost={this.handleDeletePost}
					 handleEdit={this.handleEditPost}/>
				);
			}
			return (
				<div className='image-divider'>
					<div className='body-wrapper'>
						<h3>Посты</h3>
						<div className='posts'>
							<PostsList
								 posts={this.state.posts}
								 changeBrief={this.changeBrief}
								 briefId={this.state.brief.id}
								 handleNewPost={this.handleNewPost} />

							<div className='posts__brief'>
								{ postBrief }
							</div>

							
						</div>
						
						<div className='messages'>
							<h3>Сообщения</h3>
							<MessageTable
								 handleDeleteMessage={this.handleDeleteMessage}
								 messages={this.state.messages}/>
						</div>
					</div>
				</div>
			);
		}});
}).call(this);
/*
<Images
								 images={this.state.images}
								 handleSavedImage={this.handleSavedImage}
								 handleUseImageForBrief={this.useForBrief} />
*/
