(()=>{
    const app = Vue.createApp({
        data(){
            return {
                article: [],
                blog: [flexblock.author, flexblock.blogname, flexblock.authorimg, flexblock.authordes], 
            }
        },
        mounted(){
            this.getArticle()
        },
        methods: {
            getArticle(){
                inisHelper.fetch.get(flexblock.api + '/article').then(res=>{
                    if (res.code == 200)
                    {
                        this.article  = res.data;
                        console.log(res);
                    }
                }
                )
            },  
        },
    }).mount('#app')
})()