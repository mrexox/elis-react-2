// app/assets/javascripts/components/console.js.jsx

(function() {
	/* Console for manipulatin data on the site, has:
	 handleCreateSliderImage - when a Slider Image is created
	 handleDeleteSliderImage - when a Slider Image is deleted
	 changeBrief - for switching between posts
	 handleEditPost - for switching to Edit mode
	 handleNewPost - for switching to New Post mode
	 handleCreatePost - when post is created
	 handleCancelNewPost - for switching from New Post mode to normal
	 handleCancelEditPost - the same but from Edit Post mode
	 handleUpdatePost - when post is updated
	 handleDeletePost - when post is deleted
	 handleDeleteMessage - when a message is deleted
	 */
	this.Console = React.createClass({
		getInitialState: function() {
			return {
				newPost: false,
				brief: this.props.posts[0],
				posts: this.props.posts,
				page: 0,
				images: this.props.images,
				slider_images: this.props.slider_images,
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

		handleCreateSliderImage: function(newImageData) {
			var slider = this.state.slider_images;
			slider.push(newImageData);
			this.setState({
				slider_images: slider
			});
		},
		
		handleDeleteSliderImage: function(imageId) {
			var slider = this.state.slider_images;
			var sliderImage =
						$.grep(slider,
									 function(img){return img.id == imageId;})[0];
			var index = slider.indexOf(sliderImage);
			slider.splice(index, 1);
			this.setState({
				slider_images: slider
			});
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
		
		/*		// Not in use yet, was in ImageList before
		useForBrief: function(image) {
			var brief;
			brief = this.state.brief;
			brief.image_id = image.id;
			return this.setState({
				brief: brief
			});
		},
		 */
		
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
					<h3>Слайдер</h3>
					<Slider
						 slider_images={this.state.slider_images}
						 handleDeleteImage={this.handleDeleteSliderImage}
						 handleCreateImage={this.handleCreateSliderImage} />
					<h3>Посты</h3>
					<div className='posts'>
						<PostsList
							 posts={this.state.posts}
							 changeBrief={this.changeBrief}
							 briefId={this.state.brief ? this.state.brief.id : null}
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
