<template>
  <div>
    <el-row>
      <el-col :span="18">
        <div class="about">
          <p class="first">关于</p>
          <div style="text-align: center">
            <img src="../../assets/me.jpg" style="width: 60%;" alt="">
          </div>       
          <h3 style="font-weight: bolder">社区</h3>
          <div style="width:100%; border-top:1px solid #ddd; clear:both;"></div>
          <p style="text-align:justify">
            LaraVue&nbsp;是两个框架名字组合而成的，这两个框架是我接触编程学的第一个后端框架&nbsp;“Laravel”&nbsp; 以及第一个前端框架&nbsp;“Vue”。本来2017年3月份准备申请&nbsp;laravue.com&nbsp;的域名，但是发现国外一哥们抢先我三天申请了。 这个微型社区是一个前后端完全分离的项目，是我前一个社区的改进版，无奈自己的&nbsp;CSS&nbsp;太渣，不然这几个页面早就撸完了。 该社区也没有什么定位，主要是对一些技术上的思考进行分享，方便自己顺便方便后人。项目源代码都开源到了&nbsp;
            <a href="https://github.com/zmecust/laravue-frontend">Github</a>， 有兴趣可以看看，不要忘了&nbsp;star&nbsp;哦，哈哈哈！
            <br>
          </p>

          <h3 style="font-weight: bolder">兴趣爱好</h3>
          <div style="width:100%; border-top:1px solid #ddd; clear:both;"></div>
          <p>
            Web开发 &nbsp; 机器学习
          </p>

          <h3 style="font-weight: bolder">个人标签</h3>
          <div style="width:100%; border-top:1px solid #ddd; clear:both;"></div>
          <p>
            张敏 &nbsp; 男 &nbsp; 90后小清新 &nbsp; 国产剧脑残粉 &nbsp; 积极的悲观主义者
          </p>

          <h3 style="font-weight: bolder">教育</h3>
          <div style="width:100%; border-top:1px solid #ddd; clear:both;"></div>
          <p>
            <ul style="padding-left: 20px">
              <li>2014 ~ 2017 &nbsp; 硕士 &nbsp; 华东理工大学</li>
              <li>2010 ~ 2014 &nbsp; 本科 &nbsp; 武汉科技大学</li>
            </ul>
          </p>

          <h3 style="font-weight: bolder">技能</h3>
          <div style="width:100%; border-top:1px solid #ddd; clear:both;"></div>
          <p>
            <ul style="padding-left: 20px">
              <li>计算机技能
                <ul style="padding-left: 20px">
                  <li>语言：PHP、Python、JavaScript</li>
                  <li>框架：Laravel、Vue.js、TensorFlow、Koa</li>
                  <li>系统：CentOS & Ubuntu</li>
                </ul>
              </li>
              <li>其他技能
                <ul style="padding-left: 20px">
                  <li>擅长：凝聚态物理第一性原理计算、反应器模拟设计</li>
                  <li>模拟软件：Matlab、Aspen Plus、MaterialsStudio、VASP</li>
                </ul>
              </li>
            </ul>
          </p>

          <h3 style="font-weight: bolder">联系方式</h3>
          <div style="width:100%; border-top:1px solid #ddd; clear:both;"></div>
          <p>
            <ul style="padding-left: 20px">
              <li>邮箱：root@laravue.org</li>
              <li>主页：
                <a href="https://laravue.org">https://laravue.org</a>
              </li>
            </ul>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.about {
  color: #555;
  line-height: 30px;
  .first {
    text-align: center;
    font-size: 25px;
    padding: 40px 0 40px;
  }
  p {
    padding: 10px 0 10px 20px;
  }
  a {
    color: #00b5ad;
  }
  h3 {
    padding-top: 10px;
  }
}
</style>