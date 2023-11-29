<template>
  <div class="login flex-center">
    <el-form
      ref="formRef"
      :model="user"
      class="login-form"
      @submit.prevent="handleSubmit"
    >
      <h1 class="login-title">登录</h1>
      <el-form-item prop="account" :rules="rules.change">
        <el-input v-model.number="user.account" type="text">
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd" :rules="rules.change">
        <el-input v-model.number="user.pwd" type="text">
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="imgcode" :rules="rules.change">
        <div class="flex-between" style="width: 100%">
          <el-input v-model.trim="user.imgcode" type="text">
            <template #prefix>
              <el-icon><Key /></el-icon>
            </template>
          </el-input>
          <img
            class="imgcode link-text"
            alt="验证码"
            :src="captchaSrc"
            @click="loadCaptcha"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          style="width: 100%"
          type="primary"
          :loading="loading"
          native-type="submit"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { getCaptcha, login } from "@/api/common";
import type { IElForm, IFormRule } from "@/types/element-plus";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store/modules/user";

onMounted(() => {
  loadCaptcha();
});

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const formRef = ref<IElForm | null>(null);
const rules = ref<IFormRule>({
  change: [{ required: true, message: "请输入", trigger: "change" }],
});
const captchaSrc = ref("");
const loading = ref(false);
const user = reactive({
  account: "admin",
  pwd: "123456",
  imgcode: "",
});

const loadCaptcha = async () => {
  const data = await getCaptcha();
  captchaSrc.value = URL.createObjectURL(data);
};

const handleSubmit = async () => {
  const valid = await formRef.value?.validate();
  if (!valid) {
    return false;
  }
  loading.value = true;
  const data = await login(user).finally(() => {
    loading.value = false;
  });
  userStore.setUser({ ...data.user_info, token: data.token });
  loading.value = false;

  let redirect = route.query.redirect || "/";
  if (typeof redirect !== "string") {
    redirect = "/";
  }
  router.replace(redirect);
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100vw;
  background-color: $main;

  .login-form {
    width: 300px;
    border-radius: 5%;
    padding: 15px;
    background-color: #fff;

    .login-title {
      color: $color;
      text-align: center;
      margin-bottom: 20px;
    }

    .imgcode {
      height: 32px;
    }
  }
}
</style>
