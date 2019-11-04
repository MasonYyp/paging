var diagnosis = new Diagnosis();
diagnosis.init_diagnosis();

function Diagnosis(){
	// Init the language
	var _i18n = new ConfigureI18n();
	
	
	// Initial the page
	var _data = new Array();
	var _total_data_num = 0;
	var _page_data_num = 10;
	var _index = 0;
	var _paging = null;
	
	
	this.init_diagnosis = function(){
		// Initial the common
		_init_common();
		
		// Initial the messages
		_i18n.init_messages(_init_diagnosis_messages);
		
		// Get the data
		_init_data();
	}
	
	
	// Initial the common
	function _init_common(){
		var common = new Common();
		common.init_common();
		
		// Change the language
		common.$language.click(function(){
			if(common.get_locale() == 'zh'){
				common.update_commmon_messages('en');
				_i18n.update_messages('en', function(){
					_init_diagnosis_messages();
				});
			}else{
				common.update_commmon_messages('zh');
				_i18n.update_messages('zh', function(){
					_init_diagnosis_messages();
				});
			}
		})
		
		common.$exit.click(function(){
			alert("推出")
		})
	}
	
	/**
	 * Initial the messages
	 */
	function _init_diagnosis_messages(){
		var $span = $(".search>span");
		$span.eq(0).text($.t("diagnosis.d_u_application_date"));
		$span.eq(1).text($.t("diagnosis.d_u_name"));
		
		var $t_head_th = $(".c_body_right>table>thead>tr>th");
		$t_head_th.eq(0).text($.t("diagnosis.d_u_name"));
		$t_head_th.eq(1).text($.t("diagnosis.d_u_age"));
		$t_head_th.eq(2).text($.t("diagnosis.d_u_gender"));
		$t_head_th.eq(3).text($.t("diagnosis.d_u_tel"));
		$t_head_th.eq(4).text($.t("diagnosis.d_u_application_date"));
		$t_head_th.eq(5).text($.t("diagnosis.d_u_diagnosis"));
	}
	
	// Initial the net data
	function _init_data(){
		$.post("./userData",{
			index: _index
		},function(data, textStatus){
			
			if(data.length == 0){
				_paging.request_state = false;
				return;
			}
			
			_total_data_num = _data.length + data.length;
			_index = _index + data.length ;			
			_data = _data.concat(data);
			
			// Initial the page
			_init_page(0);
			_paging = new Paging(_total_data_num, _page_data_num, _update_data, _init_page);
			// Initial page
			_paging.init_page();
		});
	}
	
	
	// Update the net data
	function _update_data(){
		if(_paging.request_state){
			$.post("./userData",{
				index: _index
			},function(data, textStatus){
				if(data.length==0){
					_paging.request_state = false;
					return;
				}
					
				_total_data_num = _data.length + data.length;
				_index = _index + data.length ;
				_data = _data.concat(data);
				
				// Update the total data 
				_paging.update_total_data_num(_total_data_num);
			});
		}		
	}
	
	
	/**
	 * Initial the page
	 */ 
	function _init_page(data_index_start){
		
		var $t_body = $(".c_body_right>table>tbody");
		// Clear the data
		$t_body.html("");
		
		// Init the data
		var tr = null;
		var data_index_end = data_index_start+_page_data_num;
		
		if(data_index_end>_total_data_num){
			data_index_end = _total_data_num;
		}
		
		var gender = null;
		for(var i=data_index_start; i<data_index_end; i++){
			if(_data[i].daSex == "1"){
				gender = $.t("diagnosis.d_u_man");
			}else{
				gender = $.t("diagnosis.d_u_woman");
			}
			
			tr = "<tr>\
			<td style='display:none'>"+ _data[i].daPkId +"</td>\
			<td style='display:none'>"+ _data[i].daPath +"</td>\
			<td>"+ _data[i].daName +"</td>\
			<td>"+ _data[i].daAge +"</td>\
			<td>"+ gender +"</td>\
			<td>"+ _data[i].daTel +"</td>\
			<td>"+ _data[i].daTime +"</td>\
			<td><img src='../img/jump.png' /></td>\
			</tr>"
			$t_body.append(tr)
		}
		
		$t_body.children("tr").children("td:last-child").children("img").click(function(){
			$td = $(this).parent().parent().children("td");
			var id = $.trim($td.eq(0).text());
			var file_name = $.trim($td.eq(1).text());
			// Jump the page
			var url = "viewEcg?id=" + id +"&file_name="+file_name;
			window.open(url,'_blank');
		});
		
	}
	
	
	
	
}