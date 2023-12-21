<template>
  <el-table
    :data="props.data"
    v-loading="props.tableLoading"
    @selection-change="select"
  >
    <el-table-column
      v-if="props.table.showIndex"
      type="index"
      width="50"
    ></el-table-column>
    <el-table-column
      v-if="props.table.showSelection"
      type="selection"
      width="55"
    ></el-table-column>
    <el-table-column
      v-for="item in tableColumns"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      :show-overflow-tooltip="true"
    ></el-table-column>
    <el-table-column
      label="操作"
      fixed="right"
      v-if="props.table.oprate && props.table.oprate.length"
    >
      <template #default="scope">
        <el-button
          v-for="oprate in props.table.oprate"
          :key="oprate.label"
          :loading="oprate.loading"
          @click="oprate.click(scope.row)"
          type="primary"
          link
        >
          {{ oprate.label }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { withDefaults, computed } from "vue";

interface IRow {
  [key: string]: any;
}

interface IOprate {
  label: string;
  loading: boolean;
  click: (row: IRow) => void;
}

interface IColumn {
  prop: string;
  label: string;
  width?: string;
  show?: boolean;
}

interface ITable {
  showIndex?: boolean;
  showSelection?: boolean;
  showPagination?: boolean;
  getList: (params: any) => Promise<any>;
  oprate: IOprate[];
  column: IColumn[];
}

interface IProp {
  tableLoading?: boolean;
  tableHeight?: string;
  data: IRow[];
  table: ITable;
}

const props = withDefaults(defineProps<IProp>(), {
  tableLoading: false,
  tableHeight: "",
  data: () => [],
  table: () => {
    return {
      getList: () => Promise.resolve({}),
      oprate: [],
      column: [],
    };
  },
});
const emit = defineEmits(["selection-change"]);

const tableColumns = computed(() => {
  return props.table.column.filter((row) => row.show);
});

const select = (selection: IRow) => {
  emit("selection-change", selection);
};
</script>
