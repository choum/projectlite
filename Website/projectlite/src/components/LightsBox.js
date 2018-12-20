import React from "react";
import { BorderCard } from "./Card";
import "./LightBoxCSS.css";
const LightsBox = ()=> (
    <BorderCard >
      <h2 className="name">Cluster Name</h2>
      <div className="cluster">
        <div className="row">
          <div className="hexagon">
          </div>
          <div className="hexagon">
          </div>
        </div>
      <div class="row" id="two">
        <div className="hexagon" id="3">
        </div>
        <div className="hexagon" id="4">
        </div>
        <div className="hexagon" id="5">
        </div>
      </div>
      </div>
  </BorderCard>
)

export default LightsBox;
