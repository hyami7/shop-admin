<template>
  <div class="ywj-page">
    <el-form
      :inline="true"
      :model="searchData"
      :label-width="formLabelWidth"
      class="ywj-search pane"
    >
      <el-row :gutter="20">
        <el-col
          :span="6"
          v-for="(item, index) in searchFormItems"
          :key="item.prop"
        >
          <el-form-item v-if="item.type === 'showMore'" class="search-btn">
            <el-button @click="initSearchData">重置</el-button>
            <el-button
              type="primary"
              :loading="status.tableLoading"
              @click="currentChange(1)"
              >查询</el-button
            >
            <el-button
              link
              type="primary"
              @click="status.showMore = !status.showMore"
            >
              展开<el-icon><ArrowDown /></el-icon>
            </el-button>
          </el-form-item>

          <el-form-item
            :label="item.label"
            v-else
            v-show="index < 3 || status.showMore"
          >
            <component
              v-if="item.options"
              :is="item.type"
              v-model="searchData[item.searchKey || item.prop]"
              :props="item.attr || {}"
              v-bind="item.attr || {}"
              v-on="item.event || {}"
            >
              <template v-if="item.options && item.type.includes('select')">
                <el-option
                  v-for="option in item.options"
                  :key="option[item.optionValue || 'value']"
                  :label="option[item.optionLabel || 'label']"
                  :value="option[item.optionValue || 'value']"
                />
              </template>
              <template v-if="item.options && item.type.includes('radio')">
                <el-radio
                  v-for="option in item.options"
                  :key="option[item.optionValue || 'value']"
                  :label="option[item.optionValue || 'value']"
                >
                  {{ option[item.optionLabel || "label"] }}
                </el-radio>
              </template>
            </component>
            <component
              v-else
              :is="item.type"
              v-model="searchData[item.searchKey || item.prop]"
              :props="item.attr || {}"
              v-bind="item.attr || {}"
              v-on="item.event || {}"
            >
            </component>
          </el-form-item>
        </el-col>
      </el-row>

      <slot name="tips"></slot>
    </el-form>

    <div class="pane" style="flex: 1; flex-basis: auto; overflow: auto">
      <div class="page-btn">
        <div>
          <el-button
            v-for="item in btn"
            :key="item.label"
            :type="item.type"
            @click="item.click"
            :loading="item.loading"
          >
            {{ item.label }}
          </el-button>
        </div>
        <div class="flex-center">
          <el-dropdown :hide-on-click="false">
            <el-icon size="18"><Operation /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  :key="'drop' + item.prop"
                  v-for="item in table.column"
                >
                  <el-checkbox
                    :model-value="item.show"
                    :label="item.label"
                    @change="onChangeShowColumn($event, item.prop)"
                  />
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <DataTable
        class="data-table"
        :data="tableData"
        :table-loading="status.tableLoading"
        :table="table"
        @selection-change="select"
      />

      <div>
        <el-pagination
          style="float: right"
          :layout="
            pagination.layout || 'total, sizes, prev, pager, next, jumper'
          "
          :page-sizes="pagination.sizes || [10, 25, 50, 100]"
          :total="page.total"
          :page-size="page.pageSize"
          :current-page="page.pageNum"
          @size-change="sizeChange"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, ref, onMounted, withDefaults } from "vue";
import DataTable from "../table/index.vue";
import { ElMessage } from "element-plus";

interface IRow {
  [key: string]: any;
}

interface IOprate {
  label: string;
  loading: boolean;
  type?: string;
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

interface ISearch {
  extraParams?: any;
  formItem: IRow[];
}

interface IPage {
  sizes?: number[] | string[];
  layout?: string;
}

interface IProp {
  formLabelWidth?: string | number;
  btn?: IOprate[];
  pagination?: IPage;
  search?: ISearch;
  table?: ITable;
}

const props = withDefaults(defineProps<IProp>(), {
  formLabelWidth: "100px",
  btn: () => [
    {
      label: "默认按钮1",
      loading: false,
      click: () => {
        console.log("默认按钮1");
      },
    },
    {
      label: "默认按钮2",
      loading: false,
      click: () => {
        console.log("默认按钮2");
      },
      type: "primary",
    },
  ],
  search: () => {
    return {
      extraParams: {},
      formItem: [
        {
          type: "el-input",
          prop: "name",
          searchKey: "loginName",
          label: "名字",
          attr: {
            placeholder: "请输入",
          },
        },
        {
          type: "el-select",
          prop: "school",
          label: "学校",
          optionValue: "value",
          optionLabel: "label",
          options: [
            { label: "北京大学", value: "0" },
            { label: "清华大学", value: "1" },
          ],
          attr: {
            placeholder: "请选择",
          },
        },
        {
          type: "el-select",
          prop: "currency",
          label: "币种",
          optionValue: "value",
          optionLabel: "label",
          options: [
            { label: "人民币", value: "0" },
            { label: "美元", value: "1" },
          ],
          attr: {
            placeholder: "请选择",
          },
        },
        {
          type: "el-date-picker",
          prop: "time",
          label: "时间1",
          start: "startTime",
          end: "endTime",
          attr: {
            type: "date",
            placeholder: "请选择",
          },
        },
        {
          type: "el-date-picker",
          prop: "time1",
          label: "时间2",
          start: "startTime",
          end: "endTime",
          attr: {
            type: "date",
            "value-format": "yyyy-MM-dd",
            placeholder: "请选择",
          },
        },
      ],
    };
  },
  table: () => {
    return {
      showIndex: true,
      showSelection: true,
      showPagination: true,
      getList: (params) => {
        return new Promise((resolve, reject) => {
          console.log(params);
          setTimeout(() => {
            const res = {
              code: "200",
              msg: "操作成功",
              data: {
                records: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
                total: 9,
                size: 10,
                current: 1,
                orders: [],
                optimizeCountSql: true,
                hitCount: false,
                countId: null,
                maxLimit: null,
                searchCount: true,
                pages: 1,
              },
              globalTraceId: "0e879e8c",
              errorCode: null,
              message: "操作成功",
              success: true,
            };
            resolve(res);
          }, 1000);
        });
      },
      oprate: [
        {
          label: "文字按钮1",
          loading: false,
          click: () => {
            console.log("文字按钮1");
          },
        },
        {
          label: "文字按钮2",
          loading: false,
          click: () => {
            console.log("文字按钮2");
          },
        },
      ],
      column: [
        {
          prop: "acc_no",
          label: "账户号",
          width: "120px",
          show: true,
        },
        {
          prop: "open_date",
          label: "开户日期",
          show: true,
        },
        {
          prop: "acc_attr_name",
          label: "账户性质",
          show: true,
        },
        {
          prop: "acc_purpose_name",
          label: "账户用途",
          show: true,
        },
      ],
    };
  },
  pagination: () => {
    return {
      sizes: [10, 25, 50, 100],
      layout: "total, sizes, prev, pager, next, jumper",
    };
  },
});

const status = reactive<IRow>({
  showMore: false,
  tableLoading: false,
});
const page = reactive<IRow>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
});
const tableData = ref<IColumn[]>([]);
const selection = ref<IRow[]>([]);
const searchData = reactive<IRow>({});

const searchFormItems = computed(() => {
  let result = props.search.formItem.filter(
    (x) => (x.show || x.show === undefined) && !x.hide
  );
  if (props.search.formItem.length > 3) {
    result.splice(3, 0, { type: "showMore" });
  }
  return result;
});

const select = (val: IRow[]) => {
  selection.value = val;
};

const currentChange = (pageNum: number) => {
  page.pageNum = pageNum;
  page.total = 0;
  getList();
};
const sizeChange = (size: number) => {
  page.pageSize = size;
  page.pageNum = 1;
  page.total = 0;
  getList();
};

const onChangeShowColumn = (val: boolean, prop: string) => {
  const column = props.table.column.find((col) => col.prop === prop);
  if (column) {
    column.show = val;
  }
};

const getList = () => {
  if (!props.table.getList) {
    throw new Error("请传入列表请求");
  }
  const params = initParams();
  params.pageNum = page.pageNum;
  params.pageSize = page.pageSize;
  status.tableLoading = true;
  props.table
    .getList(params)
    .then((res) => {
      console.log(res);
      if (+res.code === 200) {
        tableData.value = res.data.records || [];
        page.total = res.data.total || 0;

        if (!res.data) {
          ElMessage.warning(res.message);
        }
      }
    })
    .finally(() => {
      status.tableLoading = false;
    });
};
const initParams = () => {
  let data: IRow = {};
  props.search.formItem.forEach((item) => {
    data[item.searchKey || item.prop] = searchData[item.searchKey || item.prop];
  });

  return {
    ...data,
    ...props.search.extraParams,
  };
};

const initSearchData = () => {
  props.search.formItem.forEach((item) => {
    if (item.defaultValue !== undefined) {
      searchData[item.searchKey || item.prop] = item.defaultValue;
    } else {
      searchData[item.searchKey || item.prop] = undefined;
    }
  });
};

onMounted(() => {
  initSearchData();
  getList();
});
</script>

<style lang="scss" scoped>
.ywj-page {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  .ywj-search {
    margin-bottom: 16px;
  }

  .page-btn {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
  }

  .pane {
    border-radius: 5px;
    background-color: #fff;
    padding: 16px;
  }

  .data-table {
    height: calc(100% - 90px);
    width: 100%;
    margin-bottom: 12px;
  }

  .el-form-item,
  input {
    width: 100%;
  }
}
</style>
