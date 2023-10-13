import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch('https://dummyjson.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.users)) {
          this.setState({ users: data.users, isLoading: false });
        } else {
          this.setState({ error: new Error('Invalid data format'), isLoading: false });
        }
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  render() {
    const { users, isLoading, error } = this.state;

    return (
      <div>
        <h1>Dummy Data</h1>
        {error && <div>Error: {error.message}</div>}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Sno</th>
                <th>Profile Pic</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>University</th>
                <th>Username</th>
                <th>IP</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={user.image} alt={`${user.firstName} ${user.lastName}`} width="50" />
                  </td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.gender}</td>
                  <td>{user.university}</td>
                  <td>{user.username}</td>
                  <td>{user.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default App;
