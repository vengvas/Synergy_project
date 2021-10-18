import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import {Group} from './Group';

export class AddUserModal extends Component{
    constructor(props){
        super(props);
        this.state={groups:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

        componentDidMount(){
        fetch(process.env.REACT_APP_API+'group')
        .then(response=>response.json())
        .then(data=>{
            this.setState({groups:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        let res = 0
        for (let elem of this.state.groups) {
        if (elem.name == event.target.group.value) {
            res = elem.id}
        }
        fetch(process.env.REACT_APP_API+'user',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:event.target.name.value,
                group:res,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add User
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>name</Form.Label>
                        <Form.Control type="text" name="name" required
                        placeholder="name"/>
                    </Form.Group>

                   <Form.Group controlId="group">
                        <Form.Label>group</Form.Label>
                        <Form.Control as="select">
                         {this.state.groups.map(group=>
                            <option key={group.id}>{group.name}</option>)}
                        </Form.Control>
                    </Form.Group>


                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add User
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Modal.Body>

    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}