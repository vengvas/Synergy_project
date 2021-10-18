import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddUserModal} from './AddUserModal';
import {EditUserModal} from './EditUserModal';

export class User extends Component{

    constructor(props){
        super(props);
        this.state={users:[], addModalShow:false, editModalShow:false, groups:[]}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'user')
        .then(response=>response.json())
        .then(data=>{
            this.setState({users:data});
        });
    }

    componentDidMount(){
    fetch(process.env.REACT_APP_API+'group')
        .then(response=>response.json())
        .then(data=>{
            this.setState({groups:data});
        })
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteUser(user_id){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'user/'+user_id,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    }
    render(){
        const {users, user_id, user_name, group, date}=this.state;

        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Group</th>
                        <th>Date of registration</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user=>
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{this.state.groups.map(group=>
                            {if (group.id == user.group) {return group.name }})}</td>
                                <td>{user.date}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        user_id:user.id, user_name:user.name, group:user.group, date:user.date})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteUser(user.id)}>
            Delete
        </Button>

        <EditUserModal show={this.state.editModalShow}
        onHide={editModalClose}
        user_id={user_id}
        user_name={user_name}
        group={group}
        date={date}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add User</Button>

                    <AddUserModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}