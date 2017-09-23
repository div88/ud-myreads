import React, { Component } from 'react';
import CurrentlyReadingBooks from './CurrentlyReadingBooks.js'
import WantToReadBooks from './WantToReadBooks.js'
import ReadBooks from './ReadBooks.js'
import * as BooksAPI from './BooksAPI.js'
import './App.css';

class App extends Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  render() {
    return (
      <div>
        <div className="list-books-title">
          <h2>My Reads</h2>
        </div>
        <div>
          <CurrentlyReadingBooks books={ this.state.books }></CurrentlyReadingBooks>
          <WantToReadBooks></WantToReadBooks>
          <ReadBooks></ReadBooks>
        </div>
      </div>
    );
  }
}

export default App;
