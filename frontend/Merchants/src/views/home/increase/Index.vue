<template>
  <div>
    <div class="name">
      <span>商品名称:</span>
      <el-input placeholder="请输入商品名称" v-model="goodsName" clearable>
      </el-input>
    </div>
    <div class="price">
      <span>商品单价:</span>
      <el-input
        placeholder="请输入商品单价"
        v-model="goodsPrice"
        clearable
      ></el-input>
    </div>
    <div class="desc">
      <span>描述信息:</span>
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="desc"
      >
      </el-input>
    </div>
    <div class="kind">
      <span>所属类别:</span>
      <el-select v-model="type" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="image">
      <span>图片:</span>
      <input @change="uploadPhoto($event)" type="file" />
    </div>

    <el-button type="primary" :plain="true" class="btn" @click="add"
      >添加商品</el-button
    >
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      goodsName: "",
      goodsPrice: "",
      type: "",
      imgCode: "",
      filesize: "",
      filename: "",
      store: "",
      desc: "",
      options: [],
    };
  },
  computed: {
    storeList() {
      return this.$store.state.storeList;
    },
  },
  created() {
    this.$store.dispatch("getStoreAsync");
    this.store = this.storeList.filter((item) => {
      return item.merchantName == sessionStorage.getItem("merchantName");
    });
    this.store[0].goodsType.forEach((item) => {
      this.options.push({
        value: item.goodsTypeName,
        label: item.goodsTypeName,
      });
    });
  },
  methods: {
    uploadPhoto(e) {
      // 利用fileReader对象获取file
      const file = e.target.files[0];
      this.filesize = file.size;
      this.filename = file.name;
      if (this.filesize > 2101440) {
        // 图片大于2MB
        console.log("图片过大，请使用其它方式上传！");
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
        this.imgCode = e.target.result;
      };
    },
    add() {
      const time = new Date();
      if (
        this.goodsName !== "" &&
        this.goodsPrice !== "" &&
        this.type !== "" &&
        this.desc !== "" &&
        this.imgCode !== ""
      ) {
        console.log(this.desc);
        axios
          .post("/api/merchants/addGoods", {
            merchantName: sessionStorage.getItem("merchantName"),
            goodsName: this.goodsName,
            type: this.type,
            goodsPrice: this.goodsPrice,
            imgCode: this.imgCode,
            desc: this.desc,
            date: time,
          })
          .then((res) => {
            if (res.data.code == 1) {
              this.$message({
                message: "添加成功!",
                type: "success",
              });
              this.goodsName = "";
              this.goodsPrice = "";
              this.type = "";
              this.desc = "";
              this.imgCode = "";
            }
          });
      } else {
        this.$message.error("请将信息填写完整");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.name,
.price,
.kind,
.desc,
.image {
  width: 300px;
  margin: 30px auto;
  span {
    font-size: 16px;
    font-weight: 600;
    display: block;
    margin-bottom: 10px;
  }
}

.btn {
  margin: 30px auto;
  width: 200px;
  display: block;
}
</style>