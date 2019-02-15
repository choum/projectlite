import React from "react";

export default function withSelect(Component, clusterData) {
  return class WithSelect extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isSelected: false
      };
    }

    onClick() {
      this.setState({ isSelected: !this.state.isSelected });
    }

    render() {
      console.log(this.state.isSelected);
      return (
        <button onClick={e => this.onClick()}>
          <Component {...this.props} clusterData={clusterData} />
        </button>
      );
    }
  };
}
