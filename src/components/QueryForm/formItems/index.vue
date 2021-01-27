<template>
  <div class="form-item">
    <!-- 下拉框 -->
    <el-select
      v-model="currentVal"
      v-if="isSelect"
      v-bind="bindProps"
      clearable
      v-on="bindEvents"
    >
      <el-option
        v-for="item in itemOptions.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>

    <!-- 时间选择框 -->
    <el-time-select
      v-model="currentVal"
      v-if="isTimeSelect"
      v-bind="bindProps"
      clearable
      v-on="bindEvents"
      :picker-options="{
        start: '08:30',
        step: '00:15',
        end: '18:30',
      }"
    >
    </el-time-select>

    <!-- 日期选择框 -->
    <el-date-picker
      v-model="currentVal"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions1"
      v-if="isDaySelect"
      v-bind="bindProps"
      clearable
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      v-on="bindEvents"
    >
    </el-date-picker>

    <!-- 日期时间选择框 -->
    <el-date-picker
      v-model="currentVal"
      type="datetime"
      v-if="isDatePicker"
      v-bind="bindProps"
      clearable
      v-on="bindEvents"
      format="yyyy-MM-dd HH:mm:ss"
      value-format="yyyy-MM-dd HH:mm:ss"
      :picker-options="pickerOptions0"
    >
    </el-date-picker>

    <!-- 单选框 -->
    <el-radio-group
      v-if="isRadio"
      v-model="currentVal"
      v-bind="bindProps"
      v-on="bindEvents"
    >
      <el-radio
        v-for="item in itemOptions.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-radio>
    </el-radio-group>

    <!-- 复选框 -->
    <el-checkbox-group
      v-if="isCheckbox"
      v-model="currentVal"
      v-bind="bindProps"
      v-on="bindEvents"
    >
      <el-checkbox
        v-for="item in itemOptions.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-checkbox>
    </el-checkbox-group>

    <!-- 输入框 -->
    <el-input
      v-if="isInput"
      v-model="currentVal"
      v-bind="bindProps"
      v-on="bindEvents"
      clearable
    ></el-input>

    <!-- 纯文本 -->
    <span v-if="isText" :class="itemOptions.class" v-bind="bindProps">
      {{ itemOptions.placeholder }}
    </span>
  </div>
</template>

<script>
import picker from '@/utils/picker'

export default {
  props: {
    value: {},
    itemOptions: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      pickerOptions1: picker.pickerOptions,
      pickerOptions0: { // 如何动态选择？
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e6;//如果没有后面的-8.64e6就是不可以选择今天的
        }
      },
    }
  },
  computed: {
    /**
     * @description 双向绑定数据值
     */
    currentVal: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    /**
     * @description 绑定属性
     */
    bindProps () {
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
    bindEvents () {
      return this.itemOptions.events || {}
    },
    /**
     * @description el-input 判断是否为输入框
     */
    isInput () {
      return this.itemOptions.element === 'el-input'
    },
    /**
     * @description el-date-picker 判断是否为日期时间选择器
     */
    isDatePicker () {
      return this.itemOptions.element === 'el-date-picker'
    },
    /**
     * @description el-date-picker 判断是否为日期选择器
     */
    isDaySelect () {
      return this.itemOptions.element === 'el-date-picker1'
    },
    /**
     * @description el-select 判断是否为下拉框
     */
    isSelect () {
      return this.itemOptions.element === 'el-select'
    },
    /**
     * @description el-radio-group 判断是否为单选按钮
     */
    isRadio () {
      return this.itemOptions.element === 'el-radio-group'
    },
    /**
     * @description el-checkbox-group 判断是否为复选框
     */
    isCheckbox () {
      return this.itemOptions.element === 'el-checkbox-group'
    },
    /**
     * @description el-time-select 判断是否为时间选择器
     */
    isTimeSelect () {
      return this.itemOptions.element === 'el-time-select'
    },
    /**
     * @description el-text 判断是否为纯文本
     */
    isText () {
      return this.itemOptions.element === 'el-text'
    },
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
