<template>
  <div class="split-bill" :model="model">
    <div class="form">
        <table>
          <tr>
            <td>序号</td>
            <td>单据金额(元)</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item,index) in total">
              <td>
                 {{index+1}}
              </td>
              <td v-on:dblclick="canEdit(index)" class="edit">
                <p v-show="item.visibleP">{{item.money}}</p>
                <input v-show="!item.visibleP"
                        min="0"
                        ref="inputs"
                        type="text"
                        v-model="item.money"
                        v-on:blur="blur(index)"
                        v-on:keyup="changmoney(index)">
              </td>
              <td>
                <button type="button" class="delete" v-on:click="deleterow(index)">删除</button>
              </td>
          </tr>
        </table>
        <div class="addrow">
          <button type="button" class="add" :class="canClick ? 'light' : 'dark'" v-on:click="addrow">新增一行</button>
        </div>
    </div>

    <div class="notice">
      <p>注一：拆单后每一笔金额将生成独立的资金记录，且具有唯一的收款编号！</p>
      <p>注二：双击表格中单据金额数字可进行编辑</p>
    </div>
  </div>
</template>
<script>
  /**
   * @file split-bill.vue
   * @description 银企直联-拆单
   * @author wanghongjiao
   * @since  2018-1-11
   */
  import {mixinSchema} from 'finbox/mixin';
  export default {
    data() {
      return {
        total: [],
        billMoney: '',
        waitMoney: '',
        canClick: true
      }
    },
    methods: {
      canEdit(index) {
          this.total[index].visibleP = false;
          // 加个延时器保证input存在
          setTimeout(() => {
              this.$refs.inputs[index].select();
          }, 100);
      },
      blur(index) {
          this.total[index].visibleP = true;
          this.splitmoney();
          this.total[index].money = (+this.total[index].money).toFixed(2);
      },
      addrow() {
          if (this.waitMoney > 0){
              let row = {
                  money: this.waitMoney.toFixed(2),
                  visibleP: false
              };
              this.waitMoney = 0;
              this.total.push(row);
              this.model['splitbill'] = this.total;
              // 新增一行拆单时候，input获取焦点，并且是选中当前金额
              setTimeout(() => {
                  let index = this.total.length - 1;
                  this.$refs.inputs[index].select();
              }, 200);

          }

      },
      deleterow(index) {
          this.total.splice(index, 1);
          this.model['splitbill'] = this.total;
          this.splitmoney();
      },
      changmoney(index) {

          // 先把非数字的都替换掉，除了数字和.
          this.total[index].money = this.total[index].money.replace(/[^\d.]/g, "");
          // 必须保证第一个为数字而不是.
          this.total[index].money = this.total[index].money.replace(/^\./g, "");
          // 保证只有出现一个.而没有多个.
          this.total[index].money = this.total[index].money.replace(/\.{2,}/g, ".");
          // 保证.只出现一次，而不能出现两次以上
          this.total[index].money = this.total[index].money.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
          this.model['splitbill'] = this.total;
      },
      splitmoney() {
          let splitmoney = 0;
          this.total.map((item, index) => {
              let money = parseFloat(item.money || 0);
              splitmoney += money;
          });
          this.waitMoney = this.billMoney - (+splitmoney.toFixed(2));
      }
    },
    watch: {
        waitMoney(newVal, oldVal) {
            this.model['wait_money'] = (+newVal).toFixed(2);
            if( newVal > 0 ){
                this.canClick = true;
            }
            else {
                this.canClick = false;
            }
        }
    },
    created(){
        this.billMoney = +this.model['bill_money'];
        // 页面初始化的时候，待拆分的金额为0
        this.waitMoney = 0;
        this.total.push({
            money: this.billMoney,
            visibleP: false
        });
        this.model['splitbill'] = this.total;
    },
    mounted() {
      // 加载完成后，让table的第一个input获取焦点
      this.$refs.inputs[0].select();
    }
  }
</script>
<style type="text/less" lang="less">
    .split-bill {
        text-align: center;
        box-sizing: border-box;
        .notice {
          text-align: left;
          p {
            magin: 10px 0;
            padding-left: 25px;
            line-height: 30px;
          }
        }
        .form {
            width: 90%;
            display: inline-block;
            .addrow {
                margin-top: 10px;
                padding-right: 20px;
                text-align: right;
                .add {
                  padding: 5px 10px;
                  border-radius: 3px;
                  border: none;
                  outline: none;
                  color: #fff;
                }
                .add.light {
                  background: #67c23a;
                  &:hover {
                    background: #5ed861;
                  }
                }
                .add.dark {
                  background: #878d99;
                }
            }
            table {
              display: inline-block;
              width: 100%;
              border-collapse: collapse;
              tr {
                width: 100%;
                display: flex;
              }
              td {
                margin: 0;
                width: 32%;
                height: 40px;
                line-height: 40px;
                display: inline-block;
                border: 1px solid #e6ebf5;
                .delete {
                  padding: 5px 10px;
                  background: #409EFF;
                  border-radius: 3px;
                  border: none;
                  outline: none;
                  color: #fff;
                  &:hover {
                      background: #56acff;
                  }


                }

              }
              .edit {
                input {
                  width: 99%;
                  height: 99%;
                  display: inline-block;
                  border: none;
                }
              }
            }
        }

    }
</style>
