<template>
  <div class="card mt-4">
    <div class="card-header">
      <router-link to="/usercreate">
        <button class="btn btn-success btn-sm me-2 bg-green-300 rounded-md p-2">
          Add User
        </button>
      </router-link>
    </div>
    <div class="card-body p-0">
      <table class="table table-striped m-0">
        <thead class="table-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col" class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td class="text-center">
              <!-- Edit Button -->
              <router-link :to="`/edit/${user.id}`">
                <button class="btn btn-primary btn-sm me-2 bg-blue-300 rounded-md p-2">
                  Edit
                </button>
              </router-link>
              <button class="btn btn-danger btn-sm bg-red-300 rounded-md p-2" @click="handleDelete(user.id)">
                Delete
              </button>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import { useLoadUsers, deleteUser } from '../views/firebase';

export default {
  setup() {
    const users = useLoadUsers(); // Reactive list of users

    const handleDelete = async (id) => {
      if (confirm('Are you sure you want to delete this user?')) {
        try {
          await deleteUser(id);
          alert('User deleted successfully!');
        } catch (error) {
          console.error('Error deleting user:', error);
          alert('Failed to delete user.');
        }
      }
    };

    return { users, handleDelete };
  },
};
</script>
