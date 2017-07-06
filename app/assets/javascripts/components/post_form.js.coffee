# app/assets/javascripts/components/post_form.js.coffee

@PostForm = React.createClass
	createPost: (e) ->
		brief = $(e.target).parent().parent()
		data =
			title: brief.find('.post__title').val()
			text: brief.find('.post__text').val()
			tags: brief.find('.post__tags').val().split(/,\s*/)
			image_id: @props.post.image_id
			permalink: brief.find('.post__permalink').val()
		$.ajax
			method: 'POST'
			url: '/admin/posts'
			dataType: 'JSON'
			data:
				post: data
			success: (data) =>
				@props.handleCreatePost data
				
	render:->
		React.DOM.div
			className: 'post--edit'
			React.DOM.input
				className: 'form-control post__title'
				type: 'text'
			React.DOM.div
				className: 'post__image'
				if @props.image
					React.DOM.img
						src: @props.image.image.url
			React.DOM.textarea
				className: 'form-control post__text'
			React.DOM.input
				className: 'form-control post__permalink'
				type: 'text'
			React.DOM.input
				className: 'form-control post__tags'
				type: 'text'
			React.DOM.div
				className: 'btns'
				React.DOM.div
					className: 'btn btn--orange'
					onClick: @createPost
					'Create'
				React.DOM.div
					className: 'btn btn--red'
					onClick: @props.cancelNewPost
					'Cancel'
