// app/assets/javascripts/components/posts.js

(function() {
    this.Posts = React.createClass({
	getInitialState: function() {
	    return {
		newPost: false,
		brief: this.props.posts[0],
		posts: this.props.posts,
		images: this.props.images
	    };
	},
	getDefaultProps: function() {
	    return {
		posts: [],
		images: []
	    };
	},
	changeBrief: function(post) {
	    return this.setState({
		brief: post
	    });
	},
	handleSavedImage: function(image) {
	    var images;
	    images = this.state.images;
	    images.unshift(image);
	    return this.setState({
		images: images
	    });
	},
	handleNewPost: function() {
	    return this.setState({
		newPost: true,
		brief: {}
	    });
	},
	cancelNewPost: function() {
	    return this.setState({
		newPost: false,
		brief: this.state.posts[0]
	    });
	},
	handleCreatePost: function(post) {
	    var posts;
	    posts = this.state.posts;
	    posts.unshift(post);
	    return this.setState({
		newPost: false,
		posts: posts,
		brief: post
	    });
	},
	handleCancelNewPost: function() {
	    return this.setState({
		newPost: false,
		brief: this.state.posts[0]
	    });
	},
	handleUpdatePost: function(post, data) {
	    var index, p;
	    index = this.state.posts.indexOf(post);
	    p = this.state.posts[index];
	    p.image_id = data.image_id;
	    p.title = data.title;
	    p.permalink = data.permalink;
	    p.text = data.text;
	    p.tags = data.tags;
	    return this.setState({
		posts: this.state.posts
	    });
	},
	handleDeletePost: function(post) {
	    var index, posts;
	    posts = this.state.posts;
	    index = posts.indexOf(post);
	    posts.splice(index, 1);
	    return this.setState({
		posts: posts,
		brief: posts[0]
	    });
	},
	useForBrief: function(image) {
	    var brief;
	    brief = this.state.brief;
	    brief.image_id = image.id;
	    return this.setState({
		brief: brief
	    });
	},
	render: function() {
	    var briefImage, postBrief;
	    briefImage = this.state.images.find((function(_this) {
		return function(img) {
		    return img.id === _this.state.brief.image_id;
		};
	    })(this));
	    if (!this.state.newPost) {
		postBrief = React.createElement(Post, {
		    post: this.state.brief,
		    handleUpdatePost: this.handleUpdatePost,
		    image: briefImage,
		    handleDeletePost: this.handleDeletePost
		});
	    } else {
		postBrief = React.createElement(PostForm, {
		    post: this.state.brief,
		    handleCreatePost: this.handleCreatePost,
		    image: briefImage,
		    cancelNewPost: this.handleCancelNewPost
		});
	    }
	    return React.DOM.div({
		className: 'image-divider'
	    }, React.DOM.div({
		className: 'body-wrapper'
	    }, React.DOM.h3(null, 'Posts'), React.DOM.div({
		className: 'posts'
	    }, React.createElement(PostsList, {
		posts: this.state.posts,
		changeBrief: this.changeBrief,
		briefId: this.state.brief.id,
		handleNewPost: this.handleNewPost
	    }), React.DOM.div({
		className: 'posts__brief'
	    }, postBrief))), React.createElement(Images, {
		images: this.state.images,
		handleSavedImage: this.handleSavedImage,
		handleUseImageForBrief: this.useForBrief
	    }));
	}
    });

}).call(this);
