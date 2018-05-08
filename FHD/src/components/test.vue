<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <group class="group_cells group_no-tittle">
      <cell class="group_cells-item" title="账单名称" value="第二期房租"></cell>
			<cell class="group_cells-item" title="费用类型" value="期租金"></cell>
			<cell class="group_cells-item" title="账单状态" value="待付款"></cell>
    </group>
		<group class="group_cells" title="费用信息">
      <cell class="group_cells-item" title="房租" value="¥ 2600"></cell>
			<cell class="group_cells-item" title="服务费" value="¥ 200"></cell>
			<cell class="group_cells-item" title="优惠金额" value="¥ 100"></cell>
    </group>
		<group class="group_cells" title="备注信息">
      <cell class="group_cells-item" title="备注" value="无"></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell
  },
  data() {
    return {
      msg: 'Hello World!'
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px;
}
.group_cells .group_cells-item {
	height: 88px;
	padding: 0 30px;
}
</style>
