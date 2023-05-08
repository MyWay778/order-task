<script setup lang="ts">
  import ButtonVue from '@/components/UI/ButtonVue.vue';
  import InputVue from '@/components/UI/InputVue.vue';
  import ModalVue from '@/components/UI/ModalVue.vue';
  import useValidation from '@/composables/useValidation';
  import { userOrderStore, type NewOrderInterface } from '@/stores/orders';
  import { computed, reactive, ref } from 'vue';
  import DateService from '@/helpers/DateService';

  const order = reactive({
    name: '',
    address: '',
    comment: ''
  });

  const isShowErrors = ref(false);
  const errors = useValidation(order, {
    name: {
      required: true
    },
    address: {
      required: true,
      min: 5
    }
  });

  const orderStore = userOrderStore();

  const onSubmit = async (): Promise<void> => {
    if (Object.keys(errors).length) {
      isShowErrors.value = true;
      return;
    }

    const newOrder: NewOrderInterface = { ...order, date: DateService.now(), status: 'Новый' };
    const success = await orderStore.addOrder(newOrder);
    if (success) {
      modalMessage.value = 'Заказ успешно добавлен!';
      resetForm();
    } else {
      modalMessage.value = 'Произошла ошибка, попробуйте еще раз...';
    }
  };

  const resetForm = (): void => {
    (Object.keys(order) as Array<keyof typeof order>).forEach((key) => {
      order[key] = '';
    });

    isShowErrors.value = false;
  };

  // Модальное окно
  const modalMessage = ref('');
  const showMessageModal = computed(() => Boolean(modalMessage.value));

  const clearModalMessage = (): void => {
    modalMessage.value = '';
  };
</script>

<template>
  <main :class="['container', $style.container]">
    <form :class="$style.form" @submit.prevent>
      <h3 :class="$style.title">Добавить заказ</h3>

      <InputVue
        v-model.trim="order.name"
        :error-message="isShowErrors ? errors['name'] : ''"
        placeholder="Введите ваше имя"
        required />

      <InputVue
        v-model.trim="order.address"
        :error-message="isShowErrors ? errors['address'] : ''"
        placeholder="Введите ваш адрес"
        required />

      <InputVue v-model.trim="order.comment" placeholder="Комментарий" />

      <ButtonVue :class="$style.button" @click="onSubmit" type="button" color="gray"
        >Добавить заказ</ButtonVue
      >
    </form>

    <ModalVue
      :class="$style.modal"
      :show-modal="showMessageModal"
      @outside-click="clearModalMessage">
      <div :class="$style.modalContainer">
        <p :class="$style.message">{{ modalMessage }}</p>
        <ButtonVue @click="clearModalMessage" color="white">Ок</ButtonVue>
      </div>
    </ModalVue>
  </main>
</template>

<style module lang="scss">
  .container {
    height: 100vh;
    padding: 45px;
  }

  .form {
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    max-width: 162px;
  }

  .title {
    margin-bottom: 27px;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
  }

  .button {
    align-self: flex-start;
  }

  .modal {
    top: 20%;
    min-width: 250px;
    padding: 20px;
    text-align: center;
  }

  .modalContainer {
    text-align: center;

    .message {
      margin-bottom: 30px;
    }
  }
</style>
