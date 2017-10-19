// Posts list on the right of the screen
// app/assets/javascripts/components/posts_list.js

(function() {
	var POSTS_PER_PAGE = 5;
  this.PostsList = React.createClass({
		getInitialState: function() {
			return {page: 0};
		},

		goToPage: function(page) {
			if (page > Math.floor(this.props.posts.length / POSTS_PER_PAGE)) {
				page = Math.floor(this.props.posts.length / POSTS_PER_PAGE);
			} else if (page < 0) {
				page = 0;
			}
			this.setState({
				page: page 
			});
		},
		
		nextPage: function() {
			var page =
						Math.floor(this.props.posts.length / POSTS_PER_PAGE) > this.state.page ?
						this.state.page + 1 : this.stage.page;
			this.setState({
				page: page
			});
		},
		
		prevPage: function() {
			var page = this.state.page <= 0 ? 0 : this.state.page - 1;
			this.setState({
				page: page
			});
		},
		
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
				<ul className='posts__index'>
					<li className='posts__new-btn'
							onClick={this.props.handleNewPost}>
						+
					</li>
					{
						(function() {
							var i, len, ref, results;
							ref = this.props.posts.slice(this.state.page * POSTS_PER_PAGE,
																					 this.state.page * POSTS_PER_PAGE + POSTS_PER_PAGE);
							results = [];
							for (i = 0, len = ref.length;
									 i < len; i++) {
												 var post = ref[i];
												 var className = (post.id !== this.props.briefId ? 'post' : 'post post--active');
												 results.push(
													 <li key={post.id} className={className}
															 onClick={this.handleChangeBrief.bind(this, post.id)}>
														 <div className='post__title'> {post.title} </div> 
														 <div className='post__created-at'>
															 {moment(post.created_at).format('dddd, DD MMM YYYY')}
														 </div>
														 <div className='post__permalink'> {post.permalink} </div>
														 <div className='post__views'>Просмотры: {post.views}</div>
													 </li>);
							}
							return results;
						}).call(this)}
					<li>
					<a className="prev-page"
				onClick={this.prevPage}>
					&lt;
				</a>

					{
						(function(){
							var results = new Array();
							for (var i = 0; i <= Math.floor(this.props.posts.length / POSTS_PER_PAGE); i++) {
								var className = "page-number";
								if (this.state.page == i) {
									className += " current-page";
								}
								results.push(
									<a className={className}
										 key={i}
										 onClick={this.goToPage.bind(this,i)}>
										{i + 1}
									</a>
								);
							}
							return results;
						}).call(this)
					}
					
					<a className="next-page"
				onClick={this.nextPage}>
					&gt;
				</a>
					</li>
				</ul>
			);	
		}
  });
}).call(this);
