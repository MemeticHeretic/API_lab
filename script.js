function sendRequest(method, url) 
{
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        
        xhr.open(method, url);
        
        xhr.responseType = 'json';

        xhr.onload = function(){
            if(xhr.status >= 400)
            {
                reject(xhr.response);
            }
            else
            {
                resolve(xhr.response);
            }            
        }
        xhr.send();
    })
}

function reqPoke()
{
    var name = document.getElementById("name").value;
    var dual = document.getElementById("dual");
    var select = document.getElementById("select").value;
    var offset = '?offset=' + select;
    var limit = '&limit=100';
    sendRequest('GET', 'https://pokeapi.co/api/v2/pokemon' + offset + limit)
    .then(function(data) {
        var temp = "";
        data.results.forEach((poke) => {
            sendRequest('GET', poke.url)
                .then(function(data) {
                    if(dual.checked)
                    {
                        if(data.types.length > 1)
                        {
                            return;
                        }
                    }
                    
                    if(data.types[0].type.name.toLowerCase() == name.toLowerCase() || data.types[1].type.name.toLowerCase() == name.toLowerCase())
                    {
                        temp +="<tr>";
                        temp +="<td>" + data.id + "</td>";
                        temp +="<td>" + data.name.capitalize() + "</td>";
                        temp +="<td>" + data.types[0].type.name.capitalize();
                        if(data.types[1] != undefined)
                        {
                            temp +=", " + data.types[1].type.name.capitalize();
                        }
                        temp +="</td></tr>"
                    }
                    document.getElementById("data").innerHTML = temp;

                })
                .catch(function(data) {
                    console.log(data);
                });
        });
        

    })
    .catch(function(data) {
        console.log(data);
    });
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}