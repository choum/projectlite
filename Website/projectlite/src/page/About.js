import React, { Component } from 'react';

import { Header } from '../component/Header';
import { Footer } from '../component/Footer';
import { RootContainer, Container, CardContainer } from '../component/Container';

class About extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <RootContainer>

                    <Container>

                    </Container>

                </RootContainer>
                <Footer />
            </React.Fragment>

        );
    }
}

export default About;