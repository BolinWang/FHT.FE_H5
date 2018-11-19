<template>
  <div class="page_container">
      <div class="list">
        <button class="actDetail" @click="actDetailDialog">
          活动规则
        </button>
        <ul>
          <li>
              <a href="https://static.mdguanjia.com/room-detail/?type=1&roomId=1984">
                <div>
                  <img src="../assets/img1.jpg" alt="">
                  <em>立减1000元</em>
                </div>
                <h3>麦家品寓武林店</h3>
                <p>下城区&nbsp;&nbsp;环城北路22号</p>
                <span>预约</span>
              </a>
          </li>
          <li>
              <a href="https://static.mdguanjia.com/room-detail/?type=1&roomId=1021">
                <div>
                  <img src="../assets/img2.jpg" alt="">
                  <em>立减1000元</em>
                </div>
                <h3>麦家公寓杭州汽车南站店</h3>
                <p>上城区&nbsp;&nbsp;秋涛路256号</p>
                <span>预约</span>
              </a>
              <span class="qian pos1"></span>
          </li>
          <li>
              <a href="https://static.mdguanjia.com/room-detail/?type=1&roomId=589">
                <div>
                  <img src="../assets/img3.jpg" alt="">
                  <em>立减500元</em>
                </div>
                <h3>麦家公寓杭州未来科技城店</h3>
                <p>余杭区&nbsp;&nbsp;高教路与向往街交汇处</p>
                <span>预约</span>
              </a>
              <span class="qian pos2"></span>
          </li>
          <li>
              <a href="https://static.mdguanjia.com/room-detail/?type=1&roomId=7">
                <div>
                  <img src="../assets/img4.jpg" alt="">
                  <em>立减500元</em>
                </div>
                <h3>麦家公寓杭州西溪靖远店</h3>
                <p>余杭区&nbsp;&nbsp;五常大道165号</p>
                <span>预约</span>
              </a>
              <span class="qian pos3"></span>
          </li>
          <li>
              <a href="https://static.mdguanjia.com/room-detail/?type=1&roomId=11">
                <div>
                  <img src="../assets/img5.jpg" alt="">
                  <em>立减500元</em>
                </div>
                <h3>麦家公寓杭州中大新华店</h3>
                <p>下城区&nbsp;&nbsp;东新路870号</p>
                <span>预约</span>
              </a>
          </li>
        </ul>
      </div>
      <div class="mask" v-show="mask" @click="closeMask">
          <img src="../assets/actDetail.jpg" alt="" id="img" >
      </div>
  </div>
</template>

<script>
export default {
  name: 'activePage',
  components: {

  },
  props: {
    params: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      urlSearchParams: {},
      mask: false
    }
  },
  created () {
    this.urlSearchParams = this.params
  },
  mounted () {

  },
  methods: {
    actDetailDialog () {
      this.mask = true
    },
    closeMask (e) {
      const img = document.getElementById('img')
      if (!img.contains(e.target)) {
        this.mask = false
      }
    }
  },
  watch: {
    params: {
      immediate: true,
      handler: function (val = {}) {
        this.urlSearchParams = val
      }
    }
  }
}
</script>

<style lang="scss">
  .mask{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:100;
    img {
      display: block;
      width: 661px;
      height: 648px;
    }
  }
  .page_container{
    position: relative;
    padding-top:720px;
    background:url('../assets/wap.png') top center no-repeat;
    background-size:contain;
  }
  .list{
    background:url('../assets/listbg.png');
    background-size:contain;
    ul {
      margin: 0 auto;
      width: 664px;
      padding-bottom: 80px;
      li {
      position: relative;
      padding:34px 38px;
      margin-bottom:55px;
      width: 662px;
      height: 490px;
      background: #fff;
      border-radius: 10px;
      box-shadow: -8px -1px 8px #402a7e;
      box-sizing: border-box;
      z-index:2;
      a {
        display: block;
        position: relative;
        color:#333;
        img {
          display:block;
          width:586px;
          height:310px;
        }
        em{
          display: block;
          position: absolute;
          left:0;
          top:256px;
          width:202px;
          height:54px;
          background:rgba(0,0,0,0.5);
          color:#fff;
          font-style: normal;
          text-align: center;
          line-height: 54px;
          font-size:30px;
          font-weight: bold;
        }
        h3{
          margin-top:34px;
          font-size:32px;
          line-height:32px;
          margin-bottom:0;
          font-weight: bold;
        }
        p{
          margin-top:20px;
          font-size:28px;
          margin-bottom:0;
          font-weight: normal;
        }
        span{
          position: absolute;
          right:0;
          bottom:10px;
          width:174px;
          height:80px;
          border-radius:5px;
          color:#fff;
          background:url('../assets/btn.png') no-repeat;
          background-size:contain;
          text-indent: -99999px;
        }
      }
    }
    li::before,li::after{
      position: absolute;
      top:12px;
      display: block;
      content:'';
      width:15px;
      height:15px;
      background:#5e4496;
      font-size:0;
      line-height:0;
      border-radius:50%;
      box-shadow: -3px 0 1px #ccbfce;

    }
    li::before{
      left:15px;
    }
    li::after{
      right:15px;
    }
    li .qian{
      display: block;
      width:75px;
      height:48px;
      position: absolute;
      background:url('../assets/icon.png') no-repeat;
      background-size:contain
    }
    li .pos1{
      left:-75px;
      top:50%;
    }
    li .pos2{
      right:300px;
      top:100%;
    }
    li .pos3{
      right:-75px;
      top:100%;
    }
    }
  }
  .actDetail{
    position: absolute;;
    top:53px;
    right:0;
    display: block;
    width:166px;
    height:50px;
    border:none;
    background:#fdd473;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    text-align: center;
    line-height: 50px;
    color:#242367;
  }

</style>
