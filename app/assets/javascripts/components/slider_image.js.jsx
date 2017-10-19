// app/assets/javascripts/components/slider_image.js.jsx

(function() {
	this.SliderImage = React.createClass({
		delete: function(e) {
			e.preventDefault();
			this.props.handleDelete(
				this.props.image.id
			);
		},
		render: function() {
			/*
			 A block with `X' to delete slider image
			 */
			return (
				<div className="slider__image">
					<span className="slider__image-del"
								onClick={this.delete}>x</span>
					<img src={this.props.image.image.url} />
				</div>
			);
		}
	});
}).call(this);
