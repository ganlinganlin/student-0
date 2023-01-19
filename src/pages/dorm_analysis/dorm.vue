<template>
	<div>
		
		<el-container>
			<el-main style="height: auto;">
				<!-- <el-tag type="info" effect="dark">学生行为</el-tag> -->
				<el-tabs v-model="activeName" @tab-click="stubehavior">
					<el-tab-pane label="图书馆数据" name="stuscore">
						<el-container id="stuscoretab">
							<el-header>
								<el-select v-model="value" size="mini" value="2018-2019" @change="changeTyChart" style="float: left;">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-header>
							<el-container>
								<el-aside style="height: 100%;">
									<div id="mksradar" style="width: 290px;height: 290px;">1</div>
								</el-aside>

								<el-main style="height: 100%;">
									<el-carousel indicator-position="outside" height="350px" :autoplay="false">
										<el-carousel-item>
											<el-row :gutter="5">
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>在馆总时长</span>
														</div>
														300<span style="font-size: 10px">小时</span>
													</el-card>
												</el-col>
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>平均每周入馆天数</span>
														</div>
														4<span style="font-size: 10px">天</span>
													</el-card>
												</el-col>
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>平均每天在馆时长</span>
														</div>
														<!-- {{studentscore.avgcreditjd}} -->
														8<span style="font-size: 10px">小时</span>

													</el-card>
												</el-col>
											</el-row>
											<br>
											<el-row :gutter="5">
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>借阅书籍总数</span>
														</div>
														<!-- {{studentscore.knowledge}} -->
														10<span style="font-size: 10px">本</span>
													</el-card>
												</el-col>
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>入馆时间偏好</span>
														</div>
														<!-- {{studentscore.moral}} -->
														08:20<span style="font-size: 10px"></span>
													</el-card>
												</el-col>
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>出馆时间偏好</span>
														</div>
														<!-- {{studentscore.sports}} -->
														21:30<span style="font-size: 10px"></span>
													</el-card>
												</el-col>
											</el-row>
										</el-carousel-item>
										<el-carousel-item>
											<el-row :gutter="5">
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>成绩Top1:{{studentscore.top1.name}}</span>
														</div>
														{{studentscore.top1.score}}<span style="font-size: 10px">分</span>
													</el-card>
												</el-col>
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>成绩Top2:{{studentscore.top2.name}}</span>
														</div>
														{{studentscore.top2.score}}<span style="font-size: 10px">分</span>
													</el-card>
												</el-col>
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>成绩Top3:{{studentscore.top3.name}}</span>
														</div>
														{{studentscore.top3.score}}<span style="font-size: 10px">分</span>
													</el-card>
												</el-col>
											</el-row>
											<br>
											<el-row :gutter="5">
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>最高分</span>
														</div>
														{{studentscore.topscore}}<span style="font-size: 10px">分</span>
													</el-card>
												</el-col>
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>专业排名</span>
														</div>
														{{studentscore.sorted}}
													</el-card>
												</el-col>
												<el-col :span="8">
													<el-card shadow="hover">
														<div slot="header" class="clearfix">
															<span>挂科率</span>
														</div>
														{{studentscore.fails}}<span style="font-size: 10px">%</span>
													</el-card>
												</el-col>
											</el-row>
										</el-carousel-item>
									</el-carousel>

								</el-main>
							</el-container>
						</el-container>
					</el-tab-pane>
					
					
					
						
					
				</el-tabs>
			</el-main>
		</el-container>

		<el-container>
			<el-main  class="chart0" style="width: 100%;height: 660px;">

				<div  id="tre" style="width: 100%;height: 600px;" >

				</div>
			</el-main>
			<el-main  style="width: 100%;height: 660px;">

			<div  id="trenn" style="width: 100%;height: 600px;">

			</div>
			</el-main>
		</el-container>


	</div>
</template>

<script>
	import wordcloudindex from './wordcloud1.js';
	import * as echarts from 'echarts';

	let defaultImg = require('../../assets/blank.png')
	import {
		Loading
	} from 'element-ui';
	export default {

		data() {
			return {
				stuForm: {
					stuid: ''
				},
				calendarData: [{
						months: ['09', '11'],
						days: ['15'],
						year: ['2019'],
						things: '迟到'
					},
					{
						months: ['11'],
						days: ['20'],
						things: '缺勤'
					}
				],
				datevalue: new Date(),
				activities: [{
					content: '活动按期开始',
					timestamp: '2018-04-15'
				}, {
					content: '通过审核',
					timestamp: '2018-04-13'
				}, {
					content: '创建成功',
					timestamp: '2018-04-11'
				}],
				labelPosition: 'top',
				wordcloud: {
					stopwd: '',
					userdict: ''
				},
				flag: 3,
				studentscore: {
					avg: '无',
					credit: '无',
					avgcreditjd: '无',
					moral: '无',
					knowledge: '无',
					sports: '无',
					top1: {
						name: '无',
						score: '无'
					},
					top2: {
						name: '无',
						score: '无'
					},
					top3: {
						name: '无',
						score: '无'
					},
					topscore: '无',
					sorted: '无',
					fails: '无'

				},
				mks: [],
				savemsg: '保存',
				imagePathPrefix: '',
				imagePath: defaultImg,
				searchinput: '',
				stuadvices: [], //搜索建议列表
				state: '', //搜索框值
				timeout: null,
				drawer: false,
				direction: 'ltr',
				activeName: 'stuscore',
				options: [{
						value: '0',
						label: '请选择学期'
					}, {
						value: '2020-2021',
						label: '2020-2021'
					},
					{
						value: '2021-2022',
						label: '2021-2022'
					}
				],
				value: '2021-2022',
				tableData: [{
					key: '学号',
					value: '202232803056'
				}, {
					key: '姓名',
					value: '杨树帆'
				}, {
					key: '性别',
					value: '男'
				}, {
					key: '年级',
					value: '2022级'
				}, {
					key: '专业',
					value: '计算机技术'
				}, {
					key: '班级',
					value: 'S22Z2857'
				}, {
					key: '民族',
					value: '汉族'
				}
				// , {
				// 	key: '政治面貌',
				// 	value: '暂无数据'
				// }, {
				// 	key: '家庭住址',
				// 	value: '暂无数据'
				// }, {
				// 	key: '出生日期',
				// 	value: '暂无数据',
				// }, {
				// 	key: '寝室',
				// 	value: '暂无数据'
				// }, {
				// 	key: '学生类型',
				// 	value: '暂无数据'
				// }
			  ],tea_activename: 'tea_grade_conunt',
				
 
				gradeStuSeries: []

			}
		},
		methods: {
			onSubmitPerson() {
				let sno = this.state;
				let flag = true;
				if (sno.match(/^[0-9]*$/)) {
					let loadingInstance = Loading.service({
						fullscreen: true
					});
					this.$http.get("stuAnalysis/searchstu/" + sno)
						.then(({
							data
						}) => {
							this.tableData = [{
								key: '学号',
								value: data.studentno
							}, {
								key: '姓名',
								value: data.studentname
							}, {
								key: '性别',
								value: data.sex
							}, {
								key: '年级',
								value: data.termyear
							}, {
								key: '专业',
								value: data.major
							}, {
								key: '班级',
								value: data.class
							}, {
								key: '民族',
								value: data.mz
							}, {
								key: '政治面貌',
								value: data.zzmm
							}, {
								key: '家庭住址',
								value: data.address
							}, {
								key: '出生日期',
								value: data.birthday,
							}, {
								key: '寝室',
								value: data.buildingname + data.roomnum
							}, {
								key: '学生类型',
								value: data.stutype
							}]

							this.drawMksRadar(this.tableData[0]["value"], this.value);
							flag = true;
						})
						.catch(err => {
							alert(this.$errmsg(err));
							loadingInstance.close();
							this.tableData = [];
							flag = true;
						});
					this.$http.get("stuAnalysis/stuwordcloud/" + sno)
						.then(({
							data
						}) => {
							this.imagePath = data;
							loadingInstance.close();
						})
						.catch(err => {
							// alert(this.$errmsg(err));
							this.imagePathPrefix = '';
							this.imagePath = defaultImg;
						});
					this.getStudentScore(sno, '2018-2019');


				} else {
					alert("请输入学号进行查询");
					loadingInstance.close();
					this.tableData = [];
				}



			},
			drawAttendChart(){
				//TODO
				let myChart = this.$echarts.init(document.getElementById("attendence"));
				let option = {
				     title: {
				            text: '近7天学院到勤率(演示数据)',
				            subtext: '(单位：%)',
				            left: 'center'
				        },
				    xAxis: {
				        type: 'category',
				        data: ['2019-12-01', '2019-12-02', '2019-12-03', '2019-12-04', '2019-12-05', '2019-12-06', '2019-12-07']
				    },
				    yAxis: {
				        type: 'value',
				        min:80,
				        max:100
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    series: [{
				        data: [98, 85, 96,90, 92, 92, 86],
				        type: 'line',
				        smooth: true
				    }]
				};
				
				myChart.setOption(option);
			},
			stubehavior(tab, event) {
				console.log(tab.name);
				switch (tab.name) {
					case "stuscore":
						break;
					case "trend":
						this.drawSorcetrend();
						break;
					case "reward":

						break;
					case "punish":

						break;
					case "kq":

						break;
				}
			},
			changeTyChart() {

			},
			querySearch(queryString, cb) {
				var stuadvices = this.stuadvices;
				var results = queryString ? stuadvices.filter(this.createFilter(queryString)) : stuadvices;
				// 调用 callback 返回建议列表的数据
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					cb(results);
				}, 2000 * Math.random());
			},
			createFilter(queryString) {
				return (state) => {
					return (state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			handleSelect(item) {
				console.log(item);
			},
			drawerhandleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						this.wordcloud.stopwd = '';
						this.wordcloud.userdict = '';
						done();
					})
					.catch(_ => {});

			},
			saveWordCloudSettings() {
				this.flag = 1;
				this.savemsg = '保存中';
				let stopwd = this.wordcloud.stopwd;
				let userdict = this.wordcloud.userdict;
				let stoplist = stopwd.split(" ");
				let userdictlist = userdict.split(" ");
				if (stoplist.length == 1 && stoplist[0].length == 0) {
					this.flag += 1;
				} else {
					this.$http.put("admin/addstopwords", this.$qs.stringify({
							"stopwd": stoplist
						}, {
							indices: false
						}))
						.then(({
							data
						}) => {
							this.addswdmsg = data;
							this.flag += 1;
						})
						.catch(err => {
							alert(this.$errmsg(err));
							this.flag += 1;
						});
				}
				if (userdictlist.length == 1 && userdictlist[0].length == 0) {
					this.flag += 1;
				} else {
					this.$http.put("admin/adduserdict", this.$qs.stringify({
							"userdict": userdictlist
						}, {
							indices: false
						}))
						.then(({
							data
						}) => {
							this.addudtmsg = data;
							this.flag += 1;
						})
						.catch(err => {
							alert(this.$errmsg(err));
							this.flag += 1;
						});
				}

			},

			/**
			 * @param {String} sno 学号
			 * @param {String} xuenian 学年
			 * 三育雷达图
			 */
			drawMksRadar(sno, xuenian) {

				let myChart = this.$echarts.init(document.getElementById("mksradar"));
				myChart.showLoading();
				this.$http.post("stuAnalysis/mks/" + xuenian + "/" + sno)
					.then(({
						data
					}) => {
						this.mks = [];
						this.mks.push(data["m"]);
						this.mks.push(data["k"]);
						this.mks.push(data["s"]);
						this.studentscore.moral = (data['m'] * 25).toFixed(2);
						this.studentscore.knowledge = (data['k'] * 70).toFixed(2);
						this.studentscore.sports = (data['s'] * 5).toFixed(2);
						let option = {
							title: {
								text: '图书馆综合分析',
								textStyle: {
									fontSize: 12
								}
							},
							tooltip: {},

							radar: {
								// shape: 'circle',
								name: {
									textStyle: {
										color: '#fff',
										backgroundColor: '#999',
										borderRadius: 3,
										padding: [3, 5]
									}
								},
								indicator: [{
										name: '时间',
										max: 1
									},
									{
										name: '频率',
										max: 1
									},
									{
										name: '体育',
										max: 1
									}
								]
							},
							series: [{
								name: '图书馆',
								type: 'radar',
								areaStyle: {
									normal: {}
								},
								data: [{
									value: this.mks,
									name: '图书馆'
								}]
							}]
						};
						myChart.hideLoading();
						myChart.setOption(option);
					})
					.catch(err => {
						myChart.hideLoading();

					})
			},
			drawBlankRadar() {
				let myChart = this.$echarts.init(document.getElementById("mksradar"));
				let option = {
					title: {
						text: '图书馆综合分析',
						textStyle: {
							fontSize: 12
						}
					},
					tooltip: {},

					radar: {
						// shape: 'circle',
						name: {
							textStyle: {
								color: '#fff',
								backgroundColor: '#999',
								borderRadius: 3,
								padding: [3, 5]
							}
						},
						indicator: [{
								name: '时间',
								max: 1
							},
							{
								name: '频率',
								max: 1
							},
							{
								name: '借阅',
								max: 1
							}
						]
					},
					series: [{
						name: '图书馆',
						type: 'radar',
						areaStyle: {
							normal: {}
						},
						data: [{
							value: this.mks,
							name: '图书馆'
						}]
					}]
				};
				myChart.setOption(option);
			},

			/**
			 * 获取学生成绩面板数据
			 */
			getStudentScore(sno, xuenian) {
				this.$http.post("stuAnalysis/courses/" + xuenian + "/" + sno + "/3")
					.then(({
						data
					}) => {
						this.studentscore.top1.name = data[0]['cname'];
						this.studentscore.top2.name = data[1]['cname'];
						this.studentscore.top3.name = data[2]['cname'];
						this.studentscore.top1.score = data[0]['score'];
						this.studentscore.top2.score = data[1]['score'];
						this.studentscore.top3.score = data[2]['score'];
						this.studentscore.topscore = data[0]['score'];
					})
					.catch(err => {

					});

				this.$http.post("stuAnalysis/courses/" + xuenian + "/" + sno + "/50")
					.then(({
						data
					}) => {
						let sum = 0;
						let credit = 0;
						let creditjd = 0;
						data.map(d => {
							sum += d['score'];
							if (d['score'] >= 60) {
								credit += d['credit'];
								creditjd += d['credit'] * d['jd'];
							}
						});
						this.studentscore.avg = (sum / data.length).toFixed(2);
						this.studentscore.credit = credit.toFixed(2);
						this.studentscore.avgcreditjd = (creditjd / credit).toFixed(2);

					})
					.catch(err => {
						alert(this.$errmsg(err));
					});
				this.$http.get("stuAnalysis/rank/" + xuenian + "/" + sno)
					.then(({
						data
					}) => {
						this.studentscore.sorted = data;
					});
				this.$http.post("stuAnalysis/searchfailsRate/" + xuenian + "/" + sno)
					.then(({
						data
					}) => this.studentscore.fails = data * 100);
			},


			/**
			 * 成绩趋势
			 *
			 */
			drawSorcetrend() {
				//TODO
				let myChart = this.$echarts.init(document.getElementById("trendchart"));
				let colors = ['#5793f3', '#d14a61', '#675bba'];
				let option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						}
					},
					legend: {
						data: ['德育分', '智育分', '体育分']
					},
					xAxis: [{
						type: 'category',
						axisTick: {
							alignWithLabel: true
						},
						data: ['2017-2018', '2018-2019', '2019-2020']
					}],
					yAxis: [{
							type: 'value',
							name: '德育分',
							min: 15,
							max: 25,
							interval: 1,
							position: 'right',
							axisLine: {
								lineStyle: {
									color: colors[0]
								}
							},
							axisLabel: {
								formatter: '{value} '
							}
						},
						{
							type: 'value',
							name: '智育分',
							min: 60,
							max: 70,
							interval: 2,
							position: 'right',
							offset: 80,
							axisLine: {
								lineStyle: {
									color: colors[1]
								}
							},
							axisLabel: {
								formatter: '{value} '
							}
						},
						{
							type: 'value',
							name: '体育分',
							min: 0,
							max: 5,
							position: 'left',
							axisLine: {
								lineStyle: {
									color: colors[2]
								}
							},
							axisLabel: {
								formatter: '{value}'
							},
							interval: 1
						}
					],
					series: [{
							name: '德育分',
							type: 'line',
							data: [20, 21.5, 22]
						},
						{
							name: '智育分',
							type: 'line',
							yAxisIndex: 1,
							data: [62, 61.5, 62.5]
						},
						{
							name: '体育分',
							type: 'line',
							yAxisIndex: 2,
							data: [4.5, 4, 3.8]
						}
					]
				};

				myChart.setOption(option);
			},
			
			autocheck(){
				let sno = this.$param("sno");
				if (sno != "" && sno.match(/^[0-9]*$/)){
					this.state = this.$param("sno");
					this.onSubmitPerson();
				}
			}
			

		},
		components: {

		},

		mounted() {
			
			// var chartDom = document.getElementById('tre');
			var myChart = echarts.init(document.getElementById('tre'));
			var option;
			// Schema:
			// date,AQIindex,PM2.5,PM10,CO,NO2,SO2
			const dataBJ = [[55, 189, 56, 0.46, 18, 69, 100]];
			const dataGZ = [[118, 50, 60, 1.383, 76, 11, 31]];
			const dataSH = [[187, 143, 201, 1.39, 89, 53, 31]];
			const lineStyle = {
			width: 1,
			opacity: 0.5
			};
			option = {
			backgroundColor: '#161627',
			title: {
				text: 'AQI - Radar',
				left: 'center',
				textStyle: {
				color: '#eee'
				}
			},
			legend: {
				bottom: 5,
				data: ['Beijing', 'Shanghai', 'Guangzhou'],
				itemGap: 20,
				textStyle: {
				color: '#fff',
				fontSize: 14
				},
				selectedMode: 'single'
			},
			radar: {
				indicator: [
				{ name: 'AQI', max: 300 },
				{ name: 'PM2.5', max: 250 },
				{ name: 'PM10', max: 300 },
				{ name: 'CO', max: 5 },
				{ name: 'NO2', max: 200 },
				{ name: 'SO2', max: 100 }
				],
				shape: 'circle',
				splitNumber: 5,
				axisName: {
				color: 'rgb(238, 197, 102)'
				},
				splitLine: {
				lineStyle: {
					color: [
					'rgba(238, 197, 102, 0.1)',
					'rgba(238, 197, 102, 0.2)',
					'rgba(238, 197, 102, 0.4)',
					'rgba(238, 197, 102, 0.6)',
					'rgba(238, 197, 102, 0.8)',
					'rgba(238, 197, 102, 1)'
					].reverse()
				}
				},
				splitArea: {
				show: false
				},
				axisLine: {
				lineStyle: {
					color: 'rgba(238, 197, 102, 0.5)'
				}
				}
			},
			series: [
				{
				name: 'Beijing',
				type: 'radar',
				lineStyle: lineStyle,
				data: dataBJ,
				symbol: 'none',
				itemStyle: {
					color: '#F9713C'
				},
				areaStyle: {
					opacity: 0.1
				}
				},
				{
				name: 'Shanghai',
				type: 'radar',
				lineStyle: lineStyle,
				data: dataSH,
				symbol: 'none',
				itemStyle: {
					color: '#B3E4A1'
				},
				areaStyle: {
					opacity: 0.05
				}
				},
				{
				name: 'Guangzhou',
				type: 'radar',
				lineStyle: lineStyle,
				data: dataGZ,
				symbol: 'none',
				itemStyle: {
					color: 'rgb(238, 197, 102)'
				},
				areaStyle: {
					opacity: 0.05
				}
				}
			]
			};
			option && myChart.setOption(option);


			// var chartDom = document.getElementById('trenn');
			var myChart = echarts.init(document.getElementById('trenn'));
			var option1;
			setTimeout(function () {
			option1 = {
				legend: {},
				tooltip: {
				trigger: 'axis',
				showContent: false
				},
				dataset: {
				source: [
					['product', '2012', '2013', '2014', '2015', '2016', '2017'],
					['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
					['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
					['Cheese Cocoa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
					['Walnut Brownie', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
				]
				},
				xAxis: { type: 'category' },
				yAxis: { gridIndex: 0 },
				grid: { top: '55%' },
				series: [
				{
					type: 'line',
					smooth: true,
					seriesLayoutBy: 'row',
					emphasis: { focus: 'series' }
				},
				{
					type: 'line',
					smooth: true,
					seriesLayoutBy: 'row',
					emphasis: { focus: 'series' }
				},
				{
					type: 'line',
					smooth: true,
					seriesLayoutBy: 'row',
					emphasis: { focus: 'series' }
				},
				{
					type: 'line',
					smooth: true,
					seriesLayoutBy: 'row',
					emphasis: { focus: 'series' }
				},
				{
					type: 'pie',
					id: 'pie',
					radius: '30%',
					center: ['50%', '25%'],
					emphasis: {
					focus: 'self'
					},
					label: {
					formatter: '{b}: {@2012} ({d}%)'
					},
					encode: {
					itemName: 'product',
					value: '2012',
					tooltip: '2012'
					}
				}
				]
			};
			myChart.on('updateAxisPointer', function (event) {
				const xAxisInfo = event.axesInfo[0];
				if (xAxisInfo) {
				const dimension = xAxisInfo.value + 1;
				myChart.setOption({
					series: {
					id: 'pie',
					label: {
						formatter: '{b}: {@[' + dimension + ']} ({d}%)'
					},
					encode: {
						value: dimension,
						tooltip: dimension
					}
					}
				});
				}
			});
			myChart.setOption(option1);
			});
			option1 && myChart.setOption(option1);

			
			this.drawBlankRadar();
			//this.autocheck();
			//教师分布图
			//this.drawTeacherGradeChart();
			//this.drawAttendChart();
			
			
		},
		beforeMount(){
			console.log("bef",this.$param("sno"));
		},
		watch: {
			state(newv, oldv) {
				if (newv.match(/^[\u4e00-\u9fa5]+$/)) {
					if (newv.length > 10) {
						return;
					}
					let data = {
						"sname": newv
					}
					this.$http.post("stuAnalysis/searchadv", this.$qs.stringify(data))
						.then(({
							data
						}) => {
							this.stuadvices = data;
						})
						.catch(err => {
							if (err.response.status != 404) {
								alert(this.$errmsg(err));
							}

						})

				}
			},
			flag(n) {
				if (n == 3) {
					this.$message({
						message: '保存成功！',
						type: 'success'
					});
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.el-main,
	.el-aside {
		margin: 10px;
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		height: 500px;

	}

	.search {
		height: 100px;
	}

	.el-form-item {
		margin: 10px;
	}

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		height: 99.5%;
		overflow-y: scroll;
	}



	.my-autocomplete li {
		line-height: normal;
		padding: 7px;
	}

	.name {
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.addr {
		font-size: 8px;
		color: #b4b4b4;
	}

	.highlighted .addr {
		color: #ddd;
	}

	.clearfix {
		font-size: 14px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.el-card {
		font-size: 50px;
	}

	.rewardRecords .el-card {
		font-size: 14px;
	}

	.is-selected {
		color: red;
		line-height: 20px;
		font-size: 16px;
		margin-top: 5px;
		background-color: yellow;
	}


</style>
