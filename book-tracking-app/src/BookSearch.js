import React, { Component } from 'react';
import PropTypes from 'prop-types'


import * as BooksAPI from './BooksAPI.js'
import './App.css';

class BookSearch extends Component {

  static propTypes = {
    updateShelf: PropTypes.func.isRequired
  }
state = {
  query: '',
  books: []
}

clearQuery = () => {
  this.setState({ query: '' })
}

search = (query) => {
  this.setState({ query: query.trim() })
  if(this.state.query) {
    BooksAPI.search(query,20).then((books) => {
      if(typeof books !== 'undefined'){
        if(books.error === "empty query") {
          console.log("No search results")
        } else {
          this.setState({ books })
        }
      }
    })
  }
}


  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search">Close</a>
          <div className="search-books-input-wrapper">
            <input
            type="text"
            placeholder="Search by title or author"
            value={this.state.query}
            onChange={(event) => this.search(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">

          <ul className='books-grid'>
            {this.state.books.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{
                      width: 128,
                      height: 193,
                      backgroundImage: typeof book.imageLinks !== "undefined" && typeof book.imageLinks.thumbnail !== 'undefined' ? `url(${book.imageLinks.thumbnail})` : `none` }}>
                    </div>

                  <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={(event) => this.props.updateShelf(book,event.target.value)}>
                      <option value="none">Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                  <p className="book-title">{book.title}</p>
                  <p className="book-authors">{book.authors}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
  )
  }
}

export default BookSearch;
