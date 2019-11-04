/**
 * @param total_data_num Total number of data
 * @param page_data_num Number of data on a page
 * @param update_data It is callback function
 * @param fill_content It is callback function
 */
function Paging(total_data_num, page_data_num, update_data, fill_content){
	
	// Request data state
	this.request_state = true;
	
	// Total number of data
	var _total_data_num = total_data_num;
	// Current page number of data
	var _page_data_num = page_data_num;
	
	// Current page
	var _current_page = 1;
	// Total pages
	var _total_page = Math.ceil(_total_data_num/_page_data_num);
	
	// Fixed number of pages
	var _fix_num_page = 10;
	
	/**
	 * Initial the pages
	 */
	this.init_page = function(){
		
		// Initial the buttons
		if(_total_page > 0){
			if(_total_page>_fix_num_page){
				_update_pages(_current_page, _fix_num_page);
			}else{
				_update_pages(_current_page, _total_page);
			}			
		}
		
		// Initial the tutton of page		
		$(".page_num>button").click(function(){
			if(!$(this).hasClass("page_selected")){
				$(this).siblings().removeClass("page_selected");
				$(this).addClass("page_selected");
				
				// Get the current page
				_current_page = Number($.trim($(this).text()));
				
				// Callback the content
				_callback_content();
			}			
		});
		
		// Set the preview page
		$("#prev").click(function(){
			_prev_page();
		});
		
		// Set the next page
		$("#next").click(function(){
			_next_page();
		});
	}
	
	/**
	 * Update the total data number
	 */
	this.update_total_data_num = function(total_data_num){
		if(this.request_state){
			_total_data_num = total_data_num;
			_total_page = Math.ceil(total_data_num/_page_data_num);
			_next_page();
		}
	} 
	
	/**
	 * Preview page
	 */
	function _prev_page(){
		if(_current_page>1){
			
			var $selected = $(".page_num>.page_selected");
			$selected.removeClass("page_selected");
			_current_page =_current_page - 1;
			
			if($selected.index() > 1){
				$selected.prev().addClass("page_selected");
			}else{
				$(".page_num>button").eq(_fix_num_page-1).addClass("page_selected");
				_update_pages(_current_page-_fix_num_page+1, _fix_num_page);
			}
							
			//Callback the content
			_callback_content();
		}
	}
	
	/**
	 * Next page
	 */
	function _next_page(){
		if(_current_page<_total_page){
			// Add the page
			_current_page = _current_page + 1;
			
			var $selected = $(".page_num>.page_selected");
			$selected.removeClass("page_selected");
			
			if($selected.index() < _fix_num_page){
				$selected.next().addClass("page_selected");
			}else{
				$(".page_num>button").eq(0).addClass("page_selected");
				if((_total_page - _current_page)>_fix_num_page){
					_update_pages(_current_page, _fix_num_page);
				}else{
					_update_pages(_current_page, _total_page - _current_page+1);
				}					
			}
			
			//Callback the content
			_callback_content();
		}
		
		// Get more data
		if((_total_page%10 == 0)&&(_current_page == _total_page) && (_total_data_num%_page_data_num==0)){
			update_data();
		}	
	}
	
	
	
	// Update the pages
	function _update_pages(start_page, total_page){
		if(_total_page != 0){
			$("#prev").show();
			var $buttons = $(".page_num>button");
			for(var i=0; i<_fix_num_page; i++){
				if(i<total_page){
					$buttons.eq(i).show();
					$buttons.eq(i).text(start_page+i);
				}else{
					$buttons.eq(i).hide();
				}
			}
			$("#next").show();
		}
	}
	
	// Callback the content
	function _callback_content(){
		// Set the index
		var data_index = (_current_page-1)*_page_data_num;
		
		// Call back the fill_content
		fill_content(data_index);
	}
}