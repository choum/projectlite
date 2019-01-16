import * as React from "react";

export default function withSelect(Component, data) {
  return class WithSelect extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        select: false
      };
    }

    render() {
      console.log(this.state.value);
      return (
        <input type="checkbox" value="clicked">
          <Component {...this.props} />
        </input>
      );
    }
  };
}
