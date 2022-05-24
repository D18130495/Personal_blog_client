const data = [
    {
        id: '1',
        name: 'Manage article',
        icon: 'el-icon-s-home',
        children:[
            {
                name: 'Article',
                icon: 'el-icon-notebook-2',
                router: '/article'
            },
            {
                name: 'Channel',
                icon: 'el-icon-s-order',
                router: '/channel'
            }
            ,{
                name: 'Tag',
                icon: 'el-icon-price-tag',
                router: '/tag'
            },
            {
                name: 'Comment',
                icon: 'el-icon-s-comment',
                router: '/comment'
            }
        ]
    },
    {
        id: '2',
        name: 'Manage user',
        icon: 'el-icon-user',
        children:[
            {
                name: 'User',
                icon: 'el-icon-user',
                router: '/user'
            },
            {
                name: 'Friend Link',
                icon: 'el-icon-paperclip',
                router: '/friend'
            }
        ]
    }
]

export default  data