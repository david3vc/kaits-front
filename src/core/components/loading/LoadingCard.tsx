import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

interface LoadingCardProps {
	className?: string;
}

const LoadingCard = ({ className }: LoadingCardProps): JSX.Element => (
	<Card aria-hidden="true" className={className ?? ''}>
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
);

export default LoadingCard;
