import React from "react";
import "./App.css";
import Web3 from 'web3'
import Account from "./Components/Account"
import UserList from "./Components/UserList";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
        <Account account={this.state.account} />
        <Router>
            <Switch>
              <Route path={'/user/:address'} component={UserList} />
              <Route path="*" component={() => (<div>Not Found</div>)} />
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
