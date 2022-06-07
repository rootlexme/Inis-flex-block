(()=>{
    const app = Vue.createApp({
        data(){
            return {
                Cmaineditor: {},
                showarticle: {
                    expand: '',
                    sort: '',
                    tag: '',
                },
                blog: [flexblock.author, flexblock.blogname, flexblock.authorimg, flexblock.authordes, flexblock.notice],
                group: {
                    article: '',
                    count: null,
                    tag: '',
                    articlesort: '',
                },
                comments: {
                    page: {
                        code: 1,
                        list: []
                    },
                    data: {}
                },
                articleid: null,
                comment: {
                    pid: 0,          
                    content: '',    
                    nickname: '',   
                    email: '',          
                    url: '',           
                    article_id: 0,      
                },
                CReplyid: null,
                
            }
        },
        mounted(){
            this.getGroup()
            const articleid = inisHelper.get.query.string('id')
            if (inisHelper.is.empty(articleid)){
                window.location.href = '/'
            }
            else
            {
                this.articleid = articleid;
                this.showArticle()
                this.getComment()
            }
            
        },
        methods: {
            showArticle(id = this.articleid){
                inisHelper.fetch.get(flexblock.api + '/article', {
                    id,
                }).then(res=>{
                    if (res.code == 200)
                    {
                        this.showarticle  = res.data;
                    }
                })
            },  
            getGroup(){
                inisHelper.fetch.get(flexblock.api + '/group').then(res=>{
                    if (res.code == 200)
                    {
                        this.group = res.data;
                    }
                })
            },
            getComment(id = this.articleid){
                inisHelper.fetch.get(flexblock.api + '/comments',{
                    article_id: id, tree: 'false', limit: 9999
                }).then(res=>{
                    if (res.code == 200)
                    {
                        this.comments = res.data;
                    }
                })
            },
            postComment(id){
                if (inisHelper.is.empty(this.comment.content)) {
                    Snackbar.show({
                        pos: 'top-right',
                        text: '评论内容不为空',
                        actionTextColor: '#4caf50', 
                        actionText: '关闭',
                        });
                } 
                else if (inisHelper.is.empty(this.comment.nickname)) {
                    Snackbar.show({
                        pos: 'top-right',
                        text: '昵称不为空',
                        actionTextColor: '#4caf50', 
                        actionText: '关闭',
                        });
                } else if (inisHelper.is.empty(this.comment.email)) {
                    Snackbar.show({
                        pos: 'top-right',
                        text: '邮箱不为空',
                        actionTextColor: '#4caf50', 
                        actionText: '关闭',
                        });}
                else {
                    inisHelper.fetch.post(flexblock.api + '/comments',{
                        article_id: id, content: this.comment.content, nickname: this.comment.nickname, email: this.comment.email,
                        url: this.comment.url
                    }).then(res=>{
                        if (res.code == 200) {
                            this.comment.content = ''
                            Snackbar.show({
                                pos: 'top-right',
                                text: '评论成功',
                                actionTextColor: '#4caf50', 
                                actionText: '关闭',
                                });
                            this.getComment()
                            
                        }
                    })
                }
            },
            postCommentR(cpid){
                if (inisHelper.is.empty(this.comment.content)) {
                    Snackbar.show({
                        pos: 'top-right',
                        text: '评论内容不为空',
                        actionTextColor: '#4caf50', 
                        actionText: '关闭',
                        });
                } 
                else if (inisHelper.is.empty(this.comment.nickname)) {
                    Snackbar.show({
                        pos: 'top-right',
                        text: '昵称不为空',
                        actionTextColor: '#4caf50', 
                        actionText: '关闭',
                        });
                } else if (inisHelper.is.empty(this.comment.email)) {
                    Snackbar.show({
                        pos: 'top-right',
                        text: '邮箱不为空',
                        actionTextColor: '#4caf50', 
                        actionText: '关闭',
                        });}
                else {
                    inisHelper.fetch.post(flexblock.api + '/comments',{
                        pid: cpid, content: this.comment.content, nickname: this.comment.nickname, email: this.comment.email,
                        url: this.comment.url
                    }).then(res=>{
                        if (res.code == 200) {
                            this.comment.content = ''
                            Snackbar.show({
                                pos: 'top-right',
                                text: '评论成功',
                                actionTextColor: '#4caf50', 
                                actionText: '关闭',
                                });
                            this.getComment()
                            
                        }
                    })
                }
            },
            commentReply(id)
            {
                this.CReplyid = id;
                this.Cmaineditor = {
                    display: 'none'
                }
            },
            ccommentReply()
            {
                this.Cmaineditor = {
                    display: 'block'
                    
                }
                this.CReplyid = null
            },

        },
    }).mount('#app')
})()