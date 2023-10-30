import React, { Component } from 'react';
import axios from 'axios';
import Interface from './components/interface';

class App extends Component {
  state = {
    conversations: [],
    context: null,
    accountLinked: false,
    reinitialized: false
  };

  componentDidMount() {
    this.getConversations();
  }

  getConversations = () => {
    axios.get('/api/conversations')
      .then(res => this.setState({ conversations: res.data }))
      .catch(err => console.log(err));
  };

  exportConversations = () => {
    axios.post('/export-conversations')
      .then(res => console.log(`Conversations exported with CID: ${res.data.cid}`))
      .catch(err => console.log(err));
  };

  parseContext = (conversationId) => {
    axios.get(`/parse-context/${conversationId}`)
      .then(res => this.setState({ context: res.data.context }))
      .catch(err => console.log(err));
  };

  linkAccount = (userId) => {
    axios.post('/link-account', { userId })
      .then(res => this.setState({ accountLinked: res.data.success }))
      .catch(err => console.log(err));
  };

  reinitializeAccount = (oldUserId, newUserId) => {
    axios.post('/reinitialize-account', { oldUserId, newUserId })
      .then(res => this.setState({ reinitialized: res.data.success }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <Interface 
          conversations={this.state.conversations} 
          context={this.state.context} 
          accountLinked={this.state.accountLinked} 
          reinitialized={this.state.reinitialized} 
          exportConversations={this.exportConversations} 
          parseContext={this.parseContext} 
          linkAccount={this.linkAccount} 
          reinitializeAccount={this.reinitializeAccount} 
        />
      </div>
    );
  }
}

export default App;
