<template>
  <el-icon class="link-text head-icon" @click="useLock.setLock(true)">
    <Lock />
  </el-icon>
  <div v-if="useLock.islock" class="lockscreen" @contextmenu.prevent>
    <div class="local-time">
      <div class="time">{{ hour }}:{{ minute }}:{{ second }}</div>
      <div class="date">{{ month }}月{{ day }}号，星期{{ week }}</div>
    </div>
    <div class="login-box">
      <el-avatar
        :icon="UserFilled"
        :size="128"
        style="font-size: 64px"
      ></el-avatar>
      <div class="username">{{ state.loginForm.username }}</div>
      <div class="login">
        <el-input
          v-model:value="state.loginForm.password"
          type="password"
          autofocus
          placeholder="请输入登录密码"
          size="large"
          @search="onLogin"
        >
        </el-input>
        <el-button
          style="height: 42px"
          color="#626aef"
          icon="search"
        ></el-button>
      </div>
      <a class="logout" @click="useLock.setLock(false)">重新登录</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, onMounted, onUnmounted } from "vue";
import { useLocalTime } from "@/hooks/useLocalTime";
import { UserFilled } from "@element-plus/icons-vue";
// import md5 from 'blueimp-md5'
import { useLockScreen } from "@/store/modules/lockScreen";
import { useUserStore } from "@/store/modules/user";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const useLock = useLockScreen();
// 获取本地时间
const { month, day, hour, minute, week, second } = toRefs(useLocalTime());

const state = reactive({
  loginLoading: false, // 正在登录
  loginForm: {
    username: userStore.user?.account,
    password: "",
  },
});

// 登录
const onLogin = async () => {
  if (state.loginForm.password.trim() === "") {
    return ElMessage.warning("请填写密码");
  }
  // const params = { ...state.loginForm };
  state.loginLoading = true;
  // params.password = md5(params.password)
  // const { code, message: msg } = await userStore.login(params).finally(() => {
  //   state.loginLoading = false;
  //   message.destroy();
  // });
  // if (code == 0) {
  //   Modal.destroyAll();
  //   message.success('登录成功！');
  //   unLockLogin(false);
  //   lockscreenStore.setLock(false);
  // } else {
  //   message.info(msg || '登录失败');
  // }
  state.loginLoading = false;
};

// 用户一段时间没有操作 自动锁屏
let timer: number | undefined;
const resetLockTime = () => {
  clearTimeout(timer);

  // 重置用户操作时间
  useLock.setLockTime();

  timer = window.setTimeout(() => {
    useLock.setLock(true);
  }, useLock.time);
};
onMounted(() => {
  document.addEventListener("mousedown", resetLockTime);
  resetLockTime();
});
onUnmounted(() => {
  document.removeEventListener("mousedown", resetLockTime);
});
</script>

<style lang="scss" scoped>
.lockscreen {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  overflow: hidden;
  color: white;
  //   background-color: #000;
  backdrop-filter: blur(7px);
  background-color: rgba(25, 28, 34, 0.78);

  .login-box {
    position: absolute;
    top: 45%;
    left: 50%;
    display: flex;
    transform: translate(-50%, -50%);
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > * {
      margin-bottom: 14px;
    }

    .username {
      font-size: 30px;
    }

    .login {
      display: flex;

      .el-input__wrapper {
        border-radius: 4px 0 0 4px !important;
      }

      .el-button {
        border-radius: 0 4px 4px 0 !important;
      }
    }
  }

  .logout {
    margin-top: 10px;
    font-size: 12px !important;
    cursor: pointer;
  }

  .local-time {
    position: absolute;
    bottom: 60px;
    left: 60px;
    font-family: helvetica;

    .time {
      font-size: 70px;
    }

    .date {
      font-size: 40px;
    }
  }
}
</style>
