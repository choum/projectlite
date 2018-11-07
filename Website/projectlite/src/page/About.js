import React, { Component } from 'react';

import { Header } from '../component/Header';
import { Footer } from '../component/Footer';
import { Container, CardContainer } from '../component/Container';

class About extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Header />

                <Footer />
            </Container>
        );
    }

};

export default About;