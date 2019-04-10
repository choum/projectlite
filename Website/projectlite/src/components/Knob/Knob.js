import React, { Component } from 'react'
import styled from "styled-components";
import PropTypes from 'prop-types';


const KnobWrapper = styled.div`
position: relative;
background: grey;
border-radius: 50%;
`
const KnobHandler = styled.span`
  position: absolute;
  left: 50%;
  margin-left: -1.5px;
  width: 3px;
  height: 200px;
  background: transparent;
  transform-origin: center;
  transform: rotate(90deg);

  ::after {
    content: ' ';
     display: block;
     position: absolute;
     top: 0;
     left: 0;
     z-index: 2;
     width: 100%;
     height: 25%;
     background: white;
  }
`


class Knob extends Component {
  static propTypes = {
    value: PropTypes.number,
    // The radius in pixels
    radius: PropTypes.number
  };

  static defaultProps = {
    value: 0,
    radius: 25
  };

  constructor(props) {
    super(props);
    this.box  = React.createRef();
    this.state = {
      isDragging: false,
      deg: 0
    }
  }

  onMouseDown = (e) => {
    e.preventDefault();
    this.setState({ isDragging: true });
  };

  onMouseUp = (e) => {
    e.preventDefault();
    this.setState({ isDragging: false });
  };

  onMouseMove = (e) => {
    const { radius } = this.props;
    if (this.state.isDragging) {
      const box = this.box.current.getBoundingClientRect();

      const mPos = {x: e.clientX - box.left, y: e.clientY - box.top};

      const atan = Math.atan2(mPos.x-radius, mPos.y-radius);
      let deg = -atan/(Math.PI/180) + 180;
      // final (0-360 positive) degrees from mouse position
            // for attraction to multiple of 90 degrees
      if(deg === 360) deg = 0;

      this.setState({ deg })
    }
  };

  handleChange = (e) => {
    const deg = e.target.value;
    this.setState({ deg })
  };

  render() {
    const { deg } = this.state;
    const { radius } = this.props;
    return (
      <div className="row">
        <div className="col-md-8">
          <label>Angle (&#176;)</label>
          <input
            onChange={this.handleChange}
            value={Math.round(deg)}
            min="0"
            max="360"
            type="number"
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <br/>
          <div ref={this.box}>
          <KnobWrapper
            style={{
              width: `${2*radius}px`,
              height: `${2*radius}px`
            }}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            onMouseMove={this.onMouseMove}
          >
            <KnobHandler
              style={{
                transform: `rotate(${deg}deg)`,
                height: `${2*radius}px`
              }}
              />
          </KnobWrapper>
          </div>

        </div>
      </div>
    );
  }
}
export default Knob;
