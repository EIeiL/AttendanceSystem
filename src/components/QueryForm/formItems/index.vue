<template>
  <div class="form-item">
    <!-- 下拉框 -->
    <el-select v-model="currentVal" v-if="isSelect" v-bind="bindProps" clearable v-on="bindEvents">
      <el-option v-for="item in itemOptions.options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>

    <!-- 时间选择框 -->
    <el-date-picker v-model="currentVal" type="daterange" align="right" unlink-panels range-separator="至"
      start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" v-if="isDatePicker"
      v-bind="bindProps" clearable format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-on="bindEvents">
    </el-date-picker>

    <!-- 输入框 -->
    <el-input v-if="isInput" v-model="currentVal" v-bind="bindProps" v-on="bindEvents" clearable></el-input>

    <!-- 类型输入框 -->
    <span class="type-input" v-if="isTypeInput">
      <el-select v-model="currentVal" placeholder="选择关键词" class="short-select">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
      <el-input v-model="currentVal" placeholder="请输入需要搜索的内容"></el-input>
      <el-button type="primary" @click="onSubmit">搜索</el-button>
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      // value: {},
      itemOptions: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    computed: {
      /**
       * @description 双向绑定数据值
       */
      currentVal: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val)
        }
      },
      /**
       * @description 绑定属性
       */
      bindProps() {
        const obj = {
          ...this.itemOptions
        }
        // console.log(obj);
        // 移除冗余属性
        delete obj.label
        delete obj.prop
        delete obj.element
        delete obj.initValue
        delete obj.rules
        delete obj.events
        if (obj.element === 'el-select' || obj.element === 'el-autocomplete') {
          delete obj.options
        }
        return obj
      },
      /**
       * @description 绑定方法
       */
      bindEvents() {
        return this.itemOptions.events || {}
      },
      /**
       * @description el-input 判断是否为输入框
       */
      isInput() {
        return this.itemOptions.element === 'el-input'
      },
      /**
       * @description el-date-picker 判断是否为时间选择器
       */
      isDatePicker() {
        return this.itemOptions.element === 'el-date-picker'
      },
      /**
       * @description el-select 判断是否为下拉框
       */
      isSelect() {
        return this.itemOptions.element === 'el-select'
      },
      /**
       * @description 下拉框+输入框+搜索按钮三位一体 已弃用
       */
      isTypeInput() {
        return false
      }
    },
    methods: {
      onSubmit() {}
    }
  }

</script>

<style lang="scss" scoped>
  .type-input {
    .short-select {
      width: 200px;
    }

    >>>.el-form-item__content {
      display: flex;
      vertical-align: top;
    }

    >>>.el-input__inner {
      border-radius: 0px;
    }
  }

</style>
