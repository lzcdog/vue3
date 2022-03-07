<template>
  <div class="Hyform">
    <slot name="header"></slot>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formConfig" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item :label="item.label" :style="itemStyle" v-if="!item.isHidden">
              <template v-if="item.type === 'input' || item.type === 'password'">
                <!-- 用双向绑定的语法糖 -->
                <el-input v-model="formData[`${item.filed}`]" :placeholder="item.placeholder"></el-input>
                <!-- 不用双向绑定的语法糖 -->
                <!-- <el-input
                  :model-value="modelValue[`${item.filed}`]"
                  @update:modelValue="hanleValueChange($event, item.filed)"
                  :placeholder="item.placeholder"
                ></el-input> -->
              </template>
              <template v-if="item.type === 'select'">
                <!-- 用双向绑定的语法糖 -->
                <el-select v-model="formData[`${item.filed}`]" :placeholder="item.placeholder">
                  <!-- 不用双向绑定的语法糖 -->
                  <!-- <el-select
                  :model-value="modelValue[`${item.filed}`]"
                  @update:modelValue="hanleValueChange($event, item.filed)"
                  :placeholder="item.placeholder"
                >-->
                  <el-option
                    v-for="optionItem in item.optionValue"
                    :key="optionItem.value"
                    :label="optionItem.label"
                    :value="optionItem.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template v-if="item.type === 'datePicker'">
                <!-- 用双向绑定的语法糖 -->
                <el-date-picker
                  type="daterange"
                  range-separator="-"
                  :start-placeholder="item.datePickerConfig.startPlaceholder"
                  :end-placeholder="item.datePickerConfig.endPlaceholder"
                  v-model="formData[`${item.filed}`]"
                >
                </el-date-picker>
                <!-- 不用双向绑定的语法糖 -->
                <!-- <el-date-picker
                  type="daterange"
                  range-separator="-"
                  :start-placeholder="item.datePickerConfig.startPlaceholder"
                  :end-placeholder="item.datePickerConfig.endPlaceholder"
                  :model-value="modelValue[`${item.filed}`]"
                  @update:modelValue="hanleValueChange($event, item.filed)"
                >
                </el-date-picker> -->
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { HyformType } from './Hyform';
export default defineComponent({
  props: {
    formConfig: {
      type: Array as PropType<HyformType[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '80px'
    },
    itemStyle: {
      type: Object,
      default: () => {
        return {};
      }
    },
    colLayout: {
      type: Object,
      default: () => {
        return {
          span: 8
        };
      }
    },
    modelValue: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    //用双向绑定的语法糖
    const formData = ref({ ...props.modelValue });
    watch(
      formData,
      (newValue) => {
        console.log(newValue);
        emit('update:modelValue', newValue);
      },
      {
        deep: true
      }
    );
    //不用双向绑定的语法糖
    // const hanleValueChange = (value: any, filed: string) => {
    //   console.log({ ...props.modelValue, [filed]: value }, 'dddddd', { [filed]: value }, 'dddd', {
    //     ...props.modelValue
    //   });

    //   emit('update:modelValue', { ...props.modelValue, [filed]: value });
    // };
    return {
      formData
      // hanleValueChange
    };
  }
});
</script>

<style scoped>
.Hyform {
  padding-top: 18px;
}
</style>
