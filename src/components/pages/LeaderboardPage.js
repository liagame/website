import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

import Table from '../views/Table';
import Popup from '../views/Popup';
import UploadBotForm from '../forms/UploadBotForm';

import data from '../../assets/LeaderboardData';

class LeaderboardPage extends Component {
  constructor(props){
		super(props);
    this.state = {
      showUploadPopup: false,
    };
  }

  onBotUploadClick = () => {
    this.setState({
      showUploadPopup: true
    });
  }
  onBotUploadClose = () => {
    this.setState({
      showUploadPopup: false
    });
  }

  onBotUpload = () => {
    this.setState({
      showUploadPopup: false
    });
  }

  render(){
    const leaderboardColumns = [{
      dataField: 'rank',
			text: 'Rank'
    }, {
      dataField: 'name',
			text: 'Name'
    }, {
      dataField: 'elo',
			text: 'Elo'
    }, {
      dataField: 'tier',
			text: 'Tier'
    }, {
      dataField: 'organization',
      text: 'Organization'
    }, {
      dataField: 'language',
      text: 'Language'
    }];

    return (
      <div>
        <Button id="btn-upload" bsSize="large" onClick={this.onBotUploadClick}>Upload your bot</Button>
        <h2>LeaderBoard</h2>
        <Table data={data} columns={leaderboardColumns} keyField="name" />

        <Popup
          dialogClassName="upload-bot"
          show={this.state.showUploadPopup}
          onHide={this.onBotUploadClose}
          onButtonClick={this.onBotUpload}
          heading="Upload Bot"
          buttonText="Upload"
        >
          <UploadBotForm />
        </Popup>
      </div>
    )
  }

}

export default LeaderboardPage;