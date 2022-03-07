<template>
  <div>
    <div class="header">
      <slot name="header">
        <h3>{{ headerTitle }}</h3>
      </slot>
      <slot name="otherFun"></slot>
    </div>
    <el-table :data="tableData" border style="width: 100%" @select="selectChange" v-bind="childrenProps">
      <el-table-column v-if="selectionShow" type="selection" width="55" align="center" />
      <el-table-column v-if="serialShow" width="80px" type="index" align="center" label="序号"></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center">
          <template #default="scope">
            <slot :name="item.prop" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          v-model:currentPage="finCurrentPage"
          v-model:page-size="page.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { tableConfig } from '../../base-ui/hyTable/config';
export default defineComponent({
  props: {
    tableData: {
      type: Array as PropType<tableConfig[]>,
      required: true
    },
    propList: {
      type: Array,
      required: true
    },
    serialShow: {
      type: Boolean,
      default: true
    },
    selectionShow: {
      type: Boolean,
      default: true
    },
    headerTitle: {
      type: String,
      default: ''
    },
    currentPage: {
      type: Number,
      default: 0
    },
    page: {
      type: Object,
      default: () => ({
        currentPage: 1,
        pageSize: 10
      })
    },
    childrenProps: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  emits: ['selectChange', 'update:page'],
  setup(prop, { emit }) {
    const finCurrentPage = computed(() => {
      return prop.page.currentPage + 1;
    });
    const selectChange = (value: any) => {
      emit('selectChange', value);
    };
    const handleSizeChange = (pageSize: any) => {
      emit('update:page', { ...prop.page, pageSize });
    };
    const handleCurrentChange = (currentPage: any) => {
      console.log(currentPage);

      emit('update:page', { ...prop.page, currentPage: currentPage - 1 });
    };
    return {
      selectChange,
      handleSizeChange,
      handleCurrentChange,
      finCurrentPage
    };
  }
});
</script>

<style scoped lang="less">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
}

.el-table__fixed-body-wrapper {
  z-index: auto !important;
}
</style>
