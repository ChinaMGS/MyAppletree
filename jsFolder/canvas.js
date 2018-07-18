//扇形

    		var pi=$("#cant").getContext('2d');
	        var j = 6;
	        function half(){
	        	pi.clearRect(0,0,25,25);
	        	for(var i=j;i>1;i--){
	        		pi.beginPath();
	        		if(i%2==0){
	        			pi.fillStyle="#0894EC";
	        		}else{
	        			pi.fillStyle="white";
	        		}
			        pi.moveTo(0,12);
			        pi.arc(0,12,i*4,Math.PI*11/6,Math.PI*13/6,false);
			        pi.fill();
			        pi.closePath();
	        	}
	        	j--;
	        	if(j==1){
	        		j = 6;
	        	}
	        }
		
	        var time = true;
	        var set;
	        $("body").on("touchend",".speak-can",function(){
	        	if(time == true){
	        		set = setInterval("half()",500);
	        		time = false;	
	        	}else if(time == false){
	        		clearInterval(set);
	        		time = true;
	        	}
	        });