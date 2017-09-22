// app/assets/javascripts/components/tag.js

(function(){
    this.Tag = React.createClass({
				render: function() {
						return (
								<div className='tag' onClick={this.handleChangeBrief}>
									{this.props.tag.name}
								</div>
						);
				}});
}).call(this);
