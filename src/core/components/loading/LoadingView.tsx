import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const LoadingView = (): JSX.Element => {
	return (
		<>
			<Row className="page-titles">
				<Col className="col-auto">
					<Breadcrumb>
						<Breadcrumb.Item href="#">
							<span className="placeholder">Modulo global</span>
						</Breadcrumb.Item>
						<Breadcrumb.Item href="#">
							<span className="placeholder">Modulo</span>
						</Breadcrumb.Item>
						<Breadcrumb.Item active>
							<span className="placeholder">Detalle</span>
						</Breadcrumb.Item>
					</Breadcrumb>
				</Col>
				<Col className="d-flex justify-content-end align-items-center">
					<div>
						<Button variant="primary" size="sm" className="placeholder">
							Primary
						</Button>{' '}
						<Button variant="secondary" size="sm" className="placeholder">
							Secondary
						</Button>
					</div>
				</Col>
			</Row>
			<Row>
				<Col xs={12}>
					<Card aria-hidden="true">
						<Card.Header>Loading...</Card.Header>
						<Card.Body>
							<Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
								<Col>
									<h3 className="card-text placeholder-glow">
										<span className="placeholder col-12" />
									</h3>
								</Col>
								<Col>
									<h3 className="card-text placeholder-glow">
										<span className="placeholder col-12" />
									</h3>
								</Col>
								<Col>
									<h3 className="card-text placeholder-glow">
										<span className="placeholder col-12" />
									</h3>
								</Col>
								<Col>
									<h3 className="card-text placeholder-glow">
										<span className="placeholder col-12" />
									</h3>
								</Col>
								<Col>
									<h3 className="card-text placeholder-glow">
										<span className="placeholder col-12" />
									</h3>
								</Col>
								<Col>
									<h3 className="card-text placeholder-glow">
										<span className="placeholder col-12" />
									</h3>
								</Col>
								<Col>
									<h3 className="card-text placeholder-glow">
										<span className="placeholder col-12" />
									</h3>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default LoadingView;
