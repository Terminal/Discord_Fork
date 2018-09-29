import React from 'react';

class Loading extends React.Component {
  render() {
    return (
      <div>
        <div className="loader">Loading...</div>
        <noscript>
          <h2>This website should be compatible without JavaScript.</h2>
          <p>Please create an issue with us on GitHub.</p>
        </noscript>
      </div>
    );
  }
}

export default Loading;
