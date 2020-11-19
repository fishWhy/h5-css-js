//commonjs规范（因为webpack是在node下运行的）
module.exports = {
    //处理模式
    //development表示开发模式，代码不会压缩
    //producetion表示发布模式，代码会压缩（默认）
    mode:'development',
    //入口
    entry: './main.js',
    //发布
    output: {
        //文件名称
        filename: './demo.js'
    },
    //模块
    module:{
        //加载机
        rules: [
             //每一个成员代表一个加载机 !
            //css加载机
            {
                test : /\.css$/,
                //!级联多个加载机
                use: ['style-loader','css-loader']
                // //使用use引入加载机，可以传递更多的参数
                // use: [
                //     {
                //         loader: 'style-loader'
                //     },
                //     {
                //         loader: 'css-loader'
                //     }
                // ]
            }
        ]
    }
}
