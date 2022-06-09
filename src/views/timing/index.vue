<template>
  <div class="app-container">
    <div class="block">
      <el-button type="primary" plain :size="mini" class="time">
        <span style="font-size: 50px">{{ hour }} 时 {{ miniute }} 分 {{ second }} 秒</span>
      </el-button>
    </div>
    <div class="block">
      <el-button type="danger" :disabled="startFlag === false" class="operate" @click="startTime">
        开始计时
      </el-button>
      <el-button type="warning" :disabled="endFlag === false" class="operate" @click="endTime">
        暂停计时
      </el-button>
      <el-button type="info" :disabled="resetFlag === false" class="operate" @click="resetTime">
        结束计时
      </el-button>
    </div>
  </div>
</template>

<script>
import { toggleClass } from '@/utils'
import '@/assets/custom-theme/index.css' // the theme changed version element-ui css

export default {
  name: 'Theme',
  data() {
    return {
      theme: false,
      time: '',
      startFlag: true,
      endFlag: false,
      resetFlag: false,
      count: 0,
      hour: 0,
      miniute: 0,
      second: 0,
      ms: 0
    }
  },
  watch: {
    theme() {
      toggleClass(document.body, 'custom-theme')
    }
  },
  methods: {
    startTime() {
      this.startFlag = false
      this.endFlag = true
      this.resetFlag = true
      this.time = setInterval(this.timer, 50)
    },
    endTime() {
      this.startFlag = true
      this.endFlag = false
      this.resetFlag = true
      clearInterval(this.time)
    },
    resetTime() {
      this.startFlag = false
      this.endFlag = true
      this.resetFlag = true
      this.endTime()
      this.ms = 0
      this.second = 0
      this.miniute = 0
      this.hour = 0
    },
    timer() {
      this.ms += 50
      if (this.ms === 1000) {
        this.second += 1
        this.ms = 0
      }
      if (this.second === 60) {
        this.miniute += 1
        this.second = 0
      }
      if (this.miniute === 60) {
        this.hour += 1
        this.miniute = 0
      }
    }
  }
}
</script>

<style scoped>
.field-label{
  vertical-align: middle;
}
.box-card {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
}

.block {
  padding: 30px 39%;
}

.tag-item {
  margin-right: 15px;
}

.time {
  width: 500px;
  height: 200px;
}

.operate{
  width: 161px;
  height: 50px;
}
</style>
