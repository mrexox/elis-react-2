# app/assets/javascripts/components/tag.js.coffee

@Tag = React.createClass
	render: ->
		React.DOM.div
			className: 'tag'
			onClick: @handleChangeBrief
			@props.tag.name
