<template>
  <div class="root_wrap">
    <section id="pano"></section>
    <section class="page_container">
      <div class="control-bar" v-if="isShow">
        <ul>
          <li
            v-for="(item, index) in toolbarList"
            :key="item"
            @click="changeView(index)"
            class="changeView" :class="[item, isActive === index ? 'on' : '']">
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { getWxShareInfo } from '@/utils/wxshare'
import { playerVrApi } from '@/api/vr'
import Bridge from '@/utils/bridge'

const initPageInfoData = {
  title: '麦邻租房',
  shareData: {
    title: '全城VR看房',
    introduction: '麦邻租房',
    thumbnail: '',
    linkUrl: location.href
  }
}

/* eslint-disable */
let testData = {
  "reqId": "1",
  "code": "0",
  "message": "操作成功",
  "data": {
    cover:"//media.csimum.com/97f7f6b52b9141b6925b0976e2aca940/data/preview.jpg",
    "model_type": "3d",
    model_3d: "//media.csimum.com/97f7f6b52b9141b6925b0976e2aca940/v1/meta.js",
    "model_25d+": "25d+时存在",
    "houseInfo": {
      "roomCode": "房间编号",
      "houseName": "房屋显示名称（出租类型+小区+楼层+房间名称+房间面积)",
      "houseType": "户型",
      "floorName": "楼层",
      "houseArea": 1.11, // 面积 DOUBLE类型
      "decorationDegree":1, // 装修程度：1-毛坯, 2-简装, 3-精装修, 4-豪华装
      "roomDirection": 1 // 朝向：1-朝南, 2-朝北, 3-朝东, 4-朝西, 5-东南, 6-西南, 7-东北, 8-西北
    },
    list:[
      {
        name:"客厅",
        previewUrl:"http://media.csimum.com/pano369ca6851b5f218e6c75589dde2e6243/thumb/500_500/panofile.jpg",
        vrUrl:"http://media.csimum.com/pano369ca6851b5f218e6c75589dde2e6243/oper/panofile_html",
        thumbUrl:"//oss-static.detu.com/detu_player/csimum/skin/thumbs/living.png"
      },{
        name:"餐厅",
        previewUrl:"http://media.csimum.com/pano90f1fc36525aa62c205aaa116fb36f2e/thumb/500_500/panofile.jpg",
        vrUrl:"http://media.csimum.com/pano90f1fc36525aa62c205aaa116fb36f2e/oper/panofile_html",
        thumbUrl:"//oss-static.detu.com/detu_player/csimum/skin/thumbs/dining.png"
      },{
        name:"厨房",
        previewUrl:"http://media.csimum.com/pano7eeea5f7e07218953655475c33408973/thumb/500_500/panofile.jpg",
        vrUrl:"http://media.csimum.com/pano7eeea5f7e07218953655475c33408973/oper/panofile_html",
        thumbUrl:"//oss-static.detu.com/detu_player/csimum/skin/thumbs/kitchen.png"
      },{
        name:"主卧",
        previewUrl:"http://media.csimum.com/panobcff4ddad2aaf6b591d5a95de391410f/thumb/500_500/panofile.jpg",
        vrUrl:"http://media.csimum.com/panobcff4ddad2aaf6b591d5a95de391410f/oper/panofile_html",
        thumbUrl:"//oss-static.detu.com/detu_player/csimum/skin/thumbs/first_bedroom.png"
      },{
        name:"主卫",
        previewUrl:"http://media.csimum.com/pano7dfe0f1b4c56a5e367690558b4c8e07a/thumb/500_500/panofile.jpg",
        vrUrl:"http://media.csimum.com/pano7dfe0f1b4c56a5e367690558b4c8e07a/oper/panofile_html",
        thumbUrl:"//oss-static.detu.com/detu_player/csimum/skin/thumbs/first_bedroom.png"
      },{
        name:"客卧",
        previewUrl:"http://media.csimum.com/pano2985ae05297ad11eb68903347530b03e/thumb/500_500/panofile.jpg",
        vrUrl:"http://media.csimum.com/pano2985ae05297ad11eb68903347530b03e/oper/panofile_html",
        thumbUrl:"//oss-static.detu.com/detu_player/csimum/skin/thumbs/first_bedroom.png"
      },{
        name:"客卫",
        previpreviewUrlew:"http://media.csimum.com/pano90f0bbef429bcb352fe92ea3b95d63da/thumb/500_500/panofile.jpg",
        vrUrl:"http://media.csimum.com/pano90f0bbef429bcb352fe92ea3b95d63da/oper/panofile_html",
        thumbUrl:"//oss-static.detu.com/detu_player/csimum/skin/thumbs/first_bedroom.png"
      },{
        name:"儿童房",
        previewUrl:"http://media.csimum.com/pano23c92172ea0f2fea7bf7265bdd0d9c76/thumb/500_500/panofile.jpg",
        vrUrl:"http://media.csimum.com/pano23c92172ea0f2fea7bf7265bdd0d9c76/oper/panofile_html",
        thumbUrl:"//oss-static.detu.com/detu_player/csimum/skin/thumbs/first_bedroom.png"
      },{
        name:"玄关",
        previewUrl:"http://media.csimum.com/panod35403efd6271b0d7228d2364c370d66/thumb/500_500/panofile.jpg",
        vrUrl:"http://media.csimum.com/panod35403efd6271b0d7228d2364c370d66/oper/panofile_html",
        thumbUrl:"//oss-static.detu.com/detu_player/csimum/skin/thumbs/first_bedroom.png"
    }],
		model_25d:'{"floorplan":{"corners":{"f90da5e3-9e0e-eba7-173d-eb0b071e838e":{"x":217.043,"y":468.8839999999997},"da026c08-d76a-a944-8e7b-096b752da9ed":{"x":672.2109999999999,"y":289.052},"4e3d65cb-54c0-0681-28bf-bddcc7bdb571":{"x":672.2109999999999,"y":-178.308},"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2":{"x":204.85099999999989,"y":-178.308},"2d4f8cc3-7f21-c689-3e37-d70760211709":{"x":-697.3569999999999,"y":223.01199999999994},"4374aa2a-e932-5435-f6ef-92908c176fd7":{"x":-544.957,"y":115.31600000000003},"9e361aeb-ac55-aa16-2f0b-ce2c141b7890":{"x":-697.3569999999999,"y":42.16399999999999},"61be4dde-4dd0-faf7-3b80-4bd85b662cb5":{"x":-215.77300000000002,"y":42.16399999999999},"dd4ac5a9-35ac-ce99-7f76-a8fc31a1ddf9":{"x":-559.181,"y":131.5719999999999},"8374c71d-46b0-2104-dc25-cbe7ce932863":{"x":-240.15699999999993,"y":179.83199999999988},"dc5a957e-061e-7568-7ecd-e47504383673":{"x":-49.14900000000005,"y":468.8839999999997},"8a2af12f-3039-e045-258f-2172f058e570":{"x":-719.7090000000001,"y":223.01199999999994},"3e36607b-38e9-f7a1-4bbe-b82426a20646":{"x":-719.7090000000001,"y":115.31600000000003},"ba2e554a-23fc-25d9-360c-5bfbe90708b3":{"x":-559.181,"y":-65.02400000000011},"09b52a96-a5f2-0b27-4d8f-929caced2b7c":{"x":58.5469999999998,"y":131.5719999999999},"dcb1e696-bcb5-e8c8-e8f7-5aef0926c53f":{"x":-321.43700000000007,"y":131.5719999999999},"45d56bde-1b56-ffe4-aee7-2a197f9115ce":{"x":-321.43700000000007,"y":-65.02400000000011},"0556b40f-b950-1007-86c2-69e1e67dbe15":{"x":160.14700000000005,"y":42.16399999999999},"b8e6104b-f1cb-e29d-f638-c2be7b022139":{"x":-144.65300000000002,"y":147.31999999999994},"d646fbe1-01d7-0de7-bbc4-57ad9be86709":{"x":312.547,"y":168.1479999999999},"262aefc5-91b8-22b7-246a-bee98bda9c39":{"x":-20.701000000000022,"y":223.01199999999994},"235624c6-4b53-ee5c-a569-e9a2188aaeb4":{"x":217.043,"y":223.01199999999994},"0d5f2051-562a-a1e5-62cd-3f18c20f8309":{"x":139.827,"y":168.1479999999999},"ae4d4ac0-fadb-1aba-3c9a-463a39868672":{"x":-311.2770000000001,"y":223.01199999999994},"b60b655a-727c-9f7b-bcd9-71e806c8f9d8":{"x":-311.2770000000001,"y":468.8839999999997},"a5f6eab9-ebd8-7842-1903-4f5e0216f62a":{"x":-49.14900000000005,"y":468.8839999999997},"2af31c16-8b35-6351-e8f3-730d4fb02779":{"x":160.14700000000005,"y":223.01199999999994},"85a50db5-1a89-51cd-41ff-64f3c2183235":{"x":26.035000000000082,"y":23.367999999999938},"9fafdc9e-9f70-12d9-bf9f-f21e5b57828f":{"x":-20.701000000000022,"y":64.00799999999992},"a2b9243d-307a-73ba-471c-d6adc619a892":{"x":-20.701000000000022,"y":223.01199999999994},"4fb5ffb8-52cb-f4e3-4812-3c2e72d2d949":{"x":160.14700000000005,"y":223.01199999999994},"64ecb0c4-4b58-a04f-a710-03d3079eed80":{"x":-116.20500000000001,"y":-65.02400000000011},"1674b734-9752-6fe5-7a8a-8b170c0bf09a":{"x":217.043,"y":135.63599999999997},"f3caea86-0adc-99b1-fb98-4485afad170e":{"x":286.1310000000001,"y":135.63599999999997},"a966a50a-d692-de99-02e9-f54fe2591ad7":{"x":30.098999999999933,"y":175.76799999999992},"fa4a6530-ee07-4692-c257-7ed5c8714d2a":{"x":-49.14900000000005,"y":223.01199999999994},"cfaf4731-e209-8534-8d8f-501b291d81e8":{"x":462.91500000000013,"y":223.01199999999994},"41de0e48-5f6f-76ad-d224-b98293087ba4":{"x":462.91500000000013,"y":344.932},"56f8e7be-4295-aedc-7474-071ba7b7a8be":{"x":217.043,"y":468.8839999999997},"e65fb12b-0630-8b2d-4c35-e5685d34c437":{"x":286.1310000000001,"y":-35.05200000000001},"47f7fe8d-5a07-681b-d7b5-ae7ddd0324f1":{"x":316.61100000000033,"y":-65.02400000000011},"6ce55509-7574-b5a5-2641-a84cfb9a707c":{"x":536.067,"y":-54.864000000000146},"adacd457-97f7-6cd1-5a02-0573360f8285":{"x":286.1310000000001,"y":135.63599999999997},"7ca04af3-41d8-4f58-ebac-a561d6167093":{"x":185.54700000000003,"y":49.78399999999988},"73df19e5-4426-1c07-b5d8-881767ddfd33":{"x":588.8990000000001,"y":135.63599999999997},"3c10be67-7a25-ee55-103f-b8dc7d098694":{"x":316.61100000000033,"y":288.0359999999998},"9c76c896-f5b7-8a98-5edb-774e447a9365":{"x":714.883,"y":286.0039999999999},"714c8424-34f4-3489-b580-d4248429e4a3":{"x":479.1710000000002,"y":135.63599999999997},"074e17dd-3e19-7b8e-63ac-173cc65285c9":{"x":353.1870000000001,"y":135.63599999999997},"1e935893-baa2-d57e-cd17-17d457f4a211":{"x":217.043,"y":468.8839999999997},"80b0e4f7-cb4d-8221-d09d-f504a904dae3":{"x":479.1710000000002,"y":468.8839999999997},"d5d3a6a1-6951-9699-d375-1ffbaaa1fb53":{"x":479.1710000000002,"y":288.0359999999998},"27f23be0-166c-bd09-3ed7-fde02fde26a2":{"x":458.8510000000001,"y":135.63599999999997},"866c0cc2-e857-365d-2680-cdb8c83a1205":{"x":217.043,"y":223.01199999999994},"8a16bc5c-3f35-d0da-ca68-1bce2f99a0b2":{"x":-697.3569999999999,"y":32.00400000000002},"25b0d880-baa3-f732-8d06-d554972e03f1":{"x":-559.181,"y":32.00400000000002},"5e674c0d-172e-3a72-5b4c-7b397c471fff":{"x":-116.20500000000001,"y":131.5719999999999},"4ce217ae-2fb9-62a9-9b5a-57a7e974ef73":{"x":286.1310000000001,"y":135.63599999999997},"99f07dfa-dd65-6479-c696-c643fa6457f5":{"x":26.03500000000002,"y":-65.02400000000011},"a9599354-d8a1-53b4-0c23-69d9bd982987":{"x":32.131000000000085,"y":59.94399999999996},"1dee0806-a83b-3e7b-f79b-4eb7c8f3a287":{"x":316.61100000000033,"y":135.63599999999997},"9c0d982b-ab36-0844-dfc7-6e1aa542c73a":{"x":255.65100000000007,"y":-35.05200000000001},"90e1167a-bc15-0e48-5e8e-8b2c35596199":{"x":-321.43700000000007,"y":-65.02400000000011},"2ee0117d-63da-c567-6300-245b4401e528":{"x":-321.43700000000007,"y":-11.176000000000158},"3d303016-4857-4620-0755-2948c22ed4db":{"x":-321.43700000000007,"y":72.13599999999997},"d64c5ded-9fae-dbdd-e85c-5da32d732a85":{"x":-321.43700000000007,"y":131.5719999999999},"4aacf1a9-027d-2bf2-d794-49adfdc83991":{"x":30.098999999999933,"y":175.76799999999992},"7bc67f13-98dd-31e4-dfef-beb5770976df":{"x":97.15499999999997,"y":51.81599999999992},"f57622d2-4299-c0af-e081-a9b25f5bc357":{"x":160.14700000000005,"y":223.01199999999994},"d5796b3c-64cf-c68f-4eaf-ceaba7680e9b":{"x":160.14700000000005,"y":223.01199999999994},"63a51c99-1616-5073-2a2c-a00029dd8ab3":{"x":160.14700000000005,"y":223.01199999999994},"55554d5f-9d84-a0d6-b2fb-672220882c36":{"x":160.14700000000005,"y":223.01199999999994},"11cd3ccd-4940-73ab-4808-c5b3ffdb068b":{"x":160.14700000000005,"y":223.01199999999994},"6bdcc522-69e6-6c7e-b8c2-0a6de1a4c761":{"x":160.14700000000005,"y":223.01199999999994},"aadebaea-96bf-9cfe-2686-cc7df0dc5464":{"x":-20.701000000000022,"y":64.00799999999992},"885f4d44-a271-db4f-ea5b-d40cdaaa0a8b":{"x":-20.701000000000022,"y":64.00799999999992},"57e6ab7d-cb5c-b6e7-dabd-71a29c474caa":{"x":26.03500000000002,"y":131.5719999999999},"3f48fd9b-5b3d-9871-5f2d-24e0e13e2051":{"x":-49.149000000000115,"y":157.4799999999998},"64d49f12-7331-83f7-e498-7b2e25f8a2f2":{"x":-116.20500000000001,"y":131.5719999999999},"825996a1-3de5-37c1-0294-4e7e5866416d":{"x":26.03500000000002,"y":131.5719999999999},"a433640e-7dfc-b6f3-02b9-da98604506e7":{"x":-20.701000000000022,"y":42.16399999999999},"3b44cbf0-0f6f-462d-d879-8639bab7671b":{"x":5.7150000000001455,"y":131.5719999999999},"ecda05f7-a186-82d5-89ca-468b1b90f068":{"x":26.03500000000002,"y":131.5719999999999},"450b30bf-f2ff-849d-4d09-a45f021d8fec":{"x":58.5469999999998,"y":131.5719999999999},"8033b47c-e6c0-aa29-c3a5-1ee35dbf44dd":{"x":78.86699999999996,"y":131.5719999999999},"1ebaa06b-43ec-5c7b-3eb2-17159a99985f":{"x":217.043,"y":135.63599999999997},"a333fd12-5e72-1f9b-1ea8-919a6fddb5e9":{"x":26.03500000000002,"y":-65.02400000000011},"f14ce37e-9bf9-90cf-f409-0f983d047159":{"x":26.03500000000002,"y":131.5719999999999}},"walls":[{"corner1":"2d4f8cc3-7f21-c689-3e37-d70760211709","corner2":"8a16bc5c-3f35-d0da-ca68-1bce2f99a0b2","frontTexture":{"url":"//media.csimum.com/2_5D/Fj7tT1wEjt9Q6fjrx4DPxQuo7sZQ.jpg","stretch":true,"scale":300,"scene":8},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"ba2e554a-23fc-25d9-360c-5bfbe90708b3","corner2":"25b0d880-baa3-f732-8d06-d554972e03f1","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"//media.csimum.com/2_5D/Fpqo3vPvJfw-HycVXQPe0K5pc3Q4.jpg","stretch":true,"scale":300,"scene":2}},{"corner1":"dd4ac5a9-35ac-ce99-7f76-a8fc31a1ddf9","corner2":"dcb1e696-bcb5-e8c8-e8f7-5aef0926c53f","frontTexture":{"url":"//media.csimum.com/2_5D/FtYqDh8BZhgOeGEgWT0XTp0B2DLF.jpg","stretch":true,"scale":300,"scene":8},"backTexture":{"url":"//media.csimum.com/2_5D/FgjAiG08mrF427gsxlc4zWR5wAkr.jpg","stretch":true,"scale":300,"scene":2}},{"corner1":"ba2e554a-23fc-25d9-360c-5bfbe90708b3","corner2":"45d56bde-1b56-ffe4-aee7-2a197f9115ce","frontTexture":{"url":"//media.csimum.com/2_5D/FqvUAGhdgBKPVGP1ZNBPsQbh3fJ-.jpg","stretch":true,"scale":300,"scene":2},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"45d56bde-1b56-ffe4-aee7-2a197f9115ce","corner2":"64ecb0c4-4b58-a04f-a710-03d3079eed80","frontTexture":{"url":"//media.csimum.com/2_5D/Fie0PHWOZP6N7JTOaYO4IkGyuyBS.jpg","stretch":true,"scale":300,"scene":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"64ecb0c4-4b58-a04f-a710-03d3079eed80","corner2":"5e674c0d-172e-3a72-5b4c-7b397c471fff","frontTexture":{"url":"//media.csimum.com/2_5D/FlQnT9MvBLjQM0VEIFC8ZDCGGs8N.jpg","stretch":true,"scale":300,"scene":0},"backTexture":{"url":"//media.csimum.com/2_5D/FjiLrxkF073paTXRILesA-E3XdhH.jpg","stretch":true,"scale":300,"scene":6}},{"corner1":"ae4d4ac0-fadb-1aba-3c9a-463a39868672","corner2":"b60b655a-727c-9f7b-bcd9-71e806c8f9d8","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"//media.csimum.com/2_5D/FmeNiA1jVSmNEeazsLBvXlxEWJrS.jpg","stretch":true,"scale":300,"scene":0}},{"corner1":"b60b655a-727c-9f7b-bcd9-71e806c8f9d8","corner2":"dc5a957e-061e-7568-7ecd-e47504383673","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"//media.csimum.com/2_5D/FkiydxKIB62YC915IoUx0AiUdcjG.jpg","stretch":true,"scale":300,"scene":0}},{"corner1":"dc5a957e-061e-7568-7ecd-e47504383673","corner2":"fa4a6530-ee07-4692-c257-7ed5c8714d2a","frontTexture":{"url":"//media.csimum.com/2_5D/FgQ6mpzLgAAfa2ywOc28oPzpDupU.jpg","stretch":true,"scale":300,"scene":5},"backTexture":{"url":"//media.csimum.com/2_5D/FlPNEYYNs2ib6n7P0j_KwaJvAURl.jpg","stretch":true,"scale":300,"scene":0}},{"corner1":"64ecb0c4-4b58-a04f-a710-03d3079eed80","corner2":"a333fd12-5e72-1f9b-1ea8-919a6fddb5e9","frontTexture":{"url":"//media.csimum.com/2_5D/Fn8pFF6JXCQnuEcrgwVVryMMLHhr.jpg","stretch":true,"scale":300,"scene":4},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"fa4a6530-ee07-4692-c257-7ed5c8714d2a","corner2":"2af31c16-8b35-6351-e8f3-730d4fb02779","frontTexture":{"url":"//media.csimum.com/2_5D/FvXC3mlazy7zZTgp32t1bplXJxm8.jpg","stretch":true,"scale":300,"scene":5},"backTexture":{"url":"//media.csimum.com/2_5D/FmCGjaFHNzxez2HBtNRsxZUMylrs.jpg","stretch":true,"scale":300,"scene":0}},{"corner1":"235624c6-4b53-ee5c-a569-e9a2188aaeb4","corner2":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","frontTexture":{"url":"//media.csimum.com/2_5D/FiE5ubQSam24cEBzuArBMVc0MWh1.jpg","stretch":true,"scale":300,"scene":5},"backTexture":{"url":"//media.csimum.com/2_5D/FsJXYLzDZT9oN6ydfr2yuXFHePR2.jpg","stretch":true,"scale":300,"scene":3}},{"corner1":"a333fd12-5e72-1f9b-1ea8-919a6fddb5e9","corner2":"47f7fe8d-5a07-681b-d7b5-ae7ddd0324f1","frontTexture":{"url":"//media.csimum.com/2_5D/FndDmupH6HyEowL5SzUanDmLJw4r.jpg","stretch":true,"scale":300,"scene":7},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"1dee0806-a83b-3e7b-f79b-4eb7c8f3a287","corner2":"3c10be67-7a25-ee55-103f-b8dc7d098694","frontTexture":{"url":"//media.csimum.com/2_5D/FtNMkrz7HRGr8pb-YrZq50v7TzON.jpg","stretch":true,"scale":300,"scene":3},"backTexture":{"url":"//media.csimum.com/2_5D/FvZVmQVbOgy8XxxpQxxWM7wvIq_-.jpg","stretch":true,"scale":300,"scene":4}},{"corner1":"3c10be67-7a25-ee55-103f-b8dc7d098694","corner2":"d5d3a6a1-6951-9699-d375-1ffbaaa1fb53","frontTexture":{"url":"//media.csimum.com/2_5D/FufdMrilLoW9sYTVfs8YMxr2jLbJ.jpg","stretch":true,"scale":300,"scene":3},"backTexture":{"url":"//media.csimum.com/2_5D/FpxgprFTA8-p1mgFrfG-DsbqOEX3.jpg","stretch":true,"scale":300,"scene":4}},{"corner1":"d5d3a6a1-6951-9699-d375-1ffbaaa1fb53","corner2":"714c8424-34f4-3489-b580-d4248429e4a3","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"//media.csimum.com/2_5D/FlcQAJsWj--FzMdRLsqIBrlo98af.jpg","stretch":true,"scale":300,"scene":4}},{"corner1":"714c8424-34f4-3489-b580-d4248429e4a3","corner2":"1dee0806-a83b-3e7b-f79b-4eb7c8f3a287","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"//media.csimum.com/2_5D/FntcI_H1HJhIpbqqsrBY4MYVrQtM.jpg","stretch":true,"scale":300,"scene":4}},{"corner1":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","corner2":"80b0e4f7-cb4d-8221-d09d-f504a904dae3","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"//media.csimum.com/2_5D/Fl4gBphXnjYnGAYD1kXT0jlSxVFB.jpg","stretch":true,"scale":300,"scene":3}},{"corner1":"80b0e4f7-cb4d-8221-d09d-f504a904dae3","corner2":"d5d3a6a1-6951-9699-d375-1ffbaaa1fb53","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"//media.csimum.com/2_5D/FlU_BGrb6aHUWOE3LuUPw1CG9VOI.jpg","stretch":true,"scale":300,"scene":3}},{"corner1":"ae4d4ac0-fadb-1aba-3c9a-463a39868672","corner2":"2d4f8cc3-7f21-c689-3e37-d70760211709","frontTexture":{"url":"//media.csimum.com/2_5D/FpCYxdCzcshU0IJQxSw9fwQZUgUF.jpg","stretch":true,"scale":300,"scene":8},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"8a16bc5c-3f35-d0da-ca68-1bce2f99a0b2","corner2":"25b0d880-baa3-f732-8d06-d554972e03f1","frontTexture":{"url":"//media.csimum.com/2_5D/FgMJVI9mC_ekYkeTpV6wuE2TLUFG.jpg","stretch":true,"scale":300,"scene":8},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"25b0d880-baa3-f732-8d06-d554972e03f1","corner2":"dd4ac5a9-35ac-ce99-7f76-a8fc31a1ddf9","frontTexture":{"url":"//media.csimum.com/2_5D/FqKt3lCyrE1U13fBCbLvLu0CMfGD.jpg","stretch":true,"scale":300,"scene":8},"backTexture":{"url":"//media.csimum.com/2_5D/FhBeAahWh_rqHI9CNtynEukeRXPd.jpg","stretch":true,"scale":300,"scene":2}},{"corner1":"1ebaa06b-43ec-5c7b-3eb2-17159a99985f","corner2":"235624c6-4b53-ee5c-a569-e9a2188aaeb4","frontTexture":{"url":"//media.csimum.com/2_5D/FhEWVRW9VyvOU-OIJyHkMjAT2bJR.png","stretch":true,"scale":300},"backTexture":{"url":"//media.csimum.com/2_5D/FhEWVRW9VyvOU-OIJyHkMjAT2bJR.png","stretch":true,"scale":300}},{"corner1":"1dee0806-a83b-3e7b-f79b-4eb7c8f3a287","corner2":"1ebaa06b-43ec-5c7b-3eb2-17159a99985f","frontTexture":{"url":"//media.csimum.com/2_5D/FgOUHOgU3jI7OrdPJPgH-6k3Czpc.jpg","stretch":true,"scale":300,"scene":7},"backTexture":{"url":"//media.csimum.com/2_5D/FgntgEAY4Rfsg34ImX26bwEOG_SF.jpg","stretch":true,"scale":300,"scene":3}},{"corner1":"1dee0806-a83b-3e7b-f79b-4eb7c8f3a287","corner2":"47f7fe8d-5a07-681b-d7b5-ae7ddd0324f1","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"//media.csimum.com/2_5D/FgIyqo1ygcEFuYir_r_WBuvOMQwI.jpg","stretch":true,"scale":300,"scene":7}},{"corner1":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","corner2":"dc5a957e-061e-7568-7ecd-e47504383673","frontTexture":{"url":"//media.csimum.com/2_5D/Fg4lNscIRZQmjEgz7rAnqofz-9rp.jpg","stretch":true,"scale":300,"scene":7},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"45d56bde-1b56-ffe4-aee7-2a197f9115ce","corner2":"2ee0117d-63da-c567-6300-245b4401e528","frontTexture":{"url":"//media.csimum.com/2_5D/Fua4isN1PVRuL8qUbKkLomFSnX1T.jpg","stretch":true,"scale":300,"scene":2},"backTexture":{"url":"//media.csimum.com/2_5D/Fr0TgNBwiof76q913wPNltn77oHi.jpg","stretch":true,"scale":300,"scene":2}},{"corner1":"2ee0117d-63da-c567-6300-245b4401e528","corner2":"3d303016-4857-4620-0755-2948c22ed4db","frontTexture":{"url":"//media.csimum.com/2_5D/FhEWVRW9VyvOU-OIJyHkMjAT2bJR.png","stretch":true,"scale":300},"backTexture":{"url":"//media.csimum.com/2_5D/FkvDZtHLn5N4T9r0CHd8fMAQar8d.jpg","stretch":true,"scale":300,"scene":2}},{"corner1":"3d303016-4857-4620-0755-2948c22ed4db","corner2":"dcb1e696-bcb5-e8c8-e8f7-5aef0926c53f","frontTexture":{"url":"//media.csimum.com/2_5D/Fua4isN1PVRuL8qUbKkLomFSnX1T.jpg","stretch":true,"scale":300,"scene":2},"backTexture":{"url":"//media.csimum.com/2_5D/Fg42bBlcVrmLs9EufKWFFz-1KBn2.jpg","stretch":true,"scale":300,"scene":2}},{"corner1":"2af31c16-8b35-6351-e8f3-730d4fb02779","corner2":"235624c6-4b53-ee5c-a569-e9a2188aaeb4","frontTexture":{"url":"//media.csimum.com/2_5D/FhEWVRW9VyvOU-OIJyHkMjAT2bJR.png","stretch":true,"scale":300},"backTexture":{"url":"//media.csimum.com/2_5D/FhEWVRW9VyvOU-OIJyHkMjAT2bJR.png","stretch":true,"scale":300}},{"corner1":"5e674c0d-172e-3a72-5b4c-7b397c471fff","corner2":"f14ce37e-9bf9-90cf-f409-0f983d047159","frontTexture":{"url":"//media.csimum.com/2_5D/FrDlGwjeMWoz4kEdfnIDbdya2NyF.jpg","stretch":true,"scale":300,"scene":6},"backTexture":{"url":"//media.csimum.com/2_5D/Fj5kgeUcFvtx-ieso1PaaFN5mUDL.jpg","stretch":true,"scale":300,"scene":6}},{"corner1":"450b30bf-f2ff-849d-4d09-a45f021d8fec","corner2":"1ebaa06b-43ec-5c7b-3eb2-17159a99985f","frontTexture":{"url":"//media.csimum.com/2_5D/FmCGjaFHNzxez2HBtNRsxZUMylrs.jpg","stretch":true,"scale":300,"scene":0},"backTexture":{"url":"//media.csimum.com/2_5D/Fh9mnEmydiqbe6-BdHtVJ3qQUKCX.jpg","stretch":true,"scale":300,"scene":6}},{"corner1":"a333fd12-5e72-1f9b-1ea8-919a6fddb5e9","corner2":"f14ce37e-9bf9-90cf-f409-0f983d047159","frontTexture":{"url":"//media.csimum.com/2_5D/FswFh8WtlVE92Oik0l6_ucvXZW8v.jpg","stretch":true,"scale":300,"scene":6},"backTexture":{"url":"//media.csimum.com/2_5D/FiE5ubQSam24cEBzuArBMVc0MWh1.jpg","stretch":true,"scale":300,"scene":7}},{"corner1":"f14ce37e-9bf9-90cf-f409-0f983d047159","corner2":"450b30bf-f2ff-849d-4d09-a45f021d8fec","frontTexture":{"url":"//media.csimum.com/2_5D/FhEWVRW9VyvOU-OIJyHkMjAT2bJR.png","stretch":true,"scale":300},"backTexture":{"url":"//media.csimum.com/2_5D/FhEWVRW9VyvOU-OIJyHkMjAT2bJR.png","stretch":true,"scale":300}}],"wallTextures":[],"floorTextures":{},"newFloorTextures":{"25b0d880-baa3-f732-8d06-d554972e03f1,2ee0117d-63da-c567-6300-245b4401e528,3d303016-4857-4620-0755-2948c22ed4db,45d56bde-1b56-ffe4-aee7-2a197f9115ce,ba2e554a-23fc-25d9-360c-5bfbe90708b3,dcb1e696-bcb5-e8c8-e8f7-5aef0926c53f,dd4ac5a9-35ac-ce99-7f76-a8fc31a1ddf9":{"url":"//media.csimum.com/2_5D/FkA3BDryAOm2m1_JHtfiwTvANlxb.jpg","scale":300,"scene":2, "name":"厨房"},"1dee0806-a83b-3e7b-f79b-4eb7c8f3a287,3c10be67-7a25-ee55-103f-b8dc7d098694,714c8424-34f4-3489-b580-d4248429e4a3,d5d3a6a1-6951-9699-d375-1ffbaaa1fb53":{"url":"//media.csimum.com/2_5D/FuX6mHIP5YfQn9KjQxoDu7J_p9rS.jpg","scale":300,"scene":4,"name":"主卫"},"235624c6-4b53-ee5c-a569-e9a2188aaeb4,2af31c16-8b35-6351-e8f3-730d4fb02779,dc5a957e-061e-7568-7ecd-e47504383673,f90da5e3-9e0e-eba7-173d-eb0b071e838e,fa4a6530-ee07-4692-c257-7ed5c8714d2a":{"url":"//media.csimum.com/2_5D/Fj4LScxY7xNASl-5Ml3aAlXzFqSx.jpg","scale":300,"scene":5,"name":"客房"},"1dee0806-a83b-3e7b-f79b-4eb7c8f3a287,1ebaa06b-43ec-5c7b-3eb2-17159a99985f,235624c6-4b53-ee5c-a569-e9a2188aaeb4,3c10be67-7a25-ee55-103f-b8dc7d098694,80b0e4f7-cb4d-8221-d09d-f504a904dae3,d5d3a6a1-6951-9699-d375-1ffbaaa1fb53,f90da5e3-9e0e-eba7-173d-eb0b071e838e":{"url":"//media.csimum.com/2_5D/FsRVxriPhTfWUEyqF6d-52SiWXH3.jpg","scale":300,"scene":3,"name":"主卧"},"1ebaa06b-43ec-5c7b-3eb2-17159a99985f,235624c6-4b53-ee5c-a569-e9a2188aaeb4,25b0d880-baa3-f732-8d06-d554972e03f1,2af31c16-8b35-6351-e8f3-730d4fb02779,2d4f8cc3-7f21-c689-3e37-d70760211709,2ee0117d-63da-c567-6300-245b4401e528,3d303016-4857-4620-0755-2948c22ed4db,450b30bf-f2ff-849d-4d09-a45f021d8fec,45d56bde-1b56-ffe4-aee7-2a197f9115ce,5e674c0d-172e-3a72-5b4c-7b397c471fff,64ecb0c4-4b58-a04f-a710-03d3079eed80,8a16bc5c-3f35-d0da-ca68-1bce2f99a0b2,ae4d4ac0-fadb-1aba-3c9a-463a39868672,b60b655a-727c-9f7b-bcd9-71e806c8f9d8,dc5a957e-061e-7568-7ecd-e47504383673,dcb1e696-bcb5-e8c8-e8f7-5aef0926c53f,dd4ac5a9-35ac-ce99-7f76-a8fc31a1ddf9,f14ce37e-9bf9-90cf-f409-0f983d047159,fa4a6530-ee07-4692-c257-7ed5c8714d2a":{"url":"//media.csimum.com/2_5D/Ft8Ed8BIGUQhXeJYKQglKtMAhfdj.jpg","scale":300,"scene":0,"name":"客厅"},"1dee0806-a83b-3e7b-f79b-4eb7c8f3a287,1ebaa06b-43ec-5c7b-3eb2-17159a99985f,450b30bf-f2ff-849d-4d09-a45f021d8fec,47f7fe8d-5a07-681b-d7b5-ae7ddd0324f1,a333fd12-5e72-1f9b-1ea8-919a6fddb5e9,f14ce37e-9bf9-90cf-f409-0f983d047159":{"url":"//media.csimum.com/2_5D/Fm5XMH7Y09CcKmMjdxv-npffcqu8.jpg","scale":300,"scene":7,"name":"儿童房"},"5e674c0d-172e-3a72-5b4c-7b397c471fff,64ecb0c4-4b58-a04f-a710-03d3079eed80,a333fd12-5e72-1f9b-1ea8-919a6fddb5e9,f14ce37e-9bf9-90cf-f409-0f983d047159":{"url":"//media.csimum.com/2_5D/Fjp00v5tGOvHlI6TtOLppYKKUYYW.jpg","scale":300,"scene":6,"name":"客卫"}}},"items":[]}'
  }
}
/* eslint */

let userAgent = navigator.userAgent.toLocaleLowerCase()

export default {
  name: 'Fhtvr',
  components: {
  },
  filters: {

  },
  data () {
    return {
      toolbarList: ['pano', 'model', 'floorplan'],
      isShow: false,
      isActive: 1
    }
  },
  created () {
    let url = location.search
    let theRequest = {}
    if (url.includes('?')) {
      let strs = url.substr(1).split('&')
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
      }
    }
    this.getSearchParams = theRequest
    this.initApp()
    // this.initPlayer()
    this.renderVrPlayer(testData.data)
  },
  mounted () {
    this.$nextTick(() => {
      getWxShareInfo(initPageInfoData.shareData)
    })
  },
  methods: {
    /**
     * 注册IOS/Andriod方法，获取页面信息
     */
    initApp () {
      if (userAgent.includes('fht-ios')) {
        Bridge.registerHandler('initPageInfo', (data, responseCallback) => {
          console.log('initPageInfo')
          responseCallback(initPageInfoData)
        })
      } else if (userAgent.includes('fht-android')) {
        // eslint-disable-next-line
        SetupJsCommunication.initPageInfo(
          JSON.stringify(initPageInfoData)
        )
      }
    },
    initPlayer () {
      if (!this.getSearchParams.houseType || this.getSearchParams.roomId) {
        this.$toast('fail', '参数配置无效')
        return false
      }
      playerVrApi.getVrData({
        roomId: this.getSearchParams.roomId,
        houseType: this.getSearchParams.houseType
      }).then((response) => {
        this.renderVrPlayer(response.data)
      }).catch(err => {
        console.log(err)
      })
    },
    renderVrPlayer (scenesData) {
      window.player.on('view_change', () => {
        this.isActive = window.player.view
        console.log(window.player.view)
      })
      let defaultOptions = {
        target: 'pano'
      }
      // 2D/25D/3D
      let mapList = scenesData.list ? defaultOptions.scenes = scenesData.list.map((item, index) => {
        return {
          name: '麦邻租房',
          preview: item.previewUrl,
          html5_path: item.vrUrl,
          thumb: item.thumbUrl
        }
      }) : []
      if (scenesData.model_type === 'pano') {
        defaultOptions.scenes = mapList
      } else if (scenesData.model_type === '25d' || scenesData.model_type === '25d+') {
        defaultOptions.scenes = mapList
        defaultOptions.model = scenesData['model_' + scenesData.model_type]
        this.isShow = true
      } else if (scenesData.model_type === '3d') {
        defaultOptions.cover = scenesData.cover
        defaultOptions.model_3d = scenesData.model_3d
        this.isShow = true
      } else {
        this.$toast('fail', 'Sorry: 无vr场景')
        return false
      }
      try {
        this.$nextTick(() => {
          window.player(defaultOptions)
        })
      } catch (error) {
        this.$toast('Sorry: vr展示错误')
        return false
      }
    },
    changeView (index) {
      console.log('changeview')
      this.$nextTick(() => {
        this.isActive = index
        window.player.view = index
        window.player.view = index
      })
    }
  }
}
</script>

<style lang="scss">
.root_wrap,
#pano {
  height: 100%;
  width: 100%;
}

.control-bar {
  position: absolute;
  right: 0.4rem;
  top: 8.986667rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 0.666667rem;
  z-index: 102;
}
.control-bar li {
  background-size: 1.066667rem 1.066667rem;
  background-position: center;
  background-repeat: no-repeat;
  width: 1.066667rem;
  height: 1.066667rem;
  margin: 0.266667rem 0;
}
.changeView {
  &.floorplan {
    background-image: url('../assets/floorplan.png');
    &.on {
      background-image: url('../assets/floorplan-on.png');
    }
  }
  &.pano {
    background-image: url('../assets/pano.png');
    &.on {
      background-image: url('../assets/pano-on.png');
    }
  }
  &.model {
    background-image: url('../assets/model.png');
    &.on {
      background-image: url('../assets/model-on.png');
    }
  }
}
.flex {
  display: flex;
  &.flex_column{
    flex-direction: column;
  }
  &.flex_center {
    justify-content: center;
  }
}

</style>
