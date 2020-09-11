import React from 'react';

import '../../styles/pages/pages.css';

export default class Pages extends React.Component {
  isActivePageSelected = (page) => {
    const { activePage } = this.props;
    let name = page.name.substring(0, 12);

    if (page.name.length > 12) {
      name += "...";
    };

    if (name === activePage) {
      return " selected";
    };

    return "";
  };

  buildPages = (page, idx) => {
    let name = page.name.toLowerCase();

    return(
      <div key={idx} className={`page${this.isActivePageSelected({name})}`}>
        <div className="container">
          <p> {page.data} </p>
        </div>
      </div>
    );
  };

  render() {
    const { appData, transitionOut } = this.props;

    return (
      <div className={`pages${transitionOut === true ? " pagesFadeOut" : ""}`}>
        {appData.map(this.buildPages)}
      </div>
    );
  };
};
