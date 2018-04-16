import React, { Component } from 'react';
import { BrowserRouter, NavLink, Route,  } from 'react-router-dom';
import './App.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

let Router = BrowserRouter;

const PageFade = (props) => (
  <CSSTransition 
    {...props}
    classNames="fadeTranslate"
    timeout={1000}
    mountOnEnter={true}
    unmountOnExit={true}
  />
)

const firstChild = props => {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
};

let Mug = (props) => {
  let mugInfo = props.mugInformation;

  if (!props.loaded) {
    return (
      <h1>loading</h1>
    )
  } else {
    return (
      <NavLink to={"/mugs/:" + props.mugNumber}>
        <div className="mug">
          <img src={mugInfo._embedded["wp:featuredmedia"][0].source_url} alt=""/>
        </div>
      </NavLink>
    ) 
}
}

let Mugs = (props) => {
  let mugs = [];
  for (let i = 0; i < props.posts.length; i++) {
    mugs.push(<Mug key={i} mugInformation={props.posts[i]} mugNumber={i} loaded={props.loaded} />);
  }
  return (
    <div>
      {mugs.map(function(listValue){
		 return listValue;
		})}
    </div>
  )
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {},
      loaded: false
    }
  }

// test

componentDidMount() {
  fetch("http://amazonmug.local/wp-json/wp/v2/mugs?_embed")
	  .then(response => response.json())
	  .then(
	  data => {
		  this.setState({posts: data});
		  console.log(this.state.posts);
		}
	).then(
    data => {
      this.setState({loaded: true})
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
          <p className="App-intro">Welcome to React</p>
          <Mugs posts={this.state.posts} loaded={this.state.loaded} />
            <div className="singleMug">
            <Route path="/mugs/:id" render={(props) => (<MugPage mugNumber={props.match.params.id.substring(1)} mugInformation={this.state.posts[props.match.params.id.substring(1)]} loaded={this.state.loaded} {...props}/>)} />
          </div>
        </div>
      </Router>
    );
  }
}

const BasicExample = () => (
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>
);

let MugPage = (props) => {
  let mugInfo = props.mugInformation;

  if (!props.loaded) {
    return (
      <h1>loading</h1>
    )
  } else {
    return (
      <NavLink to={"/mugs/:" + props.mugNumber}>
        <div className="mug mugPage">
          <img src={mugInfo._embedded["wp:featuredmedia"][0].source_url} alt=""/>
          <h1>{mugInfo.title.rendered}</h1>
          <p>{mugInfo.content.rendered}</p>
          <a href={mugInfo.acf.link_to_mug}>Buy It Here!</a>
        <NavLink to="/">Back</NavLink>          
        </div>
      </NavLink>
    ) 
  }
}

export default App;
