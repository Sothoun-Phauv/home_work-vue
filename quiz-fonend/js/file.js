new Vue({
    el: '#app',
    data: {
        todos: [],
        author_id: null,
        title: '',
        body: '',
        updateId: null,
        isUpdate: false,
        url: 'http://localhost:3000/api/books'
    },

    methods: {
        getTodos() {
            axios.get(this.url).then(response => {
                this.todos = response.data
            })
        },

        createBook() {
            let data = {
                author_id: this.author_id,
                title: this.title,
                body: this.body
            }
            axios.post(this.url, data).then(() => {
                this.getTodos();
                this.author_id = null
                this.title = ''
                this.body = ''
            })

        },

        removeBook(item){
            let id = item.id;
            
            window.axios.delete(this.url + '/' + id)
                .then(response => {
                    window.location.reload();
                });
        
        },

        editBook(item) {
            this.author_id = item.author_id
            this.title = item.title
            this.body = item.body
            this.updateId = item.id
            this.isUpdate = true
        },
        updateBook() {
            let data = {
                author_id: parseInt(this.author_id),
                title: this.title,
                body: this.body
            }
            axios.put(this.url + '/' + this.updateId, data).then(() => {
                window.location.reload();
            });
            this.isUpdate = false
            this.author_id = null
            this.title = ''
            this.body = ''
        }
    },

    mounted() {
        this.getTodos();
    },
})
