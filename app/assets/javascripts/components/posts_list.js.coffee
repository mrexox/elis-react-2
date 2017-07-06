# app/assets/javascripts/components/posts_list.js.coffee

@PostsList = React.createClass
	handleChangeBrief: (id, e) ->
		post = (p for p in @props.posts when p.id is id)[0]
		@props.changeBrief(post)
		

	render: ->
		React.DOM.ul
			className: 'posts__index'
			React.DOM.div
				className: 'posts__new-btn'
				onClick: @props.handleNewPost
				'+'
			for post in @props.posts
				classes = if post.id != @props.briefId then 'post' else 'post post--active'
				React.DOM.li
					key: post.id
					className: classes
					onClick: @handleChangeBrief.bind(this, post.id)
					React.DOM.div
						className: 'post__title'
						post.title
					React.DOM.div
						className: 'post__created-at'
						moment(post.created_at).format('DD-MM-YY')
					React.DOM.div
						className: 'post__permalink'
						post.permalink

