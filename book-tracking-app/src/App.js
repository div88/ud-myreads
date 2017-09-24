import React, { Component } from 'react';
import CurrentlyReadingBooks from './CurrentlyReadingBooks.js'
import WantToReadBooks from './WantToReadBooks.js'
import ReadBooks from './ReadBooks.js'
import * as BooksAPI from './BooksAPI.js'
import './App.css';

class App extends Component {
  state = {
    books: [],
    showSearchPage: false
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search">Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              <ul className='books-grid'>
                {this.props.books.map((book) => (
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
                ))}
              </ul>
              </ol>
            </div>
          </div>
        ) : (
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
         <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>

    )}
    </div>
    )
  }
}

export default App;
