<template>
  <div class="ui-table">
    <div class="ui-table__wrapper" ref="wrapper">
      <table>
        <thead>
          <tr>
            <th
              v-for="(header, index) in headers"
              :key="index"
              :style="cellWidth"
            >{{ header.title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, iindex) in items" :key="iindex">
            <td
              v-for="(header, hindex) in headers"
              :key="`${iindex}-${hindex}`"
              :style="cellWidth"
              @click="$emit('row:click',item)"
            >
              <slot
                :name="`item.${header.key}`"
                :item="item"
                :header="header"
                :headers="headers"
              >{{ item[header.key] }}</slot>
            </td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
    <div class="pagination">
      <div class="pages">
        <span>{{ `${((options.itemsPerPage * options.page) - options.itemsPerPage) || 1} - ${options.itemsPerPage * options.page}` }} of {{ options.total }}</span>
        <div class="actions">
          <button @click="previousPage" :disabled="options.page === 1">
            <i class="mdi mdi-chevron-left"></i>
          </button>
          <button @click="nextPage">
            <i class="mdi mdi-chevron-right" :disabled="options.page === options.totalPages"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ui-table",
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => ({
        page: 1,
        itemPerPage: 20,
        total: 1
      })
    }
  },
  methods: {
    previousPage() {
      this.$emit("update:options", {
        ...this.options,
        page: this.options.page - 1
      });
    },
    nextPage() {
      this.$emit("update:options", {
        ...this.options,
        page: this.options.page + 1
      });
    }
  },
  computed: {
    cellWidth() {
      return { width: `${100 / this.headers.length}%` };
    }
  }
};
</script>
<style lang="scss" scoped>
.pagination {
  display: flex;
  height: 52px;
  position: fixed;
  bottom: 0;
  width: calc(100vw - 80px);
  padding: 8px 32px;
  align-items: center;
  justify-content: flex-end;
  background-color: #ffffff;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.08);
  .pages {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    .actions {
      margin-left: 16px;
      button {
        font-size: 24px;
      }
    }
  }
  button {
    border-right: 0px;
    border-radius: 0px;

    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:last-child {
      border: 1px solid #bbb;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    margin: 0;
  }
}
.ui-table {
  max-width: 100%;
  &__wrapper {
    overflow-y: auto;
    table {
      table-layout: fixed;
      display: table;
      width: 100%;
      border-spacing: 0;

      position: relative;
      thead {
        height: 64px;
        box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.08);
        width: 100%;
        background-color: #ffffff;
        position: fixed;
        display: table;
        border: 0px;
        tr {
          th {
            border-bottom: 0px solid transparent;
            top: 0;
            padding: 13px 0;
            &:first-child {
              padding-left: 56px;
            }
            &:last-child {
              padding-right: 56px;
            }
          }
        }
      }
      tbody {
        &:before {
          line-height: 64px;
          content: ".";
          color: #fff;
          display: block;
        }
        margin-top: 48px;
        overflow: auto;
        tr {
          margin: 8px;
          border-radius: 8px;
          cursor: pointer;
          height: 64px;
          transition: 0.2s ease-in-out;
          &:hover {
            box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.08);
          }
          td {
            border: 0px;
            padding: 13px 0;
            &:first-child {
              padding-left: 56px;
            }
            &:last-child {
              padding-right: 56px;
            }
          }
        }
      }
    }
  }
}
</style>
