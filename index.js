const axios = require('axios')
const cheerio = require('cheerio')
var fs = require('fs')
var players = []


const fetchData = async(url) =>{
    const result = await axios.get(url)
    return result.data
}
var arr = [];
const main = async () =>{
    const content = await fetchData("https://www.vlr.gg/stats/?event_id=all&region=all&country=all&min_rounds=100&agent=all&ranked=1&timespan=60d")
    const $ = cheerio.load(content)
    
   $('tr').each((i,e)=>{
        const originalName = $(e).find('[class=text-of]').text()
        const name =originalName.toLowerCase()
        const time = $(e).find('[class=stats-player-country]').text()
        const rnd = $(e).find('[class="mod-rnd"]').text()
        $(e).find('[class="color-sq"]').each((i,e)=>{
            arr.push($(e).find('span').text())
        })
        //console.log(`${name} ${time} ${rnd} ${arr[0]} ${arr[1]} ${arr[2]} ${arr[3]} ${arr[4]} ${arr[5]} ${arr[6]} ${arr[7]}`)
        var player ={
            name: name,
            originalName:originalName,
            team: time,
            rnd: rnd,
            acs: arr[0],
            kd: arr[1],
            adr:arr[2],
            kpr:arr[3],
            fkpr:arr[4],
            fdpr:arr[5],
            hs:arr[6],
            cl:arr[7]
        }
       players.push(player)

       let data = JSON.stringify(players, null, 2);
       //console.log(data)

    fs.writeFile('playerStates.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

       //console.log(player)
        arr = null;
        arr = []
    })
   
    
}

main()