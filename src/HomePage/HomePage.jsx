/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import "./HomePage.scss";

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-12 col-md-offset-0">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React!!</p>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                <table className={"react-table"}>
                    <thead>
                        <tr key={"header"}>
                            {generateHeaders()}
                        </tr>
                    </thead>

                    <tbody>
                        {users.items &&
                              users.items.map((user, index) => (
                                  <tr key={user.id}>
                                      <td>{user.firstName}</td>
                                      <td>{user.lastName}</td>
                                      <td>{user.birthday}</td>
                                      <td>{user.email}</td>
                                      <td>
                                          {
                                              user.deleting ? <em> - Deleting...</em>
                                                  : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                                      : <span> <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                          }
                                      </td>
                                  </tr>
                              ))
                        }
                    </tbody>
                </table>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

function generateHeaders() {
    const cols = [
        { key: "firstName", label: "First name" },
        { key: "lastName", label: "Last name" },
        { key: "birthday", label: "Birthday" },
        { key: "email", label: "Email" },
        { key: "actions", label: "Actions" }
    ];
    return cols.map(function(colData) {
        return <th key={colData.key}> {colData.label} </th>;
    });
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
