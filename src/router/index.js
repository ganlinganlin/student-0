import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

function route (path, file, name, children) {
  return {
    exact: true,
    path,
    name,
    children,
    component: () => import('../pages' + file)
  }
}

export default new Router({
  routes: [
    route("/index",'/layout',"vlayout"),// /login路径，	
    {
      path:"/", // 根路径，路由到 Layout组件
      component: () => import('../pages/layout'),
      redirect:"/index/dashboard",
      children:[ // 其它所有组件都是 Layout的子组件
		    route("/index/dashboard",'/Dashboard',"Dashboard"), //主页
        route("/analysis/personal",'/person_analysis/personal',"personal"), //基本信息
        route("/analysis/teacher",'/teacher_analysis/teacher',"teacher"), //成绩

        route("/analysis/network",'/network_analysis/network',"network"), //校园网
        route("/analysis/consume",'/consume_analysis/consume',"consume"), //消费
        route("/analysis/thesis",'/thesis_analysis/thesis',"thesis"), //毕业论文

        route("/analysis/keyan",'/keyan_analysis/keyan',"keyan"), //科研
        route("/analysis/contact",'/contact_analysis/contact',"contact"), //社交
        route("/analysis/library",'/library_analysis/library',"library"), //图书馆
		    route("/analysis/dorm","/dorm_analysis/leftlayout","dorm"),  //宿舍
        route("/index/dashboard1",'/Dashboard1',"Dashboard1") //主页

      ]
    }

  ]
})
