# app/assets/javascripts/components/images.js.coffee

@Images = React.createClass
	getInitialState: ->
		images: @props.images
		
	handleDeleteImage: (image) ->
		$.ajax
			method: 'DELETE'
			url: "/admin/images/#{ image.id }"
			dataType: 'JSON'
			success: () =>
				images = @state.images.slice()
				index = images.indexOf image
				images.splice(index, 1)
				@replaceState images: images
			error: () =>
				alert('Не могу удалить изображение.\nИзображение используется в посте или слайде.')
				
	componentDidMount: ->
		self = this
		$('.image').on 'contextmenu', (e) ->
			e.preventDefault()
			console.log(e.clientX, e.clientY, e.target.parentNode.dataset.imageid)



	render: ->
		if @state.images
			images = React.DOM.div {className:'images'},
				for image in @state.images
					React.createElement Image, image: image, key: image.id, handleDeleteImage: @handleDeleteImage, handleUseImageForBrief: @props.handleUseImageForBrief
		else
			images = React.DOM.div {className:'images'}, 'No Images'
		React.DOM.div
			className: 'images-field'
			React.DOM.h3 null, 'Images'
			React.createElement ImageUploader, handleSavedImage: @props.handleSavedImage
			React.DOM.hr color: '#eee', null
			images

