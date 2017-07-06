# app/assets/javascripts/components/image_uploader.js.coffee

@ImageUploader = React.createClass
	getInitialState: ->
		file = if @props.file then file else ''
		file: file
		imagePreviewUrl: ''

	handleSubmit: (e) ->
		e.preventDefault()
		$('.submit-btn').hide()
		
		
		if !@state.file
			return
		formData = new FormData()

		formData.append 'image[data]', @state.file

		$.ajax
			url: '/admin/images'
			method: 'POST'
			data: formData
			cache: false
			contentType: false
			processData: false
			success: (data) =>
				@props.handleSavedImage(data)
			error: (err) =>
				alert("Was unable to upload an image. Sorry...")

		@setState {file: null, imagePreviewUrl: null}
		
	handleImageChange: (e) ->
		e.preventDefault()
		reader = new FileReader()
		file = e.target.files[0]
		reader.onloadend = () =>
			@setState	{file: file, imagePreviewUrl: reader.result}
		$('.submit-btn').show()
		reader.readAsDataURL file
		

	render: ->
		imagePreviewUrl = @state.imagePreviewUrl
		if imagePreviewUrl
			imagePreview = React.DOM.img {src:imagePreviewUrl}, null
		else
			imagePreview = null #React.DOM.div {className: 'previewText'}, '.'
		React.DOM.div
			className: 'preview-component'
			React.DOM.form
				onSubmit: @handleSubmit
				React.DOM.label
					htmlFor: 'file'
					className: 'image-input-label'
					'Выбрать...'
				React.DOM.input
					className: 'image-input'
					type: 'file'
					name: 'file'
					id: 'file'
					onChange: @handleImageChange
			React.DOM.div
				className: 'image-preview'
				imagePreview
			React.DOM.div
				className: 'submit-btn'
				onClick: @handleSubmit
				'Загрузить'
