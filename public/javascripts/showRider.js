var i;
		var n ;
		var count;
		var pressedBtn;
		var name;
    // Example starter JavaScript for disabling form submissions if there are invalid fields

		$(window).ready(function () {
			swal("請先篩選");
			$('#btn_changeBasicData').click(function() {
				changeBasicData($('#nN').val(), $('#nP').val(), $('input[name=gender]:checked').val());
			});
			$('#btn_logout').click(function() {
				alert("logout");
			});
			$('#btn_filter_query').click(function() {
				$('#selectmodal').modal('hide');
				swal("篩選中，請耐心等候");
				filter_query(
					$('input[name=gender_filter]:checked').val(), 
					$('input[name=helmet]:checked').val(), 
					$('input[name=area]:checked').val(), 
					$('#d').val(), 
					$('input[name=takingPlace]:checked').val()
				);
			});
			
		});
		
		function changeBasicData(name, phone, gender){
			$.ajax({
				url: '/changePassengerInfo',
				type: 'post',
				data: {name : name, phone: phone, gender:gender},
				success: function(chkRes){
					if(chkRes.result == "change succ"){
						swal("修改成功!","","success");
						$('#infomodal').modal('hide');
					}
					else{
						swal("change data error.", "", "error");
					}
				},
				error: function(){
					swal("帳號已被登出，請重新登入", "", "error");
					location.href="/SignIn.html";
				}
			})
		}

		function filter_query(gender, helmet, area, destination, takingPlace){
			$.ajax({
				url: '/riderFilter',
				type: 'post',
				data: {
					gender		:gender		,
					helmet		:helmet		,
					area		:area		,
					destination	:destination,
					takingPlace	:takingPlace
				},
				success: function(chkRes){
					if(chkRes.status == "match 成功"){
						filter();
					}
					else{
						alert("filter error.");
					}
				},
				error: function(){
					swal("帳號已被登出，請重新登入", "", "error");
					location.href="/SignIn.html";
				}
			})
		}

		function sendAndSet_query(takingTime, takingPlace, remark){
			$.ajax({
				url: '/changePassengerInfo',
				type: 'post',
				data: {
					takingTime	:takingTime	,
					takingPlace	:takingPlace,
					remark		:remark
				},
				success: function(chkRes){
			
				},
				error: function(){
					alert("帳號已被登出，請重新登入");
					location.href="/SignIn.html";
				}
			})
		}

		function selectAnswer(){
			var s = $("[name='Sex']:checked").val();
			var h = $("[name='Helmet']:checked").val();
			var d = document.getElementById("d").value;
			var g = document.getElementById("g").value;
			alert(d);
			alert(g);
			//var z = $('select').val();
		}
		function sendRequest(c){
			pressedBtn = c;
			if(document.getElementById('t'+c).value.length==0 || document.getElementById('gO'+c).value.length==0)alert("請填寫上車時間和地點");
			else{
				//alert(document.getElementById("t"+c).value);
				$('#sendmodal'+c).modal('hide');
				sendAndSet_query(	
					document.getElementById("t"+c).value,
					document.getElementById("gO"+c).value,
					document.getElementById("oth"+c).value				
				);
				$.ajax({
					url : 'http://127.0.0.1:3000/getRiderFilter',
					type : 'GET',
					success:function(data){
						name = JSON.stringify(data.result[c]);
						//alert(name);  
						post(name);       
					}       
				})
				for(var j = 0; j <= count - 1; j++){
					document.getElementById(j).disabled = true;
				}  
				window.setTimeout(setDisabled, 208000);
			}
			
		}
		/*function sendRequest(c){
			pressedBtn = c;
			for(var j = 0; j <= count - 1; j++){
			  document.getElementById(j).disabled = true;
			}     
			$.ajax({
				url : 'http://127.0.0.1:3000/getRiderFilter',
				type : 'GET',
				success:function(data){
					name = JSON.stringify(data.result[c]);
					//alert(name);  
					post(name);       
				}       
			})
		}*/
		function post(n){
			fetch('http://127.0.0.1:3000/sendOrderToOwner', {
			body: n, // must match 'Content-Type' header
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached         
			headers: {
				'content-type': 'application/json'
			},
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors'
			})
			.then(response => console.log(n))
			.then(response => response.json()) 
			.catch(function() {
				console.log(n);
			});
		}
    //顯示篩選內容
    function filter(){
      $('.card-group').empty();       
      $.ajax({
			url : '/getRiderFilter',
			type : 'GET',
			success: function(data){
        	count = data.result.length;
			console.log(data);
			var rate;
        count = data.result.length;
        if(count==0)swal("無結果，請更改篩選條件");
		    for(var i = 0; i < data.result.length; i++){
				if(data.result[i].rateCount==0)rate="無";
				else rate=data.result[i].rateTotal/data.result[i].rateCount;
			$('.card-group').append(   
				'<div class="col-md-12">'+
            		'<div class="card border-primary">'+
              			'<div class="row g-0">'+
							'<div class="col-md-4" style="text-align:center;">'+
							'<img src="'+data.result[i].picture+'" class="img-fluid rounded-start" alt="還沒有照片">'+
							'</div>'+
                '<div class="col-md-8">'+
					'<div class="card-header" style="background-color: rgb(157, 215, 233)">'+
					data.result[i].name+
					'</div>'+
					'<div class="card-body" style="background-color: rgb(205, 238, 248)">'+
					'性別: '+ data.result[i].gender+
					'<br>'+
					'可搭乘時間: '+ data.result[i].workingTime+
					'<br>'+
					'可接送地點: '+ data.result[i].area+
					'<br>'+
					'聯絡方式: '+ data.result[i].phone+
					'<br>'+
					'是否備有安全帽: '+ data.result[i].helmet+
					'</div>'+
                '<div class="card-footer" style="background-color: rgb(157, 215, 233)">'+
                  '<div style="text-align: center;">'+
                    '評分: '+rate+'<br>'+
                    '<button id="'+i+'" name="sendButton" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#sendmodal'+i+'" style="background-color: rgb(0, 0, 0); text-align: center;">發送請求</button>'+
                    '<!--發送請求彈出視窗-->'+
                    '<div class="modal fade" id="sendmodal'+i+'">'+
                      '<div class="modal-dialog">'+
                        '<div class="modal-content">'+
                          '<div class="modal-header">'+
                            '<h1 class="modal-title fs-5" id="exampleModalLabel">希望乘車資訊</h1>'+
                            '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
                          '</div>'+
                          '<div class="modal-body">'+
                            '<div id="current_date">'+year+'/'+month+'/'+day+'</p>'+
							'<iframe name="dummyframe" id="dummyframe" style="display: none;"></iframe>'+
							//'<form action="http://127.0.0.1:3000/changePassengerInfo" method="post" target="dummyframe" id="newModalForm">'+ 
                              '<div class="input-group">'+
                                '<span class="input-group-text" id="time">今天</span>'+
                                '<input type="text" name="takingTime" class="form-control is-valid" placeholder="24小時制" aria-describedby="time" pattern="([0-1]{1}[0-9]{1}|20|21|22|23):[0-5]{1}[0-9]{1}" id="t'+i+'" required>'+
                              '</div>'+
                              '<div class="input-group">'+
                                '<span class="input-group-text" id="getOn">地點</span>'+
                                '<input type="text" name="takingPlace" class="form-control is-valid" placeholder="上車地點" aria-describedby="getOn" id="gO'+i+'" required>'+
                              '</div>'+
                              '<div class="input-group">'+
                                '<span class="input-group-text" id="other">備註</span>'+
                                '<input type="text" name="remark" class="form-control" placeholder="" aria-describedby="other" id="oth'+i+'">'+
                              '</div>'+
                              '<br>'+
                              '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>'+
                              '<button onclick="sendRequest('+i+');" id="closeSBtn" class="btn btn-primary">確認發送</button>'+
							//'</form>'+
                          '</div>'+
                        '</div>'+
						'<div class="card-header" style="background-color: rgb(157, 215, 233)">'+
							data.result[i].name+
						'</div>'+
						'<div class="card-body" style="background-color: rgb(205, 238, 248)">'+
							'性別: '+ data.result[i].gender+
							'<br>'+
							'可搭乘時間: '+ data.result[i].workingTime+
							'<br>'+
							'可接送地點: '+ data.result[i].area+
							'<br>'+
							'聯絡方式: '+ data.result[i].phone+
							'<br>'+
							'是否備有安全帽: '+ data.result[i].helmet+
						'</div>'
                       
          )
        }
			},
      error:function(){
        swal("no", "", "error");
      }
		})         
    }
	
		function setDisabled() {
			for(var k = 0; k <= count - 1; k++){
			  document.getElementById(k).disabled = false;
			}
		}
		function setstr(s) {
			document.getElementById(pressedBtn).innerHTML=s; 
			s -= 1;
			if(s >= 0){
				setTimeout(setstr,1000,s);
			}
			else{document.getElementById(pressedBtn).innerHTML='發送請求';}
		}
    date = new Date();
    year = date.getFullYear();
    var month = date.getMonth()+1 ;
    day = date.getDate();