import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    contacts: []
  }

  /*NOTE: this method below will import your contact from the database*/
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }

  /*NOTE: this method bellow will delete the contacts from your page */
  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))
    // NOTE: this code below will delete the contacts from the database you have, without this code your page will have the contacts again with refershing the page. If you have this code below you will need to restart that backend server to have your contact again

    ContactsAPI.remove(contact)
  }

    // NOTE: This method will create on our contact API
    createContact(contact) {
      ContactsAPI.create(contact).then(contact => {
        this.setState(state => ({
          contacts: state.contacts.concat([ contact ])
        }))
      })
    }


  // NOTE: this method will render our Component to the main page and with that we can see them in our localhost
  render() {
    return (
      <div>
        {/*NOTE: this will render the contacts shows page when the path matches the one below*/}
        <Route exact path='/' render={() => (
          <ListContacts
            DeleteContacts={this.removeContact}
            contacts={this.state.contacts}
          />
        )}/>
            {/*NOTE: this will render the CreateContact component when the routes matches*/}
            <Route path='/create' render={({ history }) => (
              <CreateContact
                onCreateContact={(contact) => {
                  this.createContact(contact)
                  history.push('/')
                }}
              />
            )}/>
          </div>
        )
      }
    }


export default App;
