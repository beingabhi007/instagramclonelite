import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from "reactstrap"


const Hero = () => {
    return(
        <Row>
        <Col lg={6}>
      <React.Fragment>
      <img className="p-3" 
           src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
           alt="instaLogo" />
      </React.Fragment>
        </Col> 
        <Col lg={6}>
      
        </Col>    
        </Row>
    )
}



export default Hero