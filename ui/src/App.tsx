import React from "react";
import "./App.css";
import Web3 from 'web3'
import Account from "./Components/Account"
import UserList from "./Components/UserList";
import Home from './Components/Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GRID_ADDRESS, GRID_ABI } from './config' 
// may need to adjust types in 'ui/node_modules/web3-utils/types/index.d.ts'
// specifically allow AbiType and MutabilityType to accept string 

class App extends React.Component<{}, {account: string, accounts: string[], grid: any}> {
  state = { account: '', accounts: [], grid: undefined }

  componentDidMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(/*Web3.givenProvider ||*/ "http://127.0.0.1:7545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0], accounts: accounts })
    const grid = new web3.eth.Contract(GRID_ABI, GRID_ADDRESS)
    this.setState({ grid })
  }

  render() {
    return (
      <div className="App">
        <Account account={this.state.account} />
        <Router>
            <Switch>
              <Route exact path='/' render={(props) => <Home {...props} accounts={this.state.accounts} />} />
              <Route path={'/user/:address'} render={(props) => <UserList {...props} account={this.state.account} grid={this.state.grid} />} />
              <Route path="*" component={() => (<div>Not Found</div>)} />
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
