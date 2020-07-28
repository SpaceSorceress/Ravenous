import React from 'react';
import './App.css';

import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import Yelp from '../../util/Yelp';


class App extends React.Component {
  constructor(props){
    super(props);

    this.state={
      businesses:[],
      loading:false
    };
    this.searchYelp=this.searchYelp.bind(this);
    this.handleLoading=this.handleLoading.bind(this);
  }

  searchYelp(term,location,sortBy){
    Yelp.search(term,location,sortBy).then(businesses => {
        this.setState({businesses:businesses,
        loading:false});
    });
  }

  handleLoading(){
    this.setState({
      loading:true
    });
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp} loading={this.handleLoading}/>
        {this.state.loading && <Loader/>}
        <BusinessList businesses={this.state.businesses}/>
      </div>
    );
  }
}

export default App;
