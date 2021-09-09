import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ShowBooks extends Component{

  static propTypes = {
  book:PropTypes.object.isRequired,
  handleBookShelfUpdate:PropTypes.func.isRequired,
  }
  render(){
    const { handleBookShelfUpdate,book } = this.props
    return(
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className='book-cover' style={{
                        backgroundImage: `url(${book.imageLink})`,width: 128, height: 188
                        }}/>
                        <div className="book-shelf-changer">
                            <select value = {book.shelf || 'None'}
                            onChange={(event)=>handleBookShelfUpdate(event.target.value,book.id)}>
                               <option value="move" disabled>Move to...</option>
                               <option value="currentlyReading">Currently Reading</option>
                               <option value="wantToRead">Want to Read</option>
                               <option value="read">Read</option>
                               <option value="None">None</option>
                            </select>
                        </div>
                    </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors || "No Authors Provided"}</div>
                  </div>
              </li>



    )
  }
}
export default ShowBooks
