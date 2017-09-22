// Posts list on the right of the screen
// app/assets/javascripts/components/posts_list.js

(function() {
  this.PostsList = React.createClass({

    handleChangeBrief: function(id, e) {
      var p, post;
      post = ((function() {
        var i, len, ref, results;
        ref = this.props.posts;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          p = ref[i];
          if (p.id === id) {
            results.push(p);
          }
        }
        return results;
      }).call(this))[0];
      return this.props.changeBrief(post);
    },

    render: function() {
      var classes, post;
	return	(
	    <ul classNam='posts__index'>
	      <div className='posts__new-btn'
		   onClick={this.props.handleNewPost}>
		+
	      </div>
	      {
		  (function() {
		      var i, len, ref, results;
		      ref = this.props.posts;
		      results = [];
		      for (i = 0, len = ref.length; i < len; i++) {
							    post = ref[i];
							    classes = post.id !== this.props.briefId ? 'post' : 'post post--active';
							    results.push(
								<li key={post.id} className={classes}
								    onClick={this.handleChangeBrief.bind(this, post.id)}>
								  <div className='post__title'> {post.title} </div> 
								  <div className='post__created-at'>
								    {moment(post.created_at).format('DD-MM-YY')}
								  </div>
								  <div className='post__permalink'> {post.permalink} </div>
								</li>
							    );
		      }
		      return results;
		  }).call(this);
	      }
	    </ul>
	)	
    }
  });
}).call(this);
