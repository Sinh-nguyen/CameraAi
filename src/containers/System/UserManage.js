import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManage.scss";
import { createNewUserService, getAllUsers } from "../../services/userService";
import ModalUser from "./ModalUser";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
    };
  }
  // 1. Run coustructor to init state
  // 2. Did mount call api to set state
  // 3. Render(re-render)
  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  createNewUser=async(data)=>{
    try{
      let response=await createNewUserService(data)
      if(response&&response.errCode!==0){
        alert(response.errMessage)
      }else{
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false
        })
      }
    }catch(e){
      console.log(e)
    }
  }

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="user-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        <div className="title text-center">User Management</div>
        <div className="mx-1">
          <button
            className="btn btn-primary"
            onClick={() => this.handleAddNewUser()}
          >
            Add New Users
          </button>
        </div>
        <div className="user-table mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>DisplayName</th>
                <th>UserName</th>
                <th>Role</th>
                <th>Quantity Camera</th>
                <th>Active</th>
                <th>Action</th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.firstName}</td>
                      <td>{item.email}</td>
                      <td>{item.roleId}</td>
                      <td>{item.roleId}</td>
                      <td>{item.roleId}</td>
                      <td>
                        <button className="btn-edit">
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button className="btn-delete">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
