import React from "react";

import { Header } from '../Header'

class LandingContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount: function(){
  document.body.style.backgroundColor = "green";
}

componentWillUnmount: function() {
  document.body.style.backgroundColor = null;
}

render() {
  return (
    <div className="background">
      <Header />
    </div>
  );
}
};

export default LandingContainer;