const defaultItems = [
    { title: '起床する', isChecked: false },
    { title: '歯を磨く', isChecked: false },
    { title: '出勤する', isChecked: false },
    { title: '帰宅する', isChecked: false },
    { title: '就寝する', isChecked: false }
];

const app = new Vue({
    el: '#app',
    data: {
        items: [
            {title: String,
            isChecked: Boolean,
        }],
        inputting: '',
        show: true,
    },
    
    //mounted()にするとTODOが無い状態が見えてしまうのでcreated()に
    created(){
        this.loadTodo();
    },

    mounted() {
        if(this.items == null){
            this.items = [{title:'',isChecked: false}];
            this.defaultTODO();
        }
    },

    methods: {

        addTodo : function(){
            if(this.inputting){             //inputtingに値が入っているなら処理をする
                this.items.push({
                    title: this.inputting,
                    isChecked: false
                });
                this.inputting = '';
                this.saveTodo();
            }
        },

        deleteTodo : function(){
            this.items = this.items.filter(function(items){
                return items.isChecked === false;   //チェックボックスにONがされていなかったらそのままリストに格納
            });
            this.saveTodo();
        },

        defaultTODO : function(){
            this.items.splice(0, this.items.length);    //リストの初期化
            this.items.push(...defaultItems);           //defaultItemsをitemsに格納
            this.saveTodo();
        },

        saveTodo: function(){
            localStorage.setItem( 'items', JSON.stringify(this.items) );
        },

        loadTodo: function(){
            const i = JSON.parse( localStorage.getItem('items') );
            console.log(i);
            this.items = i;
            /*以下のコードは以前に動いていた処理
            console.log(i);
            if( i.length == 0 ){
                this.items.push(...defaultItems);
            }else{ this.items = i; }
            console.log(this.items)
            */
        },
        
    },

})