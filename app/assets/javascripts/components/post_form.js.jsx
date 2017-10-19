// Form for creating a new Post
// app/assets/javascripts/components/post_form.js.jsx

(function() {
  this.PostForm = React.createClass({
		getInitialState: function() {
			return {};
		},
		getDefaultProps: function() {
			return {
				post: null
			};
		},
		
		handleImageChange: function(e) {
			e.preventDefault();
			var file, reader, self = this;
			reader = new FileReader();
			file = e.target.files[0];
			reader.onloadend =  function() {
				return self.setState({
					file: file,
					imageUrl: reader.result
				});
			};
			reader.readAsDataURL(file);
		},
		
		handleSubmit: function(e) {
			e.preventDefault();
			var self = this,
					brief = $(e.target).parent().parent();
			
			var title = brief.find('.post__title').val(),
					text = brief.find('.post__text').val(),
					tags = brief.find('.post__tags').val(),
					permalink = brief.find('.post__permalink').val();
			
			var formData = new FormData();
			formData.append('post[title]', title);
			if (this.state.imageUrl) {
				formData.append('post[image]', this.state.file);
			}
			formData.append('post[text]', text);
			formData.append('post[tags]', tags);
			formData.append('post[permalink]', permalink);
			$.ajax({
				url: self.props.post ? '/admin/posts/'+self.props.post.id : '/admin/posts',
				method: self.props.post ? 'PUT' : 'POST',
				data: formData,
				cache: false,
				contentType: false,
				processData: false, 
				success: function(data) {
					self.props.handleSendPost(self.props.post, data);
				},
				error:  function(err) {
					alert("Was unable to upload an image."+err.responseText);
				}
			});
		},
		render: function() {
			var imagePreview;
			var post = this.props.post || null;
			if (this.state.imageUrl) {
				imagePreview = (<img src={this.state.imageUrl} />);
			} else if (post && post.logo) {
				imagePreview = (<img src={post.logo.url} />);
			} else {
				imagePreview = null;
			}
			return (
				<div className='post--edit'>
					<div className='caption'>
						Title:
					</div>
					<input className='form-control post__title'
								 type='text'
								 defaultValue={post ? post.title : undefined}/>
					{post ?
						(<div className='form-control post__created-at'>
							{moment(this.props.post.created_at).format('DD MMMM YYYY, HH:MM:SS')}
					   </div> )
					 : void 0}
					<div className='preview-component'>
					<form>
					<label htmlFor='post_image_file'
				className='image-input-label'>
					Выбрать...
					</label>
					<input className='image-input'
				type='file'
				name='post_image_file'
				id='post_image_file'
				onChange={this.handleImageChange} />
					<div className='post__image image-preview'>
					{imagePreview ? imagePreview : void 0}
				</div>
					</form>
					</div>
					<div className='caption'>
					Text:
				</div>
					<textarea className='form-control post__text'
				defaultValue={post ? post.text : undefined}/>
					<div className='caption'>
					Permalink:
				</div>
					<input className='form-control post__permalink'
				type='text'
				defaultValue={post ? post.permalink : undefined}/>
					<div className='caption'>
					Tags:
				</div>
					<input className='form-control post__tags'
				type='text'
				defaultValue={post ? post.tags.map(function(t){return t.name;}).join(', ') : undefined}/>
					<div className='btns'>
					<div className='btn btn--orange'
				onClick={this.handleSubmit}>
					{post ? 'Update' : 'Create'}
				</div>
					<div className='btn btn--red'
				onClick={this.props.cancelFormPost}>
					Cancel
				</div>
					</div>
					</div>
			);
		}});		
}).call(this);
