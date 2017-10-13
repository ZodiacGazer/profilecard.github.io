class Output extends React.Component {
		  render(){
		    return(
		      <div className="card">
		        <div className="card__image">
		          <img className="image" src={this.props.data.avatar} />
		        </div>
		        <div className="small__info">
		          <div className="login">{this.props.data.login}</div>
		          <div className="name">{this.props.data.name || this.props.data.login}</div>
		        </div>
		        <div className="card__info">
		          <div className="repos"><i className="glyphicon glyphicon-briefcase"></i><br /><span className="number">Repos: {this.props.data.repos}</span></div>
		          <div className="followers"><i className="glyphicon glyphicon-user"></i><br /><span className="number">Followers: {this.props.data.followers}</span></div>
		          <div className="following"><i className="glyphicon glyphicon-headphones"></i><br /><span className="number">Following: {this.props.data.following}</span></div>
		        </div>
		      </div>
		    )
		  }
		}

		class Input extends React.Component {
		  constructor(props){
		    super(props);
		    this.handleSubmit  = this.handleSubmit.bind(this);
		    this.handleChange  = this.handleChange.bind(this);
		    this.animateSearch = this.animateSearch.bind(this);
		    
		  }
		  
		  handleSubmit(e){
		   this.props.onHandleSubmit(e);
		  }
		  handleChange(e){
		    this.props.onHandleChange(e.target.value);
		  }
		  animateSearch(){
		    document.querySelector('.form__input').classList.toggle('search-active');
		  }
		  render(){
		    return(
		      <div className="form">
		        <form onSubmit={this.handleSubmit}>
		          <input className="form__input" type="text" value={this.props.value} onChange={this.handleChange}/>
		          <span className="glyphicon glyphicon-search" onClick={this.animateSearch}></span>
		        </form>
		      </div>
		    )
		  }
		}

		class App extends React.Component {
		  constructor(props){
		    super(props);
		    this.handleSubmit = this.handleSubmit.bind(this);
		    this.handleChange = this.handleChange.bind(this);
		    this.state = {
		      value: '',
		      login: '',
		      avatar: '',
		      following: '',
		      followers: '',
		      name: ''
		    }
		  }
		  handleSubmit(e){
		    e.preventDefault();
		    fetch(this.props.data + this.state.value)
		    .then((res)  => {
		      if(res.ok){
		        return res.json();
		      }
		      if(res.status == '404'){
		        throw new Error(this.setState({
		         login: 'Not found',
		          value: '',
		          avatar: 'https://cdn.tutsplus.com/net/uploads/2013/08/github-collab-retina-preview.gif',
		          name: '',
		          repos: '',
		          followers: '',
		          following: ''
		        }));
		      }
		    })
		    .then((data) => {
		    this.setState({
		      value: '',
		      login: data.login,
		      avatar: data.avatar_url,
		      followers: data.followers,
		      following: data.following,
		      repos: data.public_repos,
		      name: data.name
		      });
		    })
		    .catch((err) => console.log('There was a problem'+ err.message))
		  }
		  handleChange(newValue){
		    this.setState({
		      value: newValue
		    })
		  }
		  componentDidMount(){
		    fetch(this.props.data+'zodiacgazer')
		    .then((res)  => res.json())
		    .then((data) => {
		      this.setState({
		        login: data.login,
		        avatar: data.avatar_url,
		        followers: data.followers,
		        following: data.following,
		        repos: data.public_repos,
		        name: data.name
		      })
		    })
		  }
		  render(){
		    return(
		      <div className="container">
		        <div className="phone">
		          <div className="cam"></div>
		          <div className="speaker"></div>
		          <div className="input__layout">
		            <Input
		                    value={this.state.value}
		                    onHandleSubmit={this.handleSubmit}
		                    onHandleChange={this.handleChange}/>
		          </div>
		          <Output data={this.state}/>
		        </div>
		      </div>
		    )
		  }
		}

		let query = 'https://api.github.com/users/';

		ReactDOM.render(
		<App data={query} />,
		document.getElementById("root")
		);