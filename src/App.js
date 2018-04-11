import React, { Component } from 'react';
import { BrowserRouter, NavLink, Route,  } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
let Router = BrowserRouter;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: "hey"
    }
  }

componentDidMount() {
  fetch("http://amazonmug.local/wp-json/wp/v2/posts/1")
	  .then(response => response.json())
	  .then(
	  data => {
		  this.setState({posts: data});
		  console.log(this.state.posts);
		}
	);
 
}


  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
			{this.state.posts.date}
        </p>
      </div>
      </Router>
    );
  }
}

export default App;
