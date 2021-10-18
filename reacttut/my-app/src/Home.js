import React,{Component} from 'react';

export class Home extends Component{

    render(){
        return(
            <div>
                <center><h4>Task - Create a simple website with two pages: 1) List of Users 2) List of Groups for Users</h4></center>
<br></br>

<h4>Description of the first page:</h4>
List of Users consist of: username, created, group, actions.<br></br>
username – User nickname<br></br>
created – Date of creating the user<br></br>
group - Group, to which the user will be added<br></br>
actions – two buttons 'Edit' and 'Delete'<br></br>

Also, under the list there should be a button ‘Add User'
for editing and adding new pages with such fields: username (text input) and group(select)
<br></br><br></br>
<h4>Description of the second page:</h4>

The list of groups should consist of: ID, Name, Description, Actions.<br></br>
Actions – Edit and Delete buttons<br></br>
Also, under the list there should be a button `Add Group`
For editing and adding new pages with such fields: Name (text input) and Description (text input).
Group deletion is impossible if the user is assigned to this group.

            </div>
        )
    }
}