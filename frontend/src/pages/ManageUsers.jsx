import { useEffect, useState } from "react";
import api from "../services/api";
import PageHeader from "../components/PageHeader";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      const data = res.data.data || res.data;
      setUsers(Array.isArray(data) ? data : data.users || []);
    } catch (error) {
      console.error("Unable to load users:", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const changeRole = async (id, role) => {
    try {
      await api.patch(`/admin/users/${id}/role`, { role });
      loadUsers();
    } catch {
      alert("Unable to update user role.");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/admin/users/${id}`);
      loadUsers();
    } catch {
      alert("Unable to delete user.");
    }
  };

  return (
    <div className="page-container">
      <PageHeader title="Manage Users"
        description="View and manage registered users." />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select value={user.role}
                    onChange={(e) => changeRole(user._id, e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => deleteUser(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && <p>No users available.</p>}
      </div>
    </div>
  );
}

export default ManageUsers;
