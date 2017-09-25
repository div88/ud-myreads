import React, { Component } from 'react';

import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

import CurrentlyReadingBooks from './CurrentlyReadingBooks.js'
import WantToReadBooks from './WantToReadBooks.js'
import ReadBooks from './ReadBooks.js'
import * as BooksAPI from './BooksAPI.js'
import './App.css';

class App extends Component {
  state = {
    books: [],
    query: ''
  }


  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  render() {


    return (
      <div>
        <Route path="/search" render = {({ history }) => (
        <div className="search-books">
          <div className="search-books-bar">
            <a className="close-search">Close</a>
            <div className="search-books-input-wrapper">
              <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}/>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
            <ul className='books-grid'>

            </ul>
            </ol>
          </div>
        </div>
      )}/>
      <Route exact path="/" render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h2>My Reads</h2>
          </div>
          <div>
              <div className="list-books-content">
                <CurrentlyReadingBooks books={ this.state.books }></CurrentlyReadingBooks>
                <WantToReadBooks books={ this.state.books }></WantToReadBooks>
                <ReadBooks books={ this.state.books }></ReadBooks>
              </div>
          </div>
          <div className="open-search">
            <Link to="/search" onClick={() => this.setState({ showSearchPage: true })}>Add a book</Link>
          </div>
        </div>
      )}/>

    </div>
      );
  }
}

export default App;
