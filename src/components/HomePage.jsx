import React, { Component } from 'react'
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: '',
      quote: '',
      author: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    
    console.log(event);
    console.log(event.target.nodeName);
    const target = event.target;
    target.nodeName === 'SELECT' ? this.setState({lang: event.target.value}) : null;
    target.name === 'quote' ? this.setState({quote: event.target.value}) : null;
    target.name === 'author' ? this.setState({author: event.target.value}) : null;

  }
  handleSubmit(event) {
    event.preventDefault();

    const lang = this.state.lang;
    const quote = this.state.quote;
    const author = this.state.author;
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang,quote,author })
    };
    fetch('http://localhost:3000/quotes', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.id }));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Langue</label>
          <select type="text" onChange={this.handleChange}>
            <option value={''}>Choisissez la langue</option>
            <option value={'fr'}>🇫🇷</option>
            <option value={'en'}>🇬🇧</option>
          </select>        
          
        <label>Punchline</label>
          <input name='quote' type="text" onChange={this.handleChange}/>        
        <label>Auteur</label>
          <input name='author' type="text" onChange={this.handleChange}/>        
        <input type="submit" value="Envoyer" />
      </form>
    );
  }
}