import React, { Component } from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


let Router = BrowserRouter;

const FadeTransition = ({shouldShow, timeout, classNames, children}) => {
	return (
		<CSSTransition
			timeout={timeout}
			classNames={classNames}
			in={shouldShow}>
			{children}
		</CSSTransition>
	)
}

let Mug = (props) => {
  let mugInfo = props.mugInformation;

  if (!props.loaded) {
    return (
      <h1>loading</h1>
    )
  } else {
    return (
      <NavLink  to={"/mugs/:" + props.mugNumber}>
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



class MugContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {},
      loaded: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      console.log("hey")
    }
  }

componentDidMount() {
  fetch("http://amazonmug.local/wp-json/wp/v2/mugs?_embed")
	  .then(response => response.json())
	  .then(
	  data => {
		  this.setState({posts: data});
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
          <TransitionGroup>
          <Route exact path="/mugs/:id" render={(props) => (<MugPage mugNumber={props.match.params.id.substring(1)} mugInformation={this.state.posts[props.match.params.id.substring(1)]} loaded={this.state.loaded} {...props}/>)} />
          </TransitionGroup>
          <Mugs posts={this.state.posts} loaded={this.state.loaded} />

        </div>
      </Router>
    );
  }
}

const App = (props) => {

  return (
    <div>
      <MugContainer/>
    </div>
  )
}

const Home = () => (
  <p>Home</p>
)

class MugPage extends Component {
  constructor(props) {
		super(props);
		this.state= {in: true}
	}

	componentWillUnmount() {
		this.setState({in: false});
	}

  render() {
    if (!this.props.loaded) {
      return (
        <h1>loading</h1>
      )
    } else {
      let mugInfo = this.props.mugInformation;    
      return (
        <FadeTransition
        timeout={1350}
        classNames="fadeTranslate"
        shouldShow={this.state.in}
        key="2">
        <NavLink to={"/mugs/:" + this.props.mugNumber}>
          <div className="mug mugPage">
            <img src={mugInfo._embedded["wp:featuredmedia"][0].source_url} alt=""/>
            <h1>{mugInfo.title.rendered}</h1>
            <p>{mugInfo.content.rendered}</p>
            <a href={mugInfo.acf.link_to_mug}>Buy It Here!</a>
          <NavLink to="/">Back</NavLink>          
          </div>
        </NavLink>
        </FadeTransition>
      ) 
    }
  }
}


export default App;




// import React, { Component } from 'react';
// import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

// let Router = BrowserRouter;

// const PageFade = (props) => (
//   <CSSTransition 
//     {...props}
//     classNames="fadeTranslate"
//     timeout={1000}
//     mountOnEnter={true}
//     unmountOnExit={true}
//   />
// )

// let Mug = (props) => {
//   let mugInfo = props.mugInformation;

//   if (!props.loaded) {
//     return (
//       <h1>loading</h1>
//     )
//   } else {
//     return (
//       <NavLink  to={"/mugs/:" + props.mugNumber}>
//         <div className="mug">
//           <img src={mugInfo._embedded["wp:featuredmedia"][0].source_url} alt=""/>
//         </div>
//       </NavLink>
//     ) 
// }
// }

// let Mugs = (props) => {
//   let mugs = [];
//   for (let i = 0; i < props.posts.length; i++) {
//     mugs.push(<Mug key={i} mugInformation={props.posts[i]} mugNumber={i} loaded={props.loaded} />);
//   }
//   return (
//     <div>
//       {mugs.map(function(listValue){
// 		 return listValue;
// 		})}
//     </div>
//   )
// }



// class MugContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       posts: {},
//       loaded: false
//     }
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.location !== this.props.location) {
//       console.log("hey")
//     }
//   }

// componentDidMount() {
//   fetch("http://amazonmug.local/wp-json/wp/v2/mugs?_embed")
// 	  .then(response => response.json())
// 	  .then(
// 	  data => {
// 		  this.setState({posts: data});
// 		}
// 	).then(
//     data => {
//       this.setState({loaded: true})
//     }
//   );
// }


//   render() {
//     return (
//       <Router>
//         <div className="App">
//           <header className="App-header">
//             <h1 className="App-title">Welcome to React</h1>
//           </header>
//           <p className="App-intro">Welcome to React</p>
//           <Mugs posts={this.state.posts} loaded={this.state.loaded} />
//           <TransitionGroup>
//       <PageFade key={this.props.locationKey}>
//           <Switch location={this.props.location}>
//           <Route path="/mugs/:id" render={(props) => (<MugPage mugNumber={props.match.params.id.substring(1)} mugInformation={this.state.posts[props.match.params.id.substring(1)]} loaded={this.state.loaded} {...props}/>)} />
//           </Switch>
//           </PageFade>
//           </TransitionGroup>

//         </div>
//       </Router>
//     );
//   }
// }

// const App = (props) => {
//   const locationKey = props.location.pathname

//   return (
//     <div>
//       <MugContainer locationKey={locationKey} location={props.location}/>
//     </div>
//   )
// }

// const Home = () => (
//   <p>Home</p>
// )

// let MugPage = (props) => {
//   let mugInfo = props.mugInformation;

//   if (!props.loaded) {
//     return (
//       <h1>loading</h1>
//     )
//   } else {
//     return (
//       <NavLink to={"/mugs/:" + props.mugNumber}>
//         <div className="mug mugPage">
//           <img src={mugInfo._embedded["wp:featuredmedia"][0].source_url} alt=""/>
//           <h1>{mugInfo.title.rendered}</h1>
//           <p>{mugInfo.content.rendered}</p>
//           <a href={mugInfo.acf.link_to_mug}>Buy It Here!</a>
//         <NavLink to="/">Back</NavLink>          
//         </div>
//       </NavLink>
//     ) 
//   }
// }

// const Wrapper = () => (
//   <Router>
//     <Route path="/" component={App} />
//   </Router>
// );


// export default Wrapper;



// import React from 'react'
// import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
// import { CSSTransition, TransitionGroup } from 'react-transition-group'
// import './App.css';


// const About = () => (
//   <p>About</p>
// )

// const NotFound = () => (
//   <p>404</p>
// )

// const Home = () => (
//   <p>Home</p>
// )


// const PageFade = (props) => (
//   <CSSTransition 
//     {...props}
//     classNames="fadeTranslate"
//     timeout={1000}
//     mountOnEnter={true}
//     unmountOnExit={true}
//   />
// )

// const Layout = ({ children }) => (
//   <section>
//     <nav>
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about">About</Link></li>
//         <li><Link to="/topics">Non existing</Link></li>
//       </ul>
//     </nav>
//     <hr />
//     {children}
//   </section>
// )

// const App = (props) => {
//   const locationKey = props.location.pathname

//   return (
//   <Layout>
//     <TransitionGroup>
//       <PageFade key={locationKey}>
//         <section className="fix-container">
//           <Switch location={props.location}>
//             <Route exact path="/" component={Home} />
//             <Route exact path="/about" component={About} />
//             <Route component={NotFound} />
//           </Switch>
//         </section>
//       </PageFade>
//     </TransitionGroup>
//   </Layout>
//   )
// }

// const BasicExample = () => (
//   <BrowserRouter>
//     <Route path="/" component={App} />
//   </BrowserRouter>
// );

// export default BasicExample;
