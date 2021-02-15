const vue = new Vue({
    el: '#delay',
    data: {
        datalists: [],
    },

    created(){
        axios.get('https://tetsudo.rti-giken.jp/free/delay.json')
        .then(response =>{
            this.datalists = response.data;
        })
        .catch(error =>{
            console.log(error);
        });
    },

    methods : {
        shareTwitter : function(company,rail_name) {
            if(rail_name != ""){
                var shareURL = 'https://twitter.com/intent/tweet?text=' + company + 'の' + rail_name + 'が遅延しています' + "%20%23Delay_railway" + '&url=' + 'https://les-requin.net';
            }else{
                var shareURL = 'https://twitter.com/intent/tweet?text=' + company + '本線が遅延しています' + "%20%23Delay_railway" + '&url=' + 'https://les-requin.net';
            }
            location.href = shareURL;
        },
    }

});