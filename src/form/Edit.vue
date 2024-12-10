<template>
  <div class="card card-body mt-4">
    <h3 class="text-lg font-semibold mb-4">Edit User</h3>
    <form @submit.prevent="update">
      <!-- Name Input -->
      <div class="form-group mb-3">
        <label for="name" class="font-medium">Name</label>
        <input id="name" v-model="form.name" class="form-control border-2 border-gray-400 rounded-md p-2 mt-1"
          required />
      </div>

      <!-- Email Input -->
      <div class="form-group mb-3">
        <label for="email" class="font-medium">Email</label>
        <input id="email" v-model="form.email" type="email"
          class="form-control border-2 border-gray-400 rounded-md p-2 mt-1" required />
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Update
      </button>
    </form>
  </div>
</template>




<script>
import { reactive, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getUser, updateUser } from '../views/firebase';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userId = computed(() => route.params.id);

    const form = reactive({ name: '', email: '' });
    const isLoading = reactive({ fetching: false, updating: false });

    onMounted(async () => {
      try {
        isLoading.fetching = true;
        const user = await getUser(userId.value);
        if (user) {
          form.name = user.name;
          form.email = user.email;
        } else {
          alert('User not found.');
          router.push('/'); // Redirect if user not found
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        alert('Failed to load user data.');
      } finally {
        isLoading.fetching = false;
      }
    });

    const update = async () => {
      try {
        isLoading.updating = true;
        await updateUser(userId.value, form);
        alert('User updated successfully!');
        router.push('/'); // Redirect after update
      } catch (error) {
        console.error('Error updating user:', error);
        alert('Failed to update user.');
      } finally {
        isLoading.updating = false;
      }
    };

    return { form, update, isLoading };
  },
};
</script>
