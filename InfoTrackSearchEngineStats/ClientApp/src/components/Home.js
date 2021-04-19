import React, { Component } from 'react';
import {Button, Form} from 'react-bootstrap';
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
          <div>
              <label>The search results are in   </label>
              {this.state.searchResults.map(position =>  position)}
          </div>
      </div>
    );
  }
}
