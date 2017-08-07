import React,{Component}  from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class ListContacts extends Component {
  static PropTypes = {
    contacts:PropTypes.array.isRequired ,
    DeleteContacts: PropTypes.func.isRequired
  }
  state = {
    query: ''
  }
  updateQuery = (query) =>{
    this.setState({ query: query.trim() })
  }


  clearQury = () =>{
    this.setState({query:''})
  }

  /*NOTE: this will render the Component that we wrote. We can export them to different pages*/
  render(){
    {/*NOTE: these here are varibles that we craeted for the things we have used multiple times. We used them to keep the code clean and simple */}
    const {contacts, DeleteContacts} = this.props
    const {query} = this.state

    {/*NOTE: This if statment below will check what the user wrote in the input filed and will show the result from here.*/}
    let showingContacts
    if(query){
      const match = new RegExp(escapeRegExp(query), 'i')
      showingContacts = contacts.filter((contact) => match.test(contact.name))
    } else {
      showingContacts = contacts
    }

    {/*NOTE: this code will sort the users by name*/}
    showingContacts.sort(sortBy('name'))

    {/*NOTE: this return here will render the Component we wrote*/}
    return (
      <div className = "list-contacts">
        <div className = "list-contacts-top">

          {/*NOTE: for search engine. This will render an input that you can write on*/}
          {/*NOTE: we changed our anchor tag to Link tags since from the `react-router-dom` library. This will let us go back and forth between our craete contact page and view contact page*/}
          <input
            className="search-contacts"
            type='text'
            placeholder='Search Contacts'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />

        {/*NOTE: this will let the user to add a contact list*/}
        <Link to ="/create"
              className = "add-contact"
          > Add Contact</Link>
        </div>

        {/*NOTE: this piece of code will show the user the total of the user that matches the input he wrote and the total of contact overall*/}
        {showingContacts.length !== contacts.length &&(
          <div className="showing-contacts">
            <span>Now Showing {showingContacts.length} of {contacts.length}</span>
            <button onClick={this.clearQury}>Show All</button>
          </div>
        )}

        {/*NOTE: Everything blow here is about showing the contact in your contact list*/}
        <ol className = 'contact-list'>
          {/*NOTE: this .map below will show all the contacts that are stroed in the database or an array or object*/}
          {/*NOTE: thess are the indivusual items that will be shown*/}
          {showingContacts.map((contact)=>(
            <li key={contact.id}
                className='contact-list-item'
               >
              <div
                className='contact-avatar'
                style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }}
              />
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              {/*NOTE: This is the button that will rmove the contact from the page or the database*/}
              <button
                onClick = {() => DeleteContacts(contact)}
                className='contact-remove'
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts
