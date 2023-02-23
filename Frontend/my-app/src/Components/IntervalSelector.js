import {Form} from "react-bootstrap";
import {useContext} from "react";
import {Context} from "../Supporting Files/context";
import {DATETIME_CHANGE} from "../Supporting Files/reducer";

const dateSelectorBlock = {
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    height: '120px'
};

const dateSelectorField = {
    width: '30%'
};

function IntervalSelector() {
    const { dispatch } = useContext(Context);

    return (
        <div>
            <Form className="row" style={dateSelectorBlock}>
                <Form className="col-6" style={dateSelectorField}>
                    <Form.Label>Дата заказа</Form.Label>
                    <Form.Control type="date" placeholder={new Date().toString()} onChange={event => dispatch({
                        type: DATETIME_CHANGE,
                        payload: { time: event.target.value }
                    })}/>
                </Form>
            </Form>
        </div>
    );
}

export default IntervalSelector;