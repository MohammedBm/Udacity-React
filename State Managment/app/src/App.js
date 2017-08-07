import React, { Component } from 'react';
import ListContacts from './ListContacts.js'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {

  state = {
    screen: 'list', //list ,crate
    contacts: []
  }

  /*NOTE: this method below will import your contact from the database*/
  componentDidMount(){
    ContactsAPI.getAll().then((contacts)=>{
      this.setState({
        contacts
      })
    })
  }

  /*NOTE: this method bellow will delete the contacts from your page */
  remvoeContact = (contact)=>{
    this.setState((state)=>({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    // NOTE: this code below will delete the contacts from the database you have, without this code your page will have the contacts again with refershing the page. If you have this code below you will need to restart that backend server to have your contact again
    ContactsAPI.remove(contact)
  }

  // NOTE: this method will render our Component to the main page and with that we can see them in our localhost
  render() {
    return (
      <div ClassName ="app">
        {this.state.screen === 'list' &&(
          <ListContacts
             DeleteContacts = {this.remvoeContact} contacts={this.state.contacts}
             onNavigate= {()=>{
               this.setState({screen: 'create'})
             }}
            />
        )}
        {this.state.screen === 'create' && (
          <CreateContact></CreateContact>
        )}
      </div>
    )
  }
}

export default App;
