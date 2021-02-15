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

    created() {
        this.loadTodo();
    },

    mounted() {
        if(this.lists == null){
            console.log("listsがnull");
        }
    },

    computed: {
        labels() {
            return this.statement.reduce(function(a,b){
                return Object.assign(a, {[b.value]: b.label})
            },{})
        },
        computedTodo: function(){
            if(this.lists == null){
                this.lists = [{id: 0,context: "a",budget: 0,state: 0}];
                this.items.splice(0, this.items.length);    //リストの初期化
            }
            if(this.lists.length > 0){
                return this.lists.filter(function(el){
                    return this.current < 0 ? true : this.current === el.state
                },this)
            }
        }
    },

    methods: {

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
            item.state = item.state ? 0:1;
            this.saveTodo();
        },

        deleteTodo: function(item){
            var index = this.lists.indexOf(item);
            this.lists.splice(index,1);
            this.saveTodo();
        },
        
        saveTodo: function(){
            localStorage.setItem('todo',JSON.stringify(this.lists));
        },

        loadTodo: function(){
            const i = JSON.parse( localStorage.getItem('todo') );
            this.lists = i;
        },

    },
})