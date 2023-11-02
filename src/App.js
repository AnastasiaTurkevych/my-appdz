import './App.css';
import React from 'react';
import DataService from './DataService';




class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  toggleExpanded = () => {
  this.setState ((prevState) => ({
    expanded: !prevState.expanded,
  }));
}


  render() {
    const { contact } = this.props
    const { name, phoneNumber, email, address, image } = contact;
    const { expanded} = this.state;
    return (
      <div className="user">
        <div className='user-card'>
          <img src={image} alt={this.props.name} />
          <div className="user-info">
            <h3>{name}</h3>
            <p>{phoneNumber}</p>
          </div>
          <div className="user-actions">
            <button onClick={this.toggleExpanded}>
            {expanded ? 'Less' : 'More'}
            </button>
          </div>

        </div>
        {expanded && (
            <div className="user-allinfo">
            <p>{email}</p>
            <p>{address}</p>
          </div>

        )}
      
      </div>
    )


  }

}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }

  onSearchHandler = (e) =>{
    const searchQuery = e.target.value;
    this.setState ({searchQuery}, () => {
      this.props.filterListProps(searchQuery)


    });
  }

  render() {
    return (
      <div className="search-box">
      <input type="text" placeholder='Search' value={this.state.searchQuery} onChange={this.onSearchHandler} />
    </div>
      
    )
  }

}

class ContactList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      items: props.contacts,
      searchQuery: '',
    }
  }

  filterList = (text) => {

    let filtredList = this.props.contacts.filter((item) => {
      return (
         item.name.toLowerCase().includes(text.toLowerCase()) ||
      item.phoneNumber.includes(text))
    })

    this.setState({
      items: filtredList,
      searchQuery: text,
    })

  }


  render() {
    const { items } = this.state;

    return (
    <div className="container">
     <Search filterListProps = {this.filterList}/>

     <div className="contact-list">
        {items.map((contact) => {
            return <Contact
              key={contact.id}
              // name={contact.name}
              // phoneNumber = {contact.phoneNumber}
              // image={contact.image}
              // email={contact.email}
              // address={contact.address}
              contact={contact}



            />

          })
        }
      </div>

    </div>)



  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    DataService.getItems()
      .then((response) => {
        this.setState({ contacts: response.data });
      })
      .catch((error) => {
        this.setState({ error });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { contacts, isLoading, error } = this.state;
    
    if (error){
      return <p>{error.message}</p>;
    } else  if (isLoading) {
      return <div>Loading....</div>;}
      else  
    return (
      <div className="App">
        <ContactList contacts={contacts} />
      </div>
    );
  }
}

export default App;