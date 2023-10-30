import React, { Component } from 'react';
import axios from 'axios';

class Interface extends Component {
  state = {
    userId: '',
    oldUserId: '',
    newUserId: '',
    conversationId: ''
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleExport = () => {
    this.props.exportConversations();
  };

  handleParseContext = () => {
    this.props.parseContext(this.state.conversationId);
  };

  handleLinkAccount = () => {
    this.props.linkAccount(this.state.userId);
  };

  handleReinitializeAccount = () => {
    this.props.reinitializeAccount(this.state.oldUserId, this.state.newUserId);
  };

  handleBackupAndTokenize = () => {
    // Initiate the backup process first
    this.handleExport();

    // Then, tokenize the user persona (implementation depends on how you've structured the logic)
    this.props.tokenizePersona();
  };

  render() {
    const { conversations, context, accountLinked, reinitialized } = this.props;

    return (
      <div>
        <h1>ChatGPT Memory Bank</h1>
        <button onClick={this.handleBackupAndTokenize}>Backup & Tokenize All My Conversations</button>
        <button onClick={this.handleExport}>Export Conversations</button>
        <input 
          type="text" 
          name="conversationId" 
          placeholder="Enter conversation ID" 
          onChange={this.handleInputChange} 
        />
        <button onClick={this.handleParseContext}>Parse Context</button>
        <input 
          type="text" 
          name="userId" 
          placeholder="Enter user ID" 
          onChange={this.handleInputChange} 
        />
        <button onClick={this.handleLinkAccount}>Link Account</button>
        <input 
          type="text" 
          name="oldUserId" 
          placeholder="Enter old user ID" 
          onChange={this.handleInputChange} 
        />
        <input 
          type="text" 
          name="newUserId" 
          placeholder="Enter new user ID" 
          onChange={this.handleInputChange} 
        />
        <button onClick={this.handleReinitializeAccount}>Reinitialize Account</button>
        <h2>Conversations</h2>
        {conversations.map(conversation => (
          <div key={conversation.id}>
            <h3>{conversation.id}</h3>
            <p>{conversation.messages.join(', ')}</p>
          </div>
        ))}
        <h2>Context</h2>
        <p>{context}</p>
        <h2>Account Linked</h2>
        <p>{accountLinked ? 'Yes' : 'No'}</p>
        <h2>Account Reinitialized</h2>
        <p>{reinitialized ? 'Yes' : 'No'}</p>
      </div>
    );
  }
}

export default Interface;
