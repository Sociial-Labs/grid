import React from "react";
import "./App.css";
import Web3 from 'web3'
import UserList from "./Components/UserList";

class App extends React.Component<{}, {account: string}> {
  state = { account: '' }

  componentDidMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(/*Web3.givenProvider ||*/ "http://127.0.0.1:7545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
  }

  render() {
    return (
      <div className="App">
        <UserList address={this.state.account} />
      </div>
    );
  }
}

export default App;
