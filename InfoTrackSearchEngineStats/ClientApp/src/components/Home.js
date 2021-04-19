import React, { Component } from 'react';
import {Button, Form, ListGroup} from 'react-bootstrap';
import { SearchEngineStatsClient } from '../HttpClients';


export class Home extends Component {
  static displayName = Home.name;
  state = {
      searchText: '',
      searchAddress: '',
      searchCount: '',
      searchResults: []
  }
  constructor(props) {
      super(props);
      this.getGoogleStats = this.getGoogleStats.bind(this);
      this.getBingStats = this.getBingStats.bind(this);
  }
  
  getGoogleStats = event => {
      SearchEngineStatsClient.googleStats(this.state.searchText, this.state.searchAddress)
          .then((response) => {
             this.setState({searchResults: response.searchPosition});
              this.setState({searchCount: response.occurrenceCount});
          });
  }

  getBingStats = event => {
        SearchEngineStatsClient.bingStats(this.state.searchText, this.state.searchAddress)
            .then((response) => {
                this.setState({searchResults: response.searchPosition});
                this.setState({searchCount: response.occurrenceCount});
            });
    }
    handleSearchTextChange = event =>{
        this.setState({ searchText: event.target.value});
    }

    handleSearchAddressChange = event =>{
        this.setState({ searchAddress: event.target.value});
    }
    
  
  render () {
    return (
      <div>
        <h1>Run SEO Stats</h1>
          <Form>
              <Form.Group controlId="searchText">
                  <Form.Label>Search Text</Form.Label>
                  <Form.Control type="text" placeholder="Enter Search Text" onChange= {this.handleSearchTextChange} />
              </Form.Group>

              <Form.Group controlId="searchAddress">
                  <Form.Label>Search Address</Form.Label>
                  <Form.Control type="url" placeholder="Enter Search Url"  onChange= {this.handleSearchAddressChange} />
              </Form.Group>

              <Form.Group className="col-md-6">
                  <Button onClick={this.getGoogleStats} variant="primary">Google </Button>{' '}
                  <Button onClick={this.getBingStats} variant="secondary">Bing</Button>{' '}
              </Form.Group>
          </Form>
          {this.renderSearchResults()}
      </div>
    );
  }
  
  renderSearchResults = () => {
      if((this.state.searchCount === '')){
          return(
              <div>
                <label> Please click on any of the search engine options </label>
              </div>
          );        
      } else if(this.state.searchCount !== 0){
          return(
              <div>
                  <label>Search Results Positions {' '} </label>
                  <ListGroup>
                    {this.state.searchResults.map(position => <ListGroup.Item variant="success">{position}</ListGroup.Item>)}
                  </ListGroup>
                  <label>Total Search count {this.state.searchCount} </label>
              </div>
          );
     } else {
          return(
              <div>
                  <label>Not found </label>
              </div>);
      }
  }
}
