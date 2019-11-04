<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title></title>
		<link rel="icon" href="../img/logo.png">
		<script type="text/javascript" src="../js/import_common.js"></script>
		<link rel="stylesheet" type="text/css" href="../css/diagnosis.css"/>
	</head>
	<body>
		<div class="c_head">
			<div><img alt="" title="" src="../img/logo.png"/></div>
			<div></div>
			<div><img alt="" title="" src="../img/language.png"/></div>			
			<div><img alt="" title="" src="../img/exit.png"/></div>
			<hr />
		</div>
		
		<div class="c_body">
			<!-- Set the navigation -->
			<div class="c_body_left">
				<div class="c_body_left_item">
					<img src="../img/layout.png" />
				</div>
				<div class="c_body_left_item c_body_left_item_selected">
					<a href="diagnosis">
						<img src="../img/diagnosis.png" />
						<span></span>
					</a>
				</div>
				<div class="c_body_left_item">
					<a href="history" >
						<img src="../img/history.png" />
						<span></span>
					</a>
				</div>
				<div class="c_body_left_item">
					<a href="information" >
						<img src="../img/user.png" />
						<span></span>
					</a>
				</div>
				<div class="c_body_left_item">
					<a href="online" >
						<img src="../img/online.png" />
						<span></span>
					</a>
				</div>
			</div>
			
			<!-- Set the content -->
			<div class="c_body_right">
				<div class="search">
					<span></span><input type="date" value="2019-01-01" />
					<span></span><input type="text" value="" placeholder=""/>
					<img src="../img/search.png"/>
				</div>
				<table cellspacing="0">
					<thead><tr><th></th><th></th><th></th><th></th><th></th><th></th></tr></thead>
					<tbody></tbody>
				</table>
				<div class="page_num">
					<input type="button" id="prev" value="上一页"/>
						<button type="button" class="page_selected"></button>
						<button type="button"></button>
						<button type="button"></button>
						<button type="button"></button>
						<button type="button"></button>
						<button type="button"></button>
						<button type="button"></button>
						<button type="button"></button>
						<button type="button"></button>
						<button type="button"></button>
					<input type="button" id="next" value="下一页">
				</div>
			</div>
			
		</div>
		
		<div class="c_foot"></div>
		
		<!-- Import the javascript -->
		<script type="text/javascript" src="../js/common.js" ></script>
		<script type="text/javascript" src="../js/paging.js"></script>
		<script type="text/javascript" src="../js/doctor/diagnosis.js"></script>
		
	</body>
	
</html>
