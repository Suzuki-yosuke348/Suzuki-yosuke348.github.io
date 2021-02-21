const app = new Vue({
    el: "#app",
    data:{
        
        lists: [
            {id: Int32Array,
            context: String,
            budget: Int32Array,
            state: Int8Array}
        ],
        inputting: '',
        number: 0,
        statement: [
            {value: -1, label: 'すべて'},
            {value: 0, label: '未購入'},
            {value: 1, label: '購入済'},
        ],
        current: -1,
    },

    //ページ読み込み時に実行
    created() {
        this.loadTodo();
    },

    mounted() {
        console.log(this.lists);
        //nullであればlistsをリストとして認識させる
        if(this.lists == null){
            this.lists = [{id: 0,context: "a",budget: 0,state: 0}];
            this.deleteTodo(0);
        }
    },

    computed: {
        labels() {
            return this.statement.reduce(function(a,b){
                //statementのlabelタグを元にテキストを表示
                return Object.assign(a, {[b.value]: b.label})
            },{})
        },
        computedTodo: function(){
            //リストが空ではないとき
            if(this.lists.length > 0){
                return this.lists.filter(function(el){
                    //0未満で無ければthis.currentの値に応じて表示するアイテムを選別する
                    //0なら"未購入"、1なら"購入済"
                    return this.current < 0 ? true : this.current === el.state
                },this)
            }
        }
    },

    methods: {

        //inputは商品名、numvalは予算が格納される
        addTodo: function(input, numval){
            var index = this.lists.length;
            if(input){
                this.lists.push({
                    id: index++,
                    context: input,
                    budget: numval,
                    state: 0
                });
                this.inputting = '';
                this.number = 0;
                this.saveTodo();
            }
        },

        changeState: function(item){
            //item.stateを反転させる
            item.state = item.state ? 0:1;
            this.saveTodo();
        },

        deleteTodo: function(item){
            //アイテムのidを渡して削除
            var index = this.lists.indexOf(item);
            this.lists.splice(index,1);
            this.saveTodo();
        },
        
        saveTodo: function(){
            localStorage.setItem('todo',JSON.stringify(this.lists));
        },

        loadTodo: function(){
            const i = JSON.parse( localStorage.getItem('todo') );
            console.log(i);
            this.lists = i;
        },

    },
})