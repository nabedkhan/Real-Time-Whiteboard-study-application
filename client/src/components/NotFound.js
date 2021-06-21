import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <section className="custom-height d-flex align-items-center bg-primary">
            <Container>
                <Row>
                    <Col md={10} lg={6} className="text-center offset-md-1 offset-lg-3">
                        <Card body className="p-5">
                            <h1 className="text-danger">404</h1>
                            <h3 className="text-danger">Page Not Found</h3>
                            <Link to="/" className="btn btn-primary mt-5">Go Back</Link>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default NotFound;