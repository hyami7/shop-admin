<template>
  <Page :btn="state.btn" :search="state.search" :table="state.table" />
</template>

<script lang="ts" setup>
import Page from "@/components/page/index.vue";
import { reactive } from "vue";

interface IRow {
  [key: string]: any;
}
const state = reactive({
  btn: [
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
  search: {
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
  },
  table: {
    showIndex: true,
    showSelection: true,
    showPagination: true,
    getList: (params: IRow) => {
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
  },
});
</script>
