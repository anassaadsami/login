
const constant = Object.freeze({  // object with constant fields
    url: "http://localhost:8080/realms/TWRentalRealm/protocol/openid-connect/logout",
    scope: "openid",
    granttype: "password",
    clienid: "rentalClient", // from keycloak
  });


export const logOut = async()=>{

    const output = {
        success: false
    }
    await fetch(constant.url, {
        method:'POST',
        header:{
            accept:'*/*',
            'Constant-type':'application/x-www-form-urlencoded;charset=UTF-8',
            'Acces-Control-Allow-Origin': '*',
        },
        body: new URLSearchParams({
            client_id: constant.clienid,
            grant_type: constant.granttype,
            scope:constant.scope,
            username: 'teim',
            password: '1234'
        })
    }).then(async(response)=>{

        console.log(response);
    }).catch((err)=>{
        console.log(err);
    })
    return output
}