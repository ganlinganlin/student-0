<template>
	<div>

		<el-container>
			
		</el-container>
		<el-container>
			<el-main class="chart1">
				<el-tag type="info" effect="dark">成绩标签</el-tag>
				<el-tabs v-model="tea_activename">
					<el-tab-pane label="标签" name="tea_grade_conunt">
						<div id="tea_grade_chart" style="width: 100%;height: 350px;">

						</div>
					</el-tab-pane>
					
					

				</el-tabs>
			</el-main>
			<el-main class="chart2">
				<el-tag type="info" effect="dark">成绩展示</el-tag>
				<el-tabs v-model="tea_activename">
					<el-tab-pane label="最高分" name="tea_grade_conunt">
						<div id="tea_grade_chart" style="width: 100%;height: 350px;">

						</div>
					</el-tab-pane>
					
					<el-tab-pane label="最低分" name="tea_grade_conunt0">
						<div id="tea_grade_chart1" style="width: 100%;height: 350px;">
						<el-container>
								<el-main>
							      <el-table :data="stuList" style="width: 100%;height: 350px;"> 
								
								  
							       </el-table>
							   </el-main>
							
							</el-container>
						</div>
							
					</el-tab-pane>

				</el-tabs>
			</el-main>
			
		</el-container>
		
		<el-container>
			<el-main class="chart3">
				<el-tag type="info" effect="dark">成绩分析</el-tag>
				<el-tabs v-model="tea_activename" @tab-click="stubehavior">
					<el-tab-pane label="成绩走势" name="trend">
	
						<div id="trendchart" style="width: 1000px;height: 350px;">


						</div>
					</el-tab-pane>
				</el-tabs>
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
	import wordcloudindex from './wordcloud1.js'
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
			this.drawBlankRadar();
			this.autocheck();
			
			
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
