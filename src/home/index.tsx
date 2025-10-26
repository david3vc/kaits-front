import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import useIcon from '../assets/user.png';
import type { JSX } from 'react';

const index = (): JSX.Element => {
	return (
		<Row>
			<Col>
				<Card>
					<Card.Header className="d-flex justify-content-between align-items-center bg-transparent fs-3 fw-bold">
						<span>Bienvenido al sistema</span>
					</Card.Header>
					<Card.Body>
						<Row>
							<Col lg={2}>
								<img src={useIcon} alt="" style={{ width: '100px' }} />
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default index;
