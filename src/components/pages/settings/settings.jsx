import React from 'react';

export default class Settings extends React.Component {
  render() {
    const { pageData } = this.props;

    return (
      <div>
        <p> {pageData.info} </p>
      </div>
    );
  };
};
