//https://reqres.in/api/users

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

function reqNumber()
{
    var number = document.getElementById("number").value;
    sendRequest('GET', 'https://reqres.in/api/users/?per_page=' + number)
    .then(function(result) {
        console.log(result);
        if(result.data.length > 0)
        {
            var temp = "";
            result.data.forEach((u) => {
                temp +="<tr>";
                temp +="<td>" + u.first_name + "</td>";
                temp +="<td>" + u.last_name + "</td>";
                temp +="<td>" + u.email + "</td></tr>";
            });
            document.getElementById("data").innerHTML = temp;
        }
        
    })
    .catch(function(data) {
        console.log(data);
    });
}