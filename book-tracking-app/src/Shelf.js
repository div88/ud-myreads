import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Shelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  render() {
    return(
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
          <div className="bookshelf-books">
            <ul className='books-grid'>
              {this.props.books.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">

                    <div className="book-cover" style={{ width: 128, height: 193,
                      backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
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
      </div>
    )
  }
}

export default Shelf;
