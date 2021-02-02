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
        items: [],
        inputting: '',
        show: true,
    },
    
    mounted(){
        this.loadTodo();
    },

    methods: {

        addTodo : function(){
            if(this.inputting){
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
                return items.isChecked === false;
            });
            this.saveTodo();
        },

        defaultTODO : function(){
            this.items.splice(0, this.items.length);
            this.items.push(...defaultItems);
            this.saveTodo();
        },

        saveTodo: function(){
            localStorage.setItem( 'items', JSON.stringify(this.items) );
        },

        loadTodo: function(){
            const i = JSON.parse( localStorage.getItem('items') );
            console.log(i);
            if( i.length == 0 ){
                this.items.push(...defaultItems);
            }else{ this.items = i; }
            console.log(this.items)
        },
        
    },

})