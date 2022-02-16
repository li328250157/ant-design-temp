<template>
	<global-footer class="footer custom-render">
		<template v-slot:links>
			<a>
				所属团队：XXXXX
			</a>
			<a>
				联系我们：XXXXX
			</a>
		</template>
		<template v-slot:copyright>
			<a href='javascript:;'>©2022信息流后台管理系统</a>
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
