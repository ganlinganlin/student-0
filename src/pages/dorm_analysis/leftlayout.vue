<template>

	<div>
		<el-row :gutter="10">
		
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
      ><div class="grid-content ep-bg-purple-light"
    /></el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
      ><div class="grid-content ep-bg-purple"
    /></el-col>
   
  </el-row>
</div>
  </template>
  
  <style>
  .el-row {
	margin-bottom: 10px;
  }
  .el-row:last-child {
	margin-bottom: 0;
  }
  .el-col {
	border-radius: 5px;
  }
  
  .grid-content {
	border-radius: 5px;
	min-height: 400px;
	background-color: rgb(101, 32, 7);

  }
  .grid-content2 {
	border-radius: 5px;
	min-height: 400px;
	background-color: rgba(247, 253, 253, 0.79);

  }

  </style>
  