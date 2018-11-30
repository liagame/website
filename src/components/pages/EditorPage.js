import React, { Component } from 'react';
import { Row, Col, Button, ButtonToolbar, SplitButton, MenuItem, Modal } from 'react-bootstrap';
import MonacoEditor from 'react-monaco-editor';

import Replay from '../views/Replay';
import { programmingLanguages } from '../../utils/constants/programmingLanguages';


class EditorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      currentLang: "python3",
      currentLog: "",
      currentReplayFileBase64: "",
      generatingGame: false,
      editor: null,
    };
  }

  componentDidMount = () => {
    this.changeLanguage(this.state.currentLang);
  }


  onChange = (newValue, e) => {
    this.setState({ code: newValue });
  }

  changeLanguage = (lang) => {
    let langData = programmingLanguages[lang];

    // Store current language
    this.setState({ currentLang: lang});

    //ASK what does the return do
    fetch(langData.baseBotUrl)
      .then((resp)=>{ return resp.text() })
      .then((text)=>{
          this.setState({ code: text });
      });
  };

  generateGame = async () => {
    // Let the user know that the game is being generated
    this.setState({
      generatingGame: true
    });

    // Generate replay
    const response = await fetch('https://editor.cloud1.liagame.com/generate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          language: this.state.currentLang,
          code:     this.state.code
      })});
    const json = await response.json();

    // TODO handle if there is an error!
    let trackingId = json['trackingId'];

    // Fetch results
    for (let i = 0; i < 60; i++) {
      const response = await fetch('https://editor.cloud1.liagame.com/results/' + trackingId, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
          }});
      const json2 = await response.json();

      // Update current logs
      // TODO apend Generating a new game. This may take up to 20 seconds...
      // if fetch always returns full log: YES
      this.setState({ currentLog: json2['game']['log'] });

      if (json2['game']['finished']) {
          // Display new replay file
          this.setState({
            currentReplayFileBase64: json2['game']['replay'],
            generatingGame: false
          });
          return;
      }

      await this.sleep(500);
    }

    console.error("Failed to fetch game results in time.")

  };

  sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  render() {
    // TODO beautify this
    const { code, currentLang, generatingGame } = this.state;
    const highlighting = programmingLanguages[currentLang].highlighting;

    const options = {
      selectOnLineNumbers: true,
      fontSize: 12,
      scrollBeyondLastLine: false
    };

    return (
      <div>
        <div>
          <Row>
            <Col md={6}>
              <Row>
              <MonacoEditor
                width="100%"
                height="800"
                language={highlighting}
                theme="vs-dark"
                value={code}
                options={options}
                onChange={this.onChange}
              />
              </Row>
              <Row>
                <Col md={2}>
                  <ButtonToolbar>
                    <SplitButton title={currentLang} dropup id="split-button-dropup">
                      <MenuItem eventKey="1" bsStyle="primary" onClick={() => this.changeLanguage("python3")} type="button">Python3</MenuItem>
                      <MenuItem eventKey="2" bsStyle="primary" onClick={() => this.changeLanguage("java")} type="button">Java</MenuItem>
                      <MenuItem eventKey="3" bsStyle="primary" onClick={() => this.changeLanguage("kotlin")} type="button">Kotlin</MenuItem>
                    </SplitButton>
                  </ButtonToolbar>
                </Col>
                <Col md={10}>
                  <Button bsStyle="success" onClick={() => this.generateGame()} type="button">PLAY</Button>
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              {/* Key resets the replay; instead of currentReplayFileBase64 do gameID */}
              <div key={this.state.currentReplayFileBase64}>
                { this.state.currentReplayFileBase64!=="" ? <Replay containerId="player" number={ 1 } replayFileBase64={ this.state.currentReplayFileBase64 } /> : null }
              </div>
            </Col>
            <Row>
              {/* Prints out currentLog while also replacing new lines with breaks; TODO use textbox*/}
              <Modal.Body style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>
                {this.state.currentLog.split('\n').map(function(item, key) {
                  return (
                    <span key={key}>
                      {item}<br/>
                    </span>
                  )
                })}.
                {generatingGame && <img width="150" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt=""/>}
              </Modal.Body>
            </Row>
          </Row>
        </div>
      </div>
    );
  }
}

export default EditorPage;
