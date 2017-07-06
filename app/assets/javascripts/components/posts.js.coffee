# app/assets/javascripts/components/posts.js.coffee

@Posts = React.createClass
	getInitialState: ->
		newPost: false
		brief: @props.posts[0]
		posts: @props.posts
		images: @props.images

	getDefaultProps: ->
		posts: []
		images: []

	changeBrief: (post) ->
		@setState brief: post

	handleSavedImage: (image) ->
		images = @state.images
		images.unshift(image)
		@setState
			images: images

	handleNewPost: ->
		@setState
			newPost: true
			brief: {}
	cancelNewPost: ->
		@setState
			newPost: false
			brief: @state.posts[0]

	handleCreatePost: (post) ->
		posts = @state.posts
		posts.unshift post
		@setState
			newPost: false
			posts: posts
			brief: post
	handleCancelNewPost: ->
		@setState
			newPost: false
			brief: @state.posts[0]
			
	# Check this callback
	handleUpdatePost: (post, data) ->
		index = @state.posts.indexOf post
		p = @state.posts[index]
		p.image_id = data.image_id
		p.title = data.title
		p.permalink = data.permalink
		p.text = data.text
		p.tags = data.tags
		@setState posts: @state.posts

	handleDeletePost: (post) ->
		posts = @state.posts
		index = posts.indexOf post
		posts.splice index, 1
		@setState
			posts: posts
			brief: posts[0]
	
	useForBrief: (image) ->
		brief = @state.brief
		brief.image_id = image.id
		@setState brief: brief

	render: ->
		briefImage = @state.images.find((img) => img.id == @state.brief.image_id)
		if !@state.newPost
			postBrief =	React.createElement Post, post: @state.brief, handleUpdatePost: @handleUpdatePost, image: briefImage, handleDeletePost: @handleDeletePost
		else
			postBrief = React.createElement PostForm, post: @state.brief, handleCreatePost: @handleCreatePost, image: briefImage, cancelNewPost: @handleCancelNewPost
		React.DOM.div
			className: 'image-divider'
			React.DOM.div
				className: 'body-wrapper'
				React.DOM.h3 null, 'Posts'
				React.DOM.div
					className: 'posts'
					# Left side - list of posts
					React.createElement PostsList, posts: @state.posts, changeBrief: @changeBrief, briefId: @state.brief.id, handleNewPost: @handleNewPost
					
					# Right side - brief of a selected (recent) post
					React.DOM.div
						className: 'posts__brief'
						postBrief
						
			React.createElement Images, images: @state.images, handleSavedImage: @handleSavedImage, handleUseImageForBrief: @useForBrief
