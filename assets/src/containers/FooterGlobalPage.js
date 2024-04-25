import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Layout, Menu, Row, Col } from "antd";
import { footerTextRight } from "../util/config";

import Home from "./Home";

import "./index.css";

const { Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div style={{
        display: "block",
  padding: "20px",
  height: "60px",
  width: "100%"
      }}>
        <Footer
          style={{
           
            textAlign: "center",
            padding: "20px",
            position: "fixed",
            left: "0",
            bottom: "0",
            height: "60px",
            width: "100%"
          }}
        >
          <Row style={{ display: "flex" }}>
            <Col
              style={{
                fontSize: "14px",
                textAlign: "left",
                //  padding: "7px",
                // color: "white",
               
              }}
              span={8}
            >
              <a
                style={{  color: 'black !important' ,marginLeft:'8px'}}
                target="_blank"
                href="https://www.wishtreetech.com/"
                rel="noreferrer"
              >
                <b>{footerTextRight}</b>
              </a>
            </Col>

            <Col
              style={{
                fontSize: "14px",
                textAlign: "center",
                // padding: "7px",
                // color: "white",
              }}
              span={8}
            >
              <a
                style={{ color: "#545454" }}
                target="_blank"
                href="http://www.health.gov.fj/"
                rel="noreferrer"
              >
                NJIT
              </a>
            </Col>
            <Col
              style={{
                fontSize: "14px",
                textAlign: "right",
                // padding: "7px",
                // color: "white",
                marginLeft:'-5px'
                
              }}
              span={8}
            >
             <b>© Ministry of Health and Medical Services</b> 
            </Col>
          </Row>
        </Footer>
      </div>
    );
  }
}
export default App;
