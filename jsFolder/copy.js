/**
 * [testSystem 测试系统]
 * @return {[type]} [description]
 */
function testSystem(){
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isAndroid){
		return 'android';
	}else if(isiOS){
		return 'ios';
	}else{
		return 'undefined';
	}
}
/**
 * [getKey 获得加密后的key]
 * @param  {[type]} para [description]
 * @return {[type]}      [description]
 */
function getKey(para){
	var uAgent = testSystem();
	var date = new Date().Format("yyyyMMdd");
	var str = uAgent + '_'+ para +'_' + date + '_xlhb';
	console.log(str);
	return $.md5(str);
}
var ops = {
	deviceId: testSystem(),
	albumid: 1,
	key: getKey('music'),
	per_page: 1
}
Tools.serverRequest(
	Url.musiclist,
	ops,
	function(data){
		var oData = JSON.parse(data);
		var Arr = [];
		if(oData.code == '1'){
			var oList = oData.tracks.list;
			$.each(oList,function(k,v){
				Arr.push(v.playUrl64);
			})
		}
		console.log(Arr);
	}
);

var musicArr = [ './music/mdzz.mp3', './music/ccav.mp3' ];
var currentArr = musicArr.slice(0); //设置

var _$process = $('.js-process'); //播放进度条
var _$start = $('.js-start'); //播放时间
var _$end = $('.js-end'); //结束时间
var _$opBtn = $('.js-operation .iconfont'); //开始，暂停
var _$opModal = $('.js-model .iconfont'); //循环模式
var currentIndex = 0;

var Audio = {
	/**
	 * [init 音乐播放器]
	 * @param  {[type]} audio [audio对象]
	 * @param  {[type]} url   [音乐地址]
	 * @return {[type]}       [description]
	 */
	init: function(audio, i){
		i = arguments[1]?arguments[1]:0;
		if(currentArr.length<1){
			return false;
		}else{
			audio.attr('src', currentArr[i]);
			audio[0].play();
			currentIndex = i;
			Audio.showTime(audio);
			_$opBtn.removeClass('icon-play').addClass('icon-pause');
		}
	},
	/**
	 * [showTime 播放设置时间]
	 * @param  {[type]} audio [description]
	 * @return {[type]}       [description]
	 */
	showTime: function(audio){
		audio.on('timeupdate',function(e){
			var that = this;
			if(!isNaN(that.duration)){
				var duration = Math.round(that.duration);
				var currentTime = Math.round(that.currentTime);
	            var progressValue = Math.round(currentTime*10000/duration); //用时间比来获取进度条的值
	            if(progressValue >= 9990){
	                //progressValue = 0;//当播放完成，进度条跳到开始
	                currentTime = 0;
					_$opBtn.removeClass('icon-pause').addClass('icon-play');
	            	Audio.nextSong(audio);
	            }
	            var precent = progressValue/100 + '%';
	            var endTime = Tools.formatDate((duration-currentTime)*1000);
	            currentTime = Tools.formatDate(currentTime*1000);
	            Audio.setTime(precent , currentTime , endTime);
	        };
		});
	},
	setTime: function(precent,startTime,endTime){
		_$process.css({'left':precent});
		_$start.html(startTime);
		_$end.html('-'+endTime);
	},
	stop: function(audio){	
		audio[0].pause();
	},
	play: function(audio){
		audio[0].play();
	},
	/**
	 * [setStartNode 设置播放起点]
	 * @param {[type]} audio   [播放器]
	 * @param {[number 0～1 之间]} percent [百分比]
	 */
	setStartNode: function(audio , percent){
		audio[0].pause();
		audio.on('pause',function(e){
			var that = this;
			if(!isNaN(that.duration)){
				var _duration = that.duration;
				var _currentTime = Math.round(_duration*percent);
				that.currentTime = _currentTime;
	        };
		});
		audio[0].play();
	},
	nextSong: function(ev){
		var audio = ev.data.audio?ev.data.audio:arguments[0];
		var len = currentArr.length;
		if(currentIndex<len-1){
			currentIndex++;
			Audio.init( audio, currentIndex);
		}else{
			currentIndex = currentIndex + 1 - len;
			Audio.init( audio, currentIndex);
		}
	},
	prevSong: function(ev){
		var audio = ev.data.audio?ev.data.audio:arguments[0];
		var len = currentArr.length;
		if(currentIndex>0){
			currentIndex--;
			Audio.init( audio, currentIndex);
		}else{
			currentIndex = len - 1;
			Audio.init( audio, currentIndex);
		}
	}
}

var _$audio = $('#audio');

Audio.init( _$audio, 0);

//点击暂停，开始
$('.js-operation').on('touchend',function(){
	if(_$opBtn.hasClass('icon-pause')){
		_$opBtn.removeClass('icon-pause').addClass('icon-play');
		Audio.stop(_$audio);
	}else{
		_$opBtn.removeClass('icon-play').addClass('icon-pause');
		Audio.play(_$audio);
	}
})

//点击单曲循环，列表循环
$('.js-model').on('touchend',function(){
	if(_$opModal.hasClass('icon-list-cycle')){
		_$opModal.removeClass('icon-list-cycle').addClass('icon-single-cycle');
		currentArr = [];
		currentArr.push(_$audio.attr('src'));
	}else{
		_$opModal.removeClass('icon-single-cycle').addClass('icon-list-cycle');
		currentArr = [];
		currentArr = musicArr.slice(0);
	}
})

//点击上一曲
$('.js-prev').on('touchend',{audio: _$audio},Audio.prevSong)

//点击下一曲
$('.js-next').on('touchend',{audio: _$audio},Audio.nextSong);

var startBoxX = Tools.getElementLeft($('.js-bar')[0]); //进度条开始位置
var endBoxX = startBoxX + $('.js-bar').width(); //进度条结束位置
var startX; //滑动开始位置
var endX; //滑动结束位置

//拖动进度条，设置音乐播放
var Touch = {
	handleStart: function(e){
		e.preventDefault();
		var touch = e.targetTouches[0];
		startX = touch.pageX;
	},
	handleEnd: function(e){
		e.preventDefault();	
		_$audio.off('pause');
	},
	handleMove: function(e){
		e.preventDefault();
		var touch = e.targetTouches[0];
		endX = touch.pageX;
		if(endX<startBoxX){
			endX = startBoxX;
		}else if(endX>endBoxX){
			endX = endBoxX;
		}
		var touchPer = ((endX-startBoxX)/(endBoxX-startBoxX));
		var touchPercent = Math.round(((endX-startBoxX)/(endBoxX-startBoxX))*100) + '%';
		_$process.css({'left':touchPercent});		
		Audio.setStartNode(_$audio, touchPer);
	},
}

function startup() {
  _$process.on("touchstart", Touch.handleStart);
  _$process.on("touchend", Touch.handleEnd);
  _$process.on("touchmove", Touch.handleMove);
}

startup();










