const {header, footer} = require('../generic/generic-sections')

function assetList(assets){
    return assets.map((asset, i) =>{
        return (`<li>${asset.Name}</li>`)
    }).join('\n')
}

exports.assetAgreement = function(user, agreement, assets,title,foot){
    return `
    <div>
        ${header(title)}
        <div>
            <p>
            <b>Neka tvrtka d.o.o.,</b> Neka adresa 15B, Pula,
            OIB: 21313543842, (u daljnjem tekstu Poslodavac)
            </p></br>
            <p>i</p></br>
            <p>
            <b>${user.FullName}</b> iz ${user.Address}, OIB: ${user.OIB}
            (u daljenjm tekstu Radnik)
            </p><br/>
            <p>
            su u <b>Puli</b> dana ${agreement.Date} zaključili slijedeće
            </p></br>
            <p>
                <b>Potvrda o zaduženju opreme</b>
            </p>
            <p>Radik je primio opremu sa sljedećim specifikacijama</p></br>
            <ol>
             ${assetList(assets)}
            </ol>
            
        </div>
        ${footer(foot)}
    </div>
    `
}