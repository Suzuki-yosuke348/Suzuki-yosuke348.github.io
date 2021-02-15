const clock = new Vue({
    el: '#clock',
    data:{ 
        date: '',
        time: '',
        week: ['Sun','Mon','Tue','Wen','Thu','Fri','Sat'],  //曜日格納用
        clockMode: true,    //時計モード(true)orストップウォッチモード(false)
        //以下ストップウォッチモードの際に使う変数
        startTime: 0,       //開始時間
        timer:  0,          //setinterval格納用
        interval: 0,        //計測時間
        stopTime: 0,        //累計時間
        active: false,      //ストップウォッチを実行しているか
    },

    mounted(){
        setInterval(this.updateTime,1000);
    },

    methods: {
        updateTime: function(){
            let currentTime = new Date();
            this.date = this.zeroPadding(currentTime.getFullYear(),4) + "/" + this.zeroPadding((currentTime.getMonth()+1),2) + "/" 
            + this.zeroPadding(currentTime.getDate(),2) + "(" + this.week[currentTime.getDay()] + ")";
            this.time = this.zeroPadding(currentTime.getHours(),2) + ":" + this.zeroPadding(currentTime.getMinutes(),2) 
            + ":" + this.zeroPadding(currentTime.getSeconds(),2);
        },

        zeroPadding: function(num,len){
            let zero = '';
            for(var i=0;i<len;i++){
                zero += '0';
            }
            return (zero+num).slice(-len);
        },

        modeChange: function(){
            this.clockMode = !this.clockMode;
            if(this.active){    //ストップウォッチ動作中のときは一時停止する
                this.stopTime();
            }
        },

        timerStart: function(){
            this.active = true;
            this.startTime = Date.now();
            this.timer = setInterval(()=>{ this.interval = this.stopTime + (Date.now() - this.startTime) * 0.001;},1);
        },

        timerStop: function(){
            this.active = false;
            this.stopTime = this.interval;
            clearInterval(this.timer);
        },

        timerReset: function(){
            this.interval = 0;
            this.stopTime = 0;
            this.startTime = Date().now;
        },

    },
    
});  