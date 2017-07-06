# app/assets/javascripts/components/tags.js.coffee

@Tags = React.createClass
	render: ->
		React.DOM.div
			className: 'post__tags'
			for tag in @props.tags
				React.createElement Tag, key: tag.id, tag: tag
