import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

import * as BooksAPI from './BooksAPI.js'

class BookSearch extends Component {

state = {
  query: '',
  books: []
}

clearQuery = () => {
  this.setState({ query: '' })
}

updateQuery = (query) => {
  this.setState({ query: query.trim() })
  if(this.state.query) {
    BooksAPI.search(query).then((books) => {
      console.log(query);
      console.log(books);
      this.setState({ books })
    })
  }
}



  render() {
    const {books} = this.props
    const {query} = this.state
    // let bookList
    // if(this.state.query) {
    //   const match = new RegExp(escapeRegExp(this.state.query), 'i')
    //   bookList = books.filter((book) => match.test(book.name))
    //   bookList.sort(sortBy('title'))
    // } else {
    //   bookList = this.props.books
    // }

    {books.length == undefined || books.length == 0  && (
      <div className='showing-contacts'>
        <span>Now showing {books.length} for your search</span>
      </div>
    )}

    return (
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
            <ul className='books-grid'>
                {books.map((book) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">

                      <div className="book-cover" style={{ width: 128, height: 193,
                        backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                      <div className="book-shelf-changer">
                        <select>
                          <option value="none" disabled>Move to...</option>
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
                ))
              }
            </ul>
        </div>
      </div>
  )
  }
}

export default BookSearch;
