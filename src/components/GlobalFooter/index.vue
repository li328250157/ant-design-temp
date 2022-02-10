<template>
	<global-footer class="footer custom-render">
		<template v-slot:links>
			<a>
				所属团队：互联网服务系统 > 互联网测试部 > 效能工程组
			</a>
			<a>
				联系我们：冯张弛（80227060）、林高翔(80264236)、李刚（80346677）
			</a>
		</template>
		<template v-slot:copyright>
			<a href='javascript:;'>©2021CoRT</a>
		</template>
	</global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
	name: 'ProGlobalFooter',
	components: {
		GlobalFooter
	}
}
</script>
