// app/assets/javascripts/components/images.js

(function() {
  this.Images = React.createClass({
    getInitialState: function() {
      return {
        images: this.props.images
      };
    },

    handleDeleteImage: function(image) {
      return $.ajax({
        method: 'DELETE',
        url: "/admin/images/" + image.id,
        dataType: 'JSON',
        success: (function(_this) {
          return function() {
            var images, index;
            images = _this.state.images.slice();
            index = images.indexOf(image);
            images.splice(index, 1);
            return _this.replaceState({
              images: images
            });
          };
        })(this),
        error: (function(_this) {
          return function() {
            return alert('Не могу удалить изображение!');
          };
        })(this)
      });
    },

    componentDidMount: function() {
      var self;
      self = this;
      return $('.image').on('contextmenu', function(e) {
        e.preventDefault();
        return console.log(e.clientX, e.clientY, e.target.parentNode.dataset.imageid);
      });
    },

    render: function() {
      var image, images;
      if (this.state.images) {
        images = React.DOM.div({
          className: 'images'
        }, (function() {
          var i, len, ref, results;
          ref = this.state.images;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            image = ref[i];
            results.push(React.createElement(Image, {
              image: image,
              key: image.id,
              handleDeleteImage: this.handleDeleteImage,
              handleUseImageForBrief: this.props.handleUseImageForBrief
            }));
          }
          return results;
        }).call(this));
      } else {
        images = React.DOM.div({
          className: 'images'
        }, 'No Images');
      }
      return React.DOM.div({
        className: 'images-field'
      }, React.DOM.h3(null, 'Images'), React.createElement(ImageUploader, {
        handleSavedImage: this.props.handleSavedImage
      }), React.DOM.hr({
        color: '#eee'
      }, null), images);
    }
  });

}).call(this);
