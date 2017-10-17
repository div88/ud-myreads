import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI.js';

class ReadBooks extends Component {
  state = {
    value: 'read'
  }
  updateQuery(book, event) {
    BooksAPI.update(book, this.state.value).then((books) => {
      console.log(this.state.value);
      console.log(book);
      this.setState({ books })
    })
  }
  render() {
    return (
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ul className='books-grid'>
                {this.props.books.map((book) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">

                      <div className="book-cover" style={{ width: 128, height: 193,
                        backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                      <div className="book-shelf-changer">
                        <select value={this.state.value} onChange={(event) => this.updateQuery(event.target.value)}>
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
        </div>
    )
  }
}

export default ReadBooks;
