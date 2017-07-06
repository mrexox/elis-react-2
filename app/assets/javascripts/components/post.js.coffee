# app/assets/javascripts/components/post.js.coffee

@Post = React.createClass
	getInitialState: ->
		edit: false

	getDefaultProps: ->
		post: {title: 'ERROR Post was not loaded'}

	updatePost: (e) ->
		brief = $(e.target).parent().parent()
		data =
			title: brief.find('.post__title').val()
			text: brief.find('.post__text').val()
			tags: brief.find('.post__tags').val().split(/,\s*/)
			image_id: @props.post.image_id
			permalink: brief.find('.post__permalink').val()
		$.ajax
			method: 'PUT'
			url: "/admin/posts/#{ @props.post.id }"
			dataType: 'JSON'
			data:
				post: data
			success: (data) =>
				@setState edit: false
				@props.handleUpdatePost @props.post, data

	toggleEdit: ->
		@setState edit: !@state.edit
				
	deletePost: ->
		$.ajax
			method: 'DELETE'
			url: "/admin/posts/#{ @props.post.id }"
			dataType: 'JSON'
			success: =>
				@props.handleDeletePost @props.post

	commedTags: ->
		if @props.post.tags
			return @props.post.tags.map((o) -> o.name).join(', ')
		else
			return ''
		
	render: ->
		if @state.edit
			@postEdit()
		else
			@postShow()

	postEdit: ->
		React.DOM.div
			className: 'post--edit'
			React.DOM.input
				className: 'form-control post__title'
				type: 'text'
				defaultValue: @props.post.title
			React.DOM.div
				className: 'form-control post__created-at'
				moment(@props.post.created_at).format('DD / MM / YYYY HH:MM:SS')
			React.DOM.div
				className: 'post__image'
				if @props.image
					React.DOM.img
						src: @props.image.image.url
			React.DOM.textarea
				className: 'form-control post__text'
				defaultValue: @props.post.text
			React.DOM.input
				className: 'form-control post__permalink'
				type: 'text'
				defaultValue: @props.post.permalink
			React.DOM.input
				className: 'form-control post__tags'
				type: 'text'
				defaultValue: @commedTags()
			React.DOM.div
				className: 'btns'
				React.DOM.div
					className: 'btn btn--orange'
					onClick: @updatePost
					'Update'
				React.DOM.div
					className: 'btn btn--red'
					onClick: @toggleEdit
					'Cancel'

	postShow: ->
		React.DOM.div
			className: 'post'
			React.DOM.div
				className: 'post__title'
				@props.post.title
			React.DOM.div
				className: 'post__created-at'
				moment(@props.post.created_at).format('DD / MM / YYYY HH:MM:SS')
			React.DOM.div
				className: 'post__image'
				if @props.image
					React.DOM.img
						src: @props.image.image.url
			React.DOM.div
				className: 'post__text'
				dangerouslySetInnerHTML:
					__html: @props.post.text
				null
			React.DOM.div
				className: 'post__permalink'
				@props.post.permalink
			if @props.post.tags
				React.createElement Tags, key: @props.post.id, tags: @props.post.tags
			React.DOM.div
				className: 'btns'
				React.DOM.div
					className: 'btn btn--orange'
					onClick: @toggleEdit
					'Edit'
				React.DOM.div
					className: 'btn btn--red'
					onClick: @deletePost
					'Delete'
