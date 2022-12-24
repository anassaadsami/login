
const constant = Object.freeze({  // object with constant fields
    url: "http://localhost:8080/realms/TWRentalRealm/protocol/openid-connect/token",
    scope: "openid",
    granttype: "password",
    clienid: "rentalClient", // from keycloak
  });

export const getToken = async(username, password)=>{

    const output = {
        success: false
    }
    await fetch(constant.url, {
        method:'POST',
        header:{
            accept:'*/*',
            'Constant-type':'application/x-www-form-urlencoded;charset=UTF-8',
            'Acces-Control-Allow-Origin': '*',
            'Acces-Control-Allow-Headers': '*',
        },
        body: new URLSearchParams({
            client_id: constant.clienid,
            grant_type: constant.granttype,
            scope:constant.scope,
            username: username,
            password: password
        })
    }).then(async(response)=>{

        console.log('Keycloak response: ============', response);
        if (response.status === 401) {
            console.log('bad user name or password');
        }
        const parsed = await response.json()
        console.log('Result: ============', parsed);

        localStorage.setItem('anasToken', parsed.access_token)
        localStorage.setItem('userName', username)
        output.success = true
    }).catch((err)=>{
        console.log(err);
    })
    return output
}