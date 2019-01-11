import React, { Component } from "react";

import { MainContainer, SlimContainer } from "../components/Container";
import CardContainer from "../components/Container/CardContainer";

import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip, faHome, faIndustry, faMobile, faBolt} from '@fortawesome/free-solid-svg-icons'

const widthAdjust = {
  width: '24px'
}


class About extends Component {
  render() {
    return (
      <MainContainer>
        <SlimContainer>
          <div className="row">
            <div className="col-md-12">
              <CardContainer type="bodyheader" title="About Us">
                <hr />
                What happens when an Electronic and Computer Engineer, a
                Software Engineer, and a Web Developer work together? We are
                students at Cal Poly Pomona determined to reinvent ambient
                lighting and sustainability. Our mission here at Project Lite is
                to create affordable but stunning and dummy proof technology
                that is eco-friendly. For now this project for us is just a
                dream, but in the future it may become a true reality.
              </CardContainer>
            </div>
          </div>
        </SlimContainer>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "#2C3D55" }}
            icon={<FontAwesomeIcon icon={faBolt} size="3x" color="white" style={widthAdjust}/>}
          >
            <h3 className="vertical-timeline-element-title">
              Working Prototype
            </h3>
            <p>
              Our goal is to make a physical prototype and software to show off
              at the Bronco Startup Competition
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "#3E4C5E" }}
            icon={<FontAwesomeIcon icon={faMobile} size="3x" color="white" style={widthAdjust}/>}
          >
            <h3 className="vertical-timeline-element-title">
              Mobile Application
            </h3>
            <p>We plan to convert our website over to a mobile application.</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "#536271" }}
            icon={<FontAwesomeIcon icon={faIndustry} size="2x" color="white" style={widthAdjust}/>}
          >
            <h3 className="vertical-timeline-element-title">
              Small Scale Production
            </h3>
            <p>We plan to make a small batch of lights</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "#6A687A" }}
            icon={<FontAwesomeIcon icon={faPaperclip} size="2x" color="white" style={widthAdjust}/>}
          >
            <h3 className="vertical-timeline-element-title">Corner Clip</h3>
            <p>Shhh. It's a secret!</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "#84828F" }}
            icon={<FontAwesomeIcon icon={faHome} size="lg" color="white" style={widthAdjust}/>}
          >
            <h3 className="vertical-timeline-element-title">Home Panel</h3>
            <p>Shhh. It's a secret!</p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </MainContainer>
    );
  }
}

export default About;
