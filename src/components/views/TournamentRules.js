import React from 'react';
import { HashLink } from 'react-router-hash-link';

const TournamentRules = (props) => {
  const content = props.content;
  return (
    <div className="container">
      <h3 className="tour-title text-center">{content.titleRules}</h3>
      <div className="custom-section sec-short">
        <p>{content.txtRlsMain}</p>
        <h3>{content.titleRls1}</h3>
        <p>{content.txtRls1}</p>
        <h3>{content.titleRls2}</h3>
        <p>{content.txtRls2}</p>
        <h3>{content.titleRls3}</h3>
        <p>{content.txtRls3}</p>
        <h3>{content.titleRls4}</h3>
        <p>{content.txtRls4}</p>
        <h3>{content.titleRls5}</h3>
        <p>{content.txtRls5}</p>
        <h3>{content.titleRls6}</h3>
        <p>{content.txtRls6}</p>
      </div>
      <HashLink to="/tournament#rules" className="btn custom-btn custom-btn-lg">{content.btnBack}</HashLink>
    </div>
  )
}

export default TournamentRules
