<template>
  <div class="card card-body m-4">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="form.name" class="form-control border-2 border-gray-400 rounded-md ml-2"
          :disabled="loading" required />
      </div>

      <div class="form-group mt-3">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" class="form-control border-2 border-gray-400 rounded-md" type="email"
          :disabled="loading" required />
      </div>
      <button type="submit" class="mt-3 bg-sky-500 rounded-lg p-2 text-white" :disabled="loading">
        {{ loading ? 'Creating...' : 'Create' }}
      </button>


      <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
    </form>
  </div>
</template>


<script>
import { createUser } from '../views/firebase';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'; // Import Vue Router

export default {
  props: {
    closeModal: { type: Function, default: null }, // Optional prop to close modal
  },
  emits: ['userCreated'], // Emit event for parent component
  setup(props, { emit }) {
    const router = useRouter(); // Initialize Vue Router
    const form = reactive({ name: '', email: '' });
    const loading = ref(false); // Tracks loading state
    const error = ref(null); // Tracks error messages

    const onSubmit = async () => {
      loading.value = true;
      error.value = null;
      try {
        await createUser({ ...form });
        form.name = '';
        form.email = '';
        alert('User created successfully!');
        emit('userCreated'); // Notify parent about successful creation
        if (props.closeModal) {
          props.closeModal(); // Close modal if provided
        } else {
          router.push('/'); // Navigate back to the desired page
        }
      } catch (err) {
        console.error('Error creating user:', err);
        error.value = 'Failed to create user. Please try again.';
      } finally {
        loading.value = false;
      }
    };

    return { form, onSubmit, loading, error };
  },
};
</script>

