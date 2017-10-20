import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

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
        let mybooks = this.props.booksG
        for(var i =0; i< books.length; i++){
          var sbook = books[i];
          var mybook = mybooks.filter(book => book.id === sbook.id);
          console.log(mybook)
        if(mybook.length === 1){
          books[i].shelf = mybook[0].shelf
        }
        else{
          books[i].shelf = "none"
        }
        }
        this.setState({
          books: books
        })
        }
      }
    })
  }

}


  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/"className="close-search">Close</Link>
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
                      <option value="">Move to...</option>
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
