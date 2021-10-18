import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditUserModal extends Component{
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
        console.log(this.state.groups)
        let res = 0
        for (let elem of this.state.groups) {
        if (elem.name == event.target.group.value) {
            res = elem.id}
        }
        fetch(process.env.REACT_APP_API+'user',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:event.target.id.value,
                name:event.target.name.value,
                group:res,
                date:event.target.date.value,
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
            Edit User
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="id">
                        <Form.Label>id</Form.Label>
                        <Form.Control type="text" name="id" required
                        placeholder="id"
                        disabled
                        defaultValue={this.props.user_id}/>
                    </Form.Group>

                    <Form.Group controlId="name">
                        <Form.Label>name</Form.Label>
                        <Form.Control type="text" name="name" required
                        defaultValue={this.props.user_name}
                        placeholder="name"/>
                    </Form.Group>

                    <Form.Group controlId="group">
                        <Form.Label>group</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.group}>
                        {this.state.groups.map(group=>
                            <option key={group.id}>{group.name}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="date">
                        <Form.Label>date</Form.Label>
                        <Form.Control
                        type="date"
                        name="date"
                        disabled
                        required
                        placeholder="date"
                        defaultValue={this.props.date}
                        />


                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update User
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