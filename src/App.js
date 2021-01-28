import React from 'react'
import axios from 'axios'
import './App.css';

class App extends React.Component {
  state = {
    cardInfo: [],
    userInput: ''
    
  }
  componentDidMount(){
    axios.get('https://api.github.com/users/dylan-rinella')
          .then(res => {
              this.setState({
                  cardInfo: res.data,
                  gitImg: res.data.avatar_url,
                  gitId: res.data.id
              })
           })
          .catch(err => {
              console.log(err)
           })
  }

  handleChange = e => {
    this.setState({
        userInput: e.target.value
    })
  }
  
  handleClick = e => {
    e.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userInput}`)
            .then(res => {
                this.setState({
                    cardInfo: res.data,
                    gitImg: res.data.avatar_url,
                    gitId: res.data.id
                })
            }) 
  }

  render(){
    return (
    <>
      <div className='git-profile-container'>
        <h2>GitHub User Info</h2>
        <img src={this.state.gitImg} key={this.state.gitId} alt='img' />
        <h3>{this.state.cardInfo.name}</h3>
        <p>GitHub User Id: {this.state.gitId}</p>
        <p>Following: {this.state.cardInfo.following}</p>
        <p>Followers: {this.state.cardInfo.followers}</p>
        <p>Twitter: {this.state.cardInfo.twitter_username}</p>
        <p>Public Repo Amount: {this.state.cardInfo.public_repos}</p>

        <h3>Search for Users</h3>
        <form>
          <input onChange={this.handleChange} type='text' />
          <button onClick={this.handleClick}>Find User</button>

        </form>
      
      </div>
    </>
    )
  }








}

export default App;

