(function(){
	this.MessageTable = React.createClass({
		getInitialState: function() {
			// setting this.state first of all
			return {
				messages: this.props.messages
			};
		},
		
		getDefaultProps: function() {
			return {
				messages: []
			};
		},

		deleteMessage: function(id) {
			var _this = this;
			$.ajax({
				method: "DELETE",
				url: "/admin/messages/"+id,
				success: function(data) {
					_this.props.handleDeleteMessage(id);
				},
				error: function() {
					alert("Error white deleting message");
				}
			});
		},

		render: function() {
			var mess_trs = [];
			var messages = this.state.messages;
			for(var i = 0; i < messages.length; i++) {
				var message = messages[i];
				mess_trs.push(
					<tr key={message.id}>
						<td>{message.name}</td>
						<td>{message.theme}</td>
						<td>{message.email}</td>
						<td>{message.telephone}</td>
						<td>{message.text}</td>
						<td>{moment(message.created_at).format("DD MMMM YYYY, HH:MM")}</td>
						<td onClick={this.deleteMessage.bind(this, message.id)}><a>Delete</a></td>
					</tr>
				);
			}
			return (
				<table className='message-table'>
					<thead>
						<tr>
							<th>Имя</th>
							<th>Тема</th>
							<th>Почта</th>
							<th>Телефон</th>
							<th>Текст</th>
							<th>Дата отправки</th>
							<th>x</th>
						</tr>
					</thead>
					<tbody>
						{mess_trs}
				</tbody>
					</table>
			);
		}
	});
}).call(this);
