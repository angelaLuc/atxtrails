import React, { Component } from "react";
import UrbanTrails from "../trails/urban-trails";

class App extends Component {
  render() {
    return (
      <div data-testid="app-wrapper" className="container-fluid no-padding">
        <nav className={"app-title"}>
          Urban Trails (Austin, TX) - 2018<span
            className="float-right"
            style={{ marginRight: 8 }}
          >
            <a
              data-testid="github-link"
              href={"https://github.com/angelaLuc/atxtrails"}
            >
              <i className="fab fa-github" />
            </a>
          </span>
        </nav>
        <div className={"app"}>
          <UrbanTrails />
        </div>
      </div>
    );
  }
}

export default App;
