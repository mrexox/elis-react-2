// app/assets/javascripts/components/image_uploader.js

(function() {
  this.ImageUploader = React.createClass({
    getInitialState: function() {
      var file;
      file = this.props.file ? file : '';
      return {
        file: file,
        imagePreviewUrl: ''
      };
    },
    handleSubmit: function(e) {
      var formData;
      e.preventDefault();
      $('.submit-btn').hide();
      if (!this.state.file) {
        return;
      }
      formData = new FormData();
      formData.append('image[data]', this.state.file);
      $.ajax({
        url: '/admin/images',
        method: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: (function(_this) {
          return function(data) {
            return _this.props.handleSavedImage(data);
          };
        })(this),
        error: (function(_this) {
          return function(err) {
            return alert("Was unable to upload an image. Sorry...");
          };
        })(this)
      });
      return this.setState({
        file: null,
        imagePreviewUrl: null
      });
    },
    handleImageChange: function(e) {
      var file, reader;
      e.preventDefault();
      reader = new FileReader();
      file = e.target.files[0];
      reader.onloadend = (function(_this) {
        return function() {
          return _this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        };
      })(this);
      $('.submit-btn').show();
      return reader.readAsDataURL(file);
    },
    render: function() {
      var imagePreview, imagePreviewUrl;
      imagePreviewUrl = this.state.imagePreviewUrl;
      if (imagePreviewUrl) {
        imagePreview = React.DOM.img({
          src: imagePreviewUrl
        }, null);
      } else {
        imagePreview = null;
      }
      return React.DOM.div({
        className: 'preview-component'
      }, React.DOM.form({
        onSubmit: this.handleSubmit
      }, React.DOM.label({
        htmlFor: 'file',
        className: 'image-input-label'
      }, 'Choose...'), React.DOM.input({
        className: 'image-input',
        type: 'file',
        name: 'file',
        id: 'file',
        onChange: this.handleImageChange
      })), React.DOM.div({
        className: 'image-preview'
      }, imagePreview), React.DOM.div({
        className: 'submit-btn',
        onClick: this.handleSubmit
      }, 'Upload'));
    }
  });

}).call(this);
