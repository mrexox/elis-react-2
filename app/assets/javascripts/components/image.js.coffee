# app/assets/javascripts/components/image.js.coffee

@Image = React.createClass
	handleDelete: ->
		@props.handleDeleteImage @props.image

	handleUse: (e) ->
		@props.handleUseImageForBrief(@props.image)

	toggleEditMode: (e) ->
		e.preventDefault
		if e.target.tagName.toLowerCase() == 'img'
			parent = e.target.parentNode
		else if e.target.tagName.toLowerCase() == 'div'
			parent = e.target
		$(parent).find('.image-delete').toggle()
		$(parent).find('.image-use-btn').toggle()
		
	offEditMode: (e) ->
		$('.image-delete').hide()
		$('.image-use-btn').hide()
		
	render: ->
		React.DOM.div
			className: 'image'
			onClick: @toggleEditMode
			onMouseLeave: @offEditMode
			'data-imageId': @props.image.id
			React.createElement 'img',
				src: 'http://localhost:3000' + @props.image.image.url
				alt: 'Image here'
			React.DOM.span
				className: 'image-delete'
				onClick: @handleDelete
				hidden: true
				'X'
			React.DOM.div
				className: 'image-use-btn'
				onClick: @handleUse
				hidden: true
				'Use'
	
