<template>
  <div class="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="p-6 shadow-md rounded-lg w-full max-w-md">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <!-- Переключатель физ / юр лицо -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Тип пользователя</label>
          <select v-model="userType"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  @change="updateVisibility">
            <option value="PHYSICAL">Физическое лицо</option>
            <option value="LEGAL">Юридическое лицо</option>
          </select>
        </div>

        <!-- Статические поля для всех типов пользователей -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input id="email" v-model="email" type="email" required
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                 placeholder="Введите email"
                 @input="validateEmail">
          <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
        </div>

        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700">Имя</label>
          <input id="firstName" v-model="firstName" type="text"
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                 placeholder="Введите имя"
                 required>
          <p v-if="errors.firstName" class="text-red-500 text-xs mt-1">{{ errors.firstName }}</p>
        </div>

        <div>
          <label for="secondName" class="block text-sm font-medium text-gray-700">Отчество</label>
          <input id="secondName" v-model="secondName" type="text"
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                 placeholder="Введите отчество">
          <p v-if="errors.secondName" class="text-red-500 text-xs mt-1">{{ errors.secondName }}</p>
        </div>

        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700">Фамилия</label>
          <input id="lastName" v-model="lastName" type="text"
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                 placeholder="Введите фамилию"
                 required>
          <p v-if="errors.lastName" class="text-red-500 text-xs mt-1">{{ errors.lastName }}</p>
        </div>

        <div>
          <label for="password1" class="block text-sm font-medium text-gray-700">Пароль</label>
          <input id="password1" v-model="password1" type="password" required minlength="8"
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                 placeholder="Введите пароль"
                 @input="validatePassword">
          <p v-if="errors.password1" class="text-red-500 text-xs mt-1">{{ errors.password1 }}</p>
        </div>

        <div>
          <label for="password2" class="block text-sm font-medium text-gray-700">Повторите пароль</label>
          <input id="password2" v-model="password2" type="password" required minlength="8"
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                 placeholder="Повторите пароль"
                 @input="validatePasswordMatch">
          <p v-if="errors.password2" class="text-red-500 text-xs mt-1">{{ errors.password2 }}</p>
        </div>

        <!-- Поля только для юридических лиц (скрыты, если физическое лицо) -->
        <div v-if="userType === 'LEGAL'">
          <label for="companyName" class="block text-sm font-medium text-gray-700">Название компании</label>
          <input id="companyName" v-model="companyName" type="text" required
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                 placeholder="Введите название компании">
          <p v-if="errors.companyName" class="text-red-500 text-xs mt-1">{{ errors.companyName }}</p>
        </div>

        <div v-if="userType === 'LEGAL'">
          <label for="bin" class="block text-sm font-medium text-gray-700">БИН</label>
          <input id="bin" v-model="bin" type="text" required
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                 placeholder="Введите БИН">
          <p v-if="errors.bin" class="text-red-500 text-xs mt-1">{{ errors.bin }}</p>
        </div>

        <div v-if="userType === 'LEGAL'">
          <label for="legalAddress" class="block text-sm font-medium text-gray-700">Юридический адрес</label>
          <input id="legalAddress" v-model="legalAddress" type="text" required
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                 placeholder="Введите юридический адрес">
          <p v-if="errors.legalAddress" class="text-red-500 text-xs mt-1">{{ errors.legalAddress }}</p>
        </div>

        <button type="submit" :disabled="loading || hasErrors"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
          <span v-if="loading" class="animate-spin mr-2">⏳</span>
          Зарегистрироваться
        </button>

        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
      </form>
    </div>

    <div class="text-center mt-4">
      <nuxt-link to="/auth/login" class="text-indigo-600 hover:underline text-sm">
        Уже есть аккаунт?
      </nuxt-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'

const email = ref('')
const firstName = ref('')
const secondName = ref('')
const lastName = ref('')
const password1 = ref('')
const password2 = ref('')
const companyName = ref('')
const bin = ref('')
const legalAddress = ref('')
const userType = ref('PHYSICAL')
const loading = ref(false)
const error = ref('')

// Object to store validation errors
const errors = ref({
  email: '',
  firstName: '',
  secondName: '',
  lastName: '',
  password1: '',
  password2: '',
  companyName: '',
  bin: '',
  legalAddress: ''
})

const updateVisibility = () => {
  // Reset errors when user type changes
  Object.keys(errors.value).forEach(key => {
    errors.value[key as keyof typeof errors.value] = ''
  })
  validateAll() // Re-validate all fields
}

const validateEmail = () => {
  if (!email.value) {
    errors.value.email = 'Email обязателен';
  } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email.value)) {
    errors.value.email = 'Неверный формат email';
  } else {
    errors.value.email = '';
  }
}

const validatePassword = () => {
  if (!password1.value) {
    errors.value.password1 = 'Пароль обязателен';
  } else if (password1.value.length < 8) {
    errors.value.password1 = 'Пароль должен содержать минимум 8 символов';
  } else {
    errors.value.password1 = '';
  }
}

const validatePasswordMatch = () => {
  if (!password2.value) {
    errors.value.password2 = 'Подтверждение пароля обязательно';
  } else if (password2.value !== password1.value) {
    errors.value.password2 = 'Пароли не совпадают';
  } else {
    errors.value.password2 = '';
  }
}

const validateName = (name: string, field: string) => {
  if (!name && field !== 'secondName') { // secondName is optional
    errors.value[field as keyof typeof errors.value] = `${field === 'firstName' ? 'Имя' : 'Фамилия'} обязательно`;
  } else {
    errors.value[field as keyof typeof errors.value] = '';
  }
}

const validateLegalFields = () => {
  if (userType.value === 'LEGAL') {
    if (!companyName.value) errors.value.companyName = 'Название компании обязательно';
    else errors.value.companyName = '';

    if (!bin.value) errors.value.bin = 'БИН обязателен';
    else errors.value.bin = '';

    if (!legalAddress.value) errors.value.legalAddress = 'Юридический адрес обязателен';
    else errors.value.legalAddress = '';
  } else {
    errors.value.companyName = '';
    errors.value.bin = '';
    errors.value.legalAddress = '';
  }
}

const validateAll = () => {
  validateEmail();
  validateName(firstName.value, 'firstName');
  validateName(lastName.value, 'lastName');
  validatePassword();
  validatePasswordMatch();
  validateLegalFields();
}


const hasErrors = computed(() => {
  return Object.values(errors.value).some(error => error !== '')
})

const handleSubmit = async () => {
  validateAll()

  if (hasErrors.value) {
    error.value = 'Исправьте ошибки в форме перед отправкой'
    return
  }

  loading.value = true
  error.value = ''

  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        email: email.value,
        firstName: firstName.value,
        secondName: secondName.value,
        lastName: lastName.value,
        password: password1.value, // Note: Changed from password1 to password to match API expectation
        userType: userType.value,
        companyName: userType.value === 'LEGAL' ? companyName.value : null,
        bin: userType.value === 'LEGAL' ? bin.value : null,
        legalAddress: userType.value === 'LEGAL' ? legalAddress.value : null
      }
    })
    await navigateTo('/dashboard')
  } catch (err: unknown) {
    error.value = err.data?.message || 'Ошибка регистрации. Попробуйте снова.'
  } finally {
    loading.value = false
  }
}
</script>