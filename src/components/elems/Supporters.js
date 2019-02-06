import React from 'react';
import { Row, Col } from 'react-bootstrap';

import logoFri from '../../assets/logo_fri.png';
import logoGaraza from '../../assets/logo_garaza.png';

const Supporters = () => {
  return (
    <div>
      <Row>
        <Col md={3} mdOffset={3} sm={4} smOffset={2} xs={6}>
          <div>
            <a href="https://garaza.io/" target="_blank" rel="noopener noreferrer">
              <img id="logo-garaza" className="tour-logo" src={ logoGaraza } alt="Garaža" />
            </a>
          </div>
        </Col>
        <Col md={3} sm={4} xs={6}>
          <div>
            <a href="https://fri.uni-lj.si/" target="_blank" rel="noopener noreferrer">
              <img id="logo-fri" className="tour-logo" src={ logoFri } alt="FRI" />
            </a>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Supporters;
