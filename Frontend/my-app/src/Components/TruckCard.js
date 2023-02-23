import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {TOGGLE_TRUCK} from "../Supporting Files/reducer";
import {Context} from "../Supporting Files/context";

const cardStyle = {
    margin: "8px auto",
    width: '300px',
    textColor: "black",
    textAlign: "center"
};

const cardImage = {
    width: "100%",
    height: "200px",
};

const unSelectedButtonStyle = {
    width: "100%"
};

const selectedButtonStyle = {
    width: "100%",
    backgroundColor: "green",
    borderColor: "green"
};

const moreLink = {
    textDecoration: 'none',
    color: "black"
};

const TruckCard = ({id, name, brand, image, capacity, price, isSelected}) => {
    const { dispatch } = useContext(Context)

    return (
            <Card style={cardStyle}>
                <Link to={`/rent/${id}`} style={moreLink}>
                    <Card.Img style={cardImage} className="img-fluid" variant="top" src={image} height={100} width={100}/>
                <Card.Body>
                    <Card.Title>{brand + " " + name}</Card.Title>
                </Card.Body>
                </Link>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Объём: {capacity}м<sup>3</sup></ListGroup.Item>
                    <ListGroup.Item>Стоимость: {price} р.</ListGroup.Item>

                    <Button variant="primary"
                            style={isSelected ? selectedButtonStyle : unSelectedButtonStyle}
                            onClick={() => dispatch({
                                type: TOGGLE_TRUCK,
                                payload: { id: id }
                            })}>
                        {isSelected ? "Выбрано" : "Выбрать"}
                    </Button>
                </ListGroup>
            </Card>
    );
}

export default TruckCard;