import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardText } from 'reactstrap';

import './stylesCardContainer.css';

const CardContainer = (props) => {
    return (
        <div className="wrapper2">
            <div className="row">
                <div className="col-md-4">
                    <Card>
                        <CardHeader>{props.title[0]}</CardHeader>
                        <CardBody>
                            <CardText>{props.content[0]}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card>
                        <CardHeader>{props.title[1]}</CardHeader>
                        <CardBody>
                            <CardText>{props.content[1]}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card>
                        <CardHeader>{props.title[2]}</CardHeader>
                        <CardBody>
                            <CardText>{props.content[2]}</CardText>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CardContainer;