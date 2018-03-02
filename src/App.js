import React, { Component } from 'react';

import styles from './App.css';

import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {users: [], messages: [], text: '', name: ''};
	}


	render() {
    	return this.state.name !== '' ? (
      		this.renderLayout()
    	) : this.renderUserForm() // zaimplementowane w późniejszej części
  	}

	renderLayout() {
		return (
			<div className={styles.App}>
				<div className={styles.AppHeader}>
					<div className={styles.AppTitle}>
						ChatApp
					</div>
					<div className={styles.AppRoom}>
						App room
					</div>
				</div>
				<div className={styles.AppBody}>
					<UsersList
						users={this.state.users}
					/>
					<div className={styles.MessageWrapper}>
						<MessageList
							messages={this.state.messages}
						/>
						<MessageForm
							onMessageSubmit={message => this.handleMessageSubmit(message)}
							name={this.state.name}
						/>
					</div>
				</div>
			</div>
		);
	}

	renderUserForm() {
		return (<UserForm onUserSubmit={name => this.handleUserSubmit(name)} />)
	}


	messageReceive(message) {
		const messages = [message, ...this.state.messages];
		this.setState({messages});
	}

	chatUpdate(users) {
		this.setState({users});
	}

	handleMessageSubmit(message) {
		const messages = [message, ...this.state.messages];
		this.setState({messages});
	}

	handleUserSubmit(name) {
		this.setState({name});
	}
};

export default App;