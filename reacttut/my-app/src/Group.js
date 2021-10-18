import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddGroupModal} from './AddGroupModal';
import {EditGroupModal} from './EditGroupModal';

export class Group extends Component{

    constructor(props){
        super(props);
        this.state={groups:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'group')
        .then(response=>response.json())
        .then(data=>{
            this.setState({groups:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteGroup(group_id){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'group/'+group_id,{
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
        const {groups, group_id, group_name, group_desc}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map(group=>
                            <tr key={group.id}>
                                <td>{group.id}</td>
                                <td>{group.name}</td>
                                <td>{group.description}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        group_id:group.id,group_name:group.name,group_desc:group.description})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteGroup(group.id)}>
            Delete
        </Button>

        <EditGroupModal show={this.state.editModalShow}
        onHide={editModalClose}
        group_id={group_id}
        group_name={group_name}
        group_desc={group_desc}/>
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Group</Button>

                    <AddGroupModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}