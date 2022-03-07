//数组中字符串以keywords开头转换颜色
//keywords：过滤条件字符串，需要过滤的字符串数组
export function stringNode(keywords,suggestKeywords){
    //全部行节点
    let suggestNodes=[]
    for(let word of suggestKeywords){
        //一行的节点
        let nodes=[]
        // 如果是以输入的内容开头
        if(word.startsWith(keywords)){
            // 切割出相同的部分
            const k1=word.slice(0,keywords.length)
            //建立一个node
            const node1={
                name:'span',
                attrs:{style:'color: #26ce8a;'},
                children:[{type:'text',text:k1}]
            }
            nodes.push(node1)
            // 切割出不同的部分
            const k2=word.slice(keywords.length)
            const node2={
                name:'span',
                attrs:{style:'color: #000;'},
                children:[{type:'text',text:k2}]
            }
            nodes.push(node2)
        }else{
            const node={
                name:'span',
                attrs:{style:'color:#000;'},
                children:[{type:'text',text:word}]
            }
            nodes.push(node)
        }
        suggestNodes.push(nodes)
    }
    return suggestNodes
}