<template>
	<div class="score">
		<el-container>
			<el-main  class="chart0" style="width: 100%;height: 660px;">

				<div  id="tre" style="width: 100%;height: 600px;" >

				</div>
			</el-main>
			<el-main class="chart00" style="width: 100%;height: 660px;">

			<div  id="tre1" style="width: 100%;height: 600px;">

			</div>
			</el-main>
		</el-container>
	
	
		<el-container>
			<el-main  class="chart1" style="width: 100%;height: 660px;">

				<div  id="tren" style="width: 100%;height: 600px;" >

				</div>
			</el-main>
			<el-main class="chart2" style="width: 100%;height: 660px;">

			<div  id="trenn" style="width: 100%;height: 600px;">

			</div>
			</el-main>
		</el-container>
	
		


		<el-container>
			<el-main class="chart5" style="height: 80px;color: #000;font-weight: 800;">
				统计数据均排除空白数据和无效数据
			</el-main>
		</el-container>
	</div>
</template>


<script>
	import * as echarts from 'echarts';
	let defaultImg = require('../../assets/blank.png')
	import {
		Loading
	} from 'element-ui';
	export default {
		data() {
			return {
				msg:'机会1',
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
						value: '2017-2018',
						label: '2017-2018'
					},
					{
						value: '2018-2019',
						label: '2018-2019'
					}
				],
				value: '2018-2019',
				tableData: [{
					key: '学号',
					value: '暂无数据'
				}, {
					key: '姓名',
					value: '暂无数据'
				}, {
					key: '性别',
					value: '暂无数据'
				}, {
					key: '年级',
					value: '暂无数据'
				}, {
					key: '专业',
					value: '暂无数据'
				}, {
					key: '班级',
					value: '暂无数据'
				}, {
					key: '民族',
					value: '暂无数据'
				}, {
					key: '政治面貌',
					value: '暂无数据'
				}, {
					key: '家庭住址',
					value: '暂无数据'
				}, {
					key: '出生日期',
					value: '暂无数据',
				}, {
					key: '寝室',
					value: '暂无数据'
				}, {
					key: '学生类型',
					value: '暂无数据'
				}]

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
								text: '学生综合评价',
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
										name: '德育',
										max: 1
									},
									{
										name: '智育',
										max: 1
									},
									{
										name: '体育',
										max: 1
									}
								]
							},
							series: [{
								name: '三育',
								type: 'radar',
								areaStyle: {
									normal: {}
								},
								data: [{
									value: this.mks,
									name: '三育'
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
						text: '学生综合评价',
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
								name: '德育',
								max: 1
							},
							{
								name: '智育',
								max: 1
							},
							{
								name: '体育',
								max: 1
							}
						]
					},
					series: [{
						name: '三育',
						type: 'radar',
						areaStyle: {
							normal: {}
						},
						data: [{
							value: this.mks,
							name: '三育'
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

			draw0(){
				let myChart = this.$echarts.init(document.getElementById('main'));
			let option = {
				title: {
				text: 'Funnel'
				},
				tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c}%'
				},
				toolbox: {
				feature: {
					dataView: { readOnly: false },
					restore: {},
					saveAsImage: {}
				}
				},
				legend: {
				data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
				},
				series: [
				{
					name: 'Funnel',
					type: 'funnel',
					left: '10%',
					top: 60,
					bottom: 60,
					width: '80%',
					min: 0,
					max: 100,
					minSize: '0%',
					maxSize: '100%',
					sort: 'ascending',
					gap: 2,
					label: {
					show: true,
					position: 'inside'
					},
					labelLine: {
					length: 10,
					lineStyle: {
						width: 1,
						type: 'solid'
					}
					},
					itemStyle: {
					borderColor: '#fff',
					borderWidth: 1
					},
					emphasis: {
					label: {
						fontSize: 20
					}
					},
					data: [
					{ value: 60, name: 'Visit' },
					{ value: 40, name: 'Inquiry' },
					{ value: 20, name: 'Order' },
					{ value: 80, name: 'Click' },
					{ value: 100, name: 'Show' }
					]
				}
				]
			};
      		 myChart.setOption(option);
				
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
						data: ['2019-2020', '2020-2021', '2021-2022']
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
			
			var chartDom = document.getElementById('tre');
			var myChart = echarts.init(chartDom);
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

			var chartDom = document.getElementById('tre1');
			var myChart = echarts.init(chartDom);
			var option;

			option = {
			xAxis: {
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
				data: [820, 932, 901, 934, 1290, 1330, 1320],
				type: 'line',
				smooth: true
				},
				{
				data: [820, 932, 901, 94, 129, 1330, 1320],
				type: 'line',
				smooth: true
				},
				{
				data: [820, 94, 129, 1330, 1320, 932, 901],
				type: 'line',
				smooth: true
				},
				{
				data: [820, 932, 132, 901, 94, 129, 1330],
				type: 'line',
				smooth: true
				}
			]
			};
			option && myChart.setOption(option);



			var myChart = echarts.init(document.getElementById('tren'));
			var option = {
				title: {
				text: 'Funnel'
				},
				tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c}%'
				},
				toolbox: {
				feature: {
					dataView: { readOnly: false },
					restore: {},
					saveAsImage: {}
				}
				},
				legend: {
				data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
				},
				series: [
				{
					name: 'Funnel',
					type: 'funnel',
					left: '10%',
					top: 60,
					bottom: 60,
					width: '80%',
					min: 0,
					max: 100,
					minSize: '0%',
					maxSize: '100%',
					sort: 'ascending',
					gap: 2,
					label: {
					show: true,
					position: 'inside'
					},
					labelLine: {
					length: 10,
					lineStyle: {
						width: 1,
						type: 'solid'
					}
					},
					itemStyle: {
					borderColor: '#fff',
					borderWidth: 1
					},
					emphasis: {
					label: {
						fontSize: 20
					}
					},
					data: [
					{ value: 60, name: 'Visit' },
					{ value: 40, name: 'Inquiry' },
					{ value: 20, name: 'Order' },
					{ value: 80, name: 'Click' },
					{ value: 100, name: 'Show' }
					]
				}
				]
			};
      		option && myChart.setOption(option);

			var chartDom = document.getElementById('trenn');
			var myChart = echarts.init(chartDom);
			var option;
			setTimeout(function () {
			option = {
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
			myChart.setOption(option);
			});
			option && myChart.setOption(option);

			this.drawBlankRadar();
			this.autocheck();
			this.draw0();
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

	
	
</style>
