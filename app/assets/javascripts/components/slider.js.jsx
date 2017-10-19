// app/assets/javascripts/components/slider.js.jsx

(function(){
	/* Slider on the main page, has:
	 addImage     - for posting an AJAX to create a Slider Image
	 deleteImage  - for posting an AJAX to delete a Slider Image
	 handleImageChange - when adding a new image as a file, calls addImage
	 */
	this.Slider = React.createClass({
		getInitialState: function() {
			return {};								// empty state
		},

		getDefaultProps: function() {
			return { slider_images: {} };
		},

		deleteImage: function(imageId) {
			var self = this;
			$.ajax({
				method: "DELETE",
				url: "/admin/slider_images/" + imageId,
				success: function() {
					self.props.handleDeleteImage(imageId);
				},
				error: function(a, b, c) {
					alert("Couldn't delete image. Problem on server");
					console.log(a, b, c);
				}
			});
		},

		addImage: function(file) {
			var self = this;
			var formData = new FormData();
			formData.append("image", file);
			$.ajax({
				method: "POST",
				url: "/admin/slider_images",
				data: formData,
				cache: false,
				contentType: false,
				processData: false,
				success: function(sliderImageData) {
					self.props.handleCreateImage(sliderImageData);
				},
				error: function(a, b, c) {
					alert("Couldn't create image. Problem on server");
					console.log(a, b, c);
				}
			});
		},

		handleAddSliderImage: function(e) {
			e.preventDefault();
			var file, reader, self = this;
			reader = new FileReader();
			file = e.target.files[0];
			reader.onloadend =  function() {
				self.addImage(file);
			};
			reader.readAsDataURL(file);
		},
		
		render: function() {
			// Slider image list
			var images = new Array();
			var propImgArr = this.props.slider_images;
			for (var i = 0; i < propImgArr.length; i++) {
				images.push( <SliderImage image={propImgArr[i]}
										 key={propImgArr[i].id}
										 handleDelete={this.deleteImage} /> );
			}
			return (
				<div>
					<form className="image-form">
						<label htmlFor='slider_file'
									 className='slider__add-btn'>
							Добавить
						</label>
						<input type='file'
									 name='slider_file'
									 id='slider_file'
									 onChange={this.handleAddSliderImage} />
					</form>
					<div className="slider">
						{images}
					</div>
				</div>
			);
		}
	});
}).call(this);
