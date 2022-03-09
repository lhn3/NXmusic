
const time_re=/\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export default function (lyricString){
    let lyricList=[]                    //歌词数组
    let lyricStringList=lyricString.split('\n')
    for(let lrc of lyricStringList){
        // lrc: [00:00.000] 作词 : 郭顶
        let timeString=time_re.exec(lrc)    //正则匹配时间
        if(!timeString) continue
        let mime=timeString[1]*60*1000      //分
        let second=timeString[2]*1000       //秒
        let mill=timeString[3]*1            //毫秒
        let time=mime+second+mill

        let lyric=lrc.replace(timeString[0],'')  //替换时间取出歌词
        lyricList.push({time,lyric})            //时间和歌词的对象
    }
    return lyricList
}