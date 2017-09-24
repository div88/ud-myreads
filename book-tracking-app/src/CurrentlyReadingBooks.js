import React, { Component } from 'react';

class CurrentlyReadingBooks extends Component {
  render() {
    console.log('Props', this.props);
    return(
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
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
                </div>
              </div>
            </div>
    )
  }
}

export default CurrentlyReadingBooks;
