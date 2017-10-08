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
		
		
		handleCreatePost: function(post, data) {
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
			var index, posts;
			posts = this.state.posts;
			index = posts.indexOf(post);
			posts.splice(index, 1, data);
			return this.setState({
				posts: posts,
				brief: posts[0],
				editPost: false
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
			var briefImage, postBrief = void 0;
			if (this.state.brief) {
				if (this.state.newPost) {
					postBrief = (
						<PostForm
							 handleSendPost={this.handleCreatePost}
							 cancelFormPost={this.handleCancelNewPost} />
					);
				} else if (this.state.editPost) {
					postBrief = (
						<PostForm
							 post={this.state.brief}
							 handleSendPost={this.handleUpdatePost}
							 cancelFormPost={this.handleCancelEditPost} />
					);
				} else {
					postBrief = (
						<Post
							 post={this.state.brief}
							 handleDeletePost={this.handleDeletePost}
							 handleEdit={this.handleEditPost}/>
					);
				}
			}
			return (
				<div className='body-wrapper'>
					<h3>Посты</h3>
					<div className='posts'>
						<PostsList
							 posts={this.state.posts}
							 changeBrief={this.changeBrief}
							 briefId={this.state.bief ? this.state.brief.id : null}
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
			);
		}});
}).call(this);
/*
 <Images
 images={this.state.images}
 handleSavedImage={this.handleSavedImage}
 handleUseImageForBrief={this.useForBrief} />
 */
