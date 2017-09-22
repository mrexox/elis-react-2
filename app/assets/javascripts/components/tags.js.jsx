// app/assets/javascripts/components/tags.js.jsx

(function(){
    this.Tags = React.createClass({
	render: function() {
	    return (
		<div className='post__tags'>
		  {(function(){
		      var i, len, ref, results;
		      ref = this.props.tags;
		      results = [];
		      for (i = 0, len = ref.length;
			   i < len; ++i) {
				   tag = ref[i];
				   results.push(
				       <Tag key={tag.id} tag={tag} />
				   ); 
		      }
		      return results;
		  }).call(this)}
		</div>
	    );
	}	
    });	
}).call(this);
