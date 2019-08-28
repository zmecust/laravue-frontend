<template>
  <div>
    <el-row>
      <el-col :span="18">
        <div class="about">
          <div style="text-align: center">
            <img src="../../assets/me.jpg" style="width: 60%;" alt="">
          </div>       
          <h3 class="sub-title">关于</h3>
          <div class="cut-off-line"></div>
          <!-- <p >
            LaraVue&nbsp;是两个框架名字组合而成的，这两个框架是我转行接触编程所学的第一个后端框架&nbsp;“Laravel”&nbsp; 以及第一个前端框架&nbsp;“Vue”。本来2017年3月份准备申请&nbsp;laravue.com&nbsp;的域名，但是发现国外一哥们抢先我三天申请了。 这个微社区是一个前后端完全分离的项目，是我前一个社区的改进版。 该社区也没有什么高大上定位，主要是对一些技术和人生方面的思考进行分享，方便自己顺便方便后人。项目源代码都开源到了&nbsp;
            <a href="https://github.com/zmecust/laravue-frontend">Github</a>， 有兴趣可以看看，不要忘了&nbsp;star&nbsp;哦，哈哈哈！
            <br>
          </p> -->
          <p style="text-align:justify">
            <ul style="padding-left: 20px">
              <li>非科班 CS 专业，硕士期间自学编程。从 PHP 起家，最喜欢 Laravel 框架以及它所包含的设计模式</li>
              <li>后因工作需要，转移到大前端。Vue、Angular、React 都撸过项目，喜欢 Vue 的渐进式即插即用，喜欢 React 的 JXS，喜欢 Koa 的洋葱模型以及面向切面编程，和 Nodejs 异步非阻塞</li>
              <li>我的数学基础自我感觉比较好，如果不玩 AI 真是浪费了我的数学天赋。目前专注于 NLP 以及 CV 领域的目标检测</li>
              <li>业余喜欢炒股，主动投资者，立志做一名全职 Quant。寻找属于自己的 α，以期实现财富自由</li>
            </ul>
          </p>

          <h3 class="sub-title">兴趣爱好</h3>
          <div class="cut-off-line"></div>
          <p>
            Web 开发 &nbsp; 人工智能 &nbsp; 量化投资
          </p>

          <h3 class="sub-title">个人标签</h3>
          <div class="cut-off-line"></div>
          <p>
            张敏 &nbsp; 男 &nbsp; 90后小清新 &nbsp; 国产剧脑残粉 &nbsp; 积极的悲观主义者 &nbsp; 终生学习者
          </p>

          <h3 class="sub-title">教育经历</h3>
          <div class="cut-off-line"></div>
          <p>
            <ul style="padding-left: 20px">
              <li>2014.09 ~ 2017.06 &nbsp; 硕士 &nbsp; 华东理工大学 &nbsp; 计算化学</li>
              <li>2010.09 ~ 2014.06 &nbsp; 本科 &nbsp; 武汉科技大学 &nbsp; 化学工程</li>
            </ul>
          </p>

          <h3 class="sub-title">工作经历</h3>
          <div class="cut-off-line"></div>
          <p>
            <ul style="padding-left: 20px">
              <li>2018.06 ~ 至今 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Autodesk上海研发中心</li>
              <li>2017.02 ~ 2018.06 &nbsp; 上海仪电数字技术有限公司</li>
            </ul>
          </p>

          <h3 class="sub-title">技能</h3>
          <div class="cut-off-line"></div>
          <p>
            <ul style="padding-left: 20px">
              <li>计算机技能
                <ul style="padding-left: 20px">
                  <li>语言：PHP、Python、JavaScript</li>
                  <li>框架：Laravel、Vue、React、TensorFlow、Pytorch、Koa</li>
                  <li>其他：Nginx、Docker、MySQL、MongoDB</li>
                </ul>
              </li>
              <li>其他技能
                <ul style="padding-left: 20px">
                  <li>擅长：凝聚态物理第一性原理计算、催化剂理论设计与筛选</li>
                  <li>模拟软件：Matlab、Aspen Plus、MaterialsStudio、VASP</li>
                </ul>
              </li>
            </ul>
          </p>

          <h3 class="sub-title">发表论文</h3>
          <div class="cut-off-line"></div>
          <p>
            <ul style="padding-left: 20px">
              <li>Ya-Shan Zheng, <span class="me">Min Zhang</span>, Qian Li, Yi-An Zhu*, Zhi-Jun Sui,  De Chen, Xing-Gui Zhou. Electronic origin of oxygen transport behavior in La-based perovskites: A density functional theory study. The Journal of Physical Chemistry C, 2019, 123(1): 275-90. (Supplementary journal cover)</li>
              <li>Qing-Ming Li, <span class="me">Min Zhang</span>, Chuan-Ming Wang*, Yi-An Zhu*, Xing-Gui Zhou, Zai-Ku Xie. Effects of methylating agent and Brønsted acidity on methylation activity of olefins in CHA-structured zeolites: A periodic DFT study. Molecular Catalysis, 2018, 446: 106-14.</li>
              <li>Yun-Xiang Deng, Yang Li, Yi-An Zhu*, <span class="me">Min Zhang</span>, Xing-Gui Zhou. Structural stability of perovskite type composite oxide LaCrO3-δ. Chemical Reaction Engineering and Technology (in Chinese), 2017, 33(2): 123-8.</li>
            </ul>
          </p>

          <h3 class="sub-title">联系方式</h3>
          <div class="cut-off-line"></div>
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
  .me {
    font-weight: bold;
    text-decoration: underline
  }
  .cut-off-line {
    width: 100%;
    border-top: 1px solid #ddd;
    clear: both;
  }
  .sub-title {
    font-weight: bolder
  }
}
</style>