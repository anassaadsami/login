import { getToken } from "./assets/js/loginHandler.js";
import { logOut } from "./assets/js/logoutHandler.js";

const nv_all_cars = $('#nv-all-cars')
const nv_log_in = $('#nv-log-in')
const nv_bookings = $('#nv-bookings')
const nv_log_out = $('#nv-log-out')

const username_field = $('#username-field')
const password_field = $('#password-field')
const logInFormBtn = $('#lf-btn')
const logInForm = $('#log-in-form')
const homeDiv = $('#home')

const logInSuccess = ()=>{
    logInForm.addClass('hidden')
    nv_log_in.addClass('hidden')

    nv_all_cars.removeClass('hidden')
    nv_bookings.removeClass('hidden')
    nv_log_out.removeClass('hidden')
    homeDiv.removeClass('hidden')
}

const checkLogged = ()=>{
    const token = localStorage.getItem('anasToken')
    const storedUserName = localStorage.getItem('userName')
    if(token !== null && storedUserName !== null) logInSuccess()
    // alert('you are inlogged')
}

checkLogged()

nv_log_out.click(async()=>{
    // window.location = 'http://localhost:8080/realms/TWRentalRealm/protocol/openid-connect/logout/logout-confirm?client_id=rentalClient&amp'
    await logOut()
    localStorage.removeItem('anasToken')
    localStorage.removeItem('userName')
})

let username = ''
let password = ''

logInFormBtn.click(async ()=>{
    username = username_field.val()
    password = password_field.val()

    await getToken(username, password).then((res)=>{
        if(res.success === true){
            logInSuccess()
        }else logInFailur()
    })
})


const logInFailur = ()=>{
    alert('Log in failed')
}

nv_log_in.click(()=>{
    homeDiv.addClass('hidden')
    logInForm.removeClass('hidden')
})


const getAllCars = async ()=>{
    await fetch('http://localhost:9090/api/v1/cars', {
        method:'GET',
        headers:{
            'authorization': 'Bearer ' + localStorage.getItem('anasToken'),
            'accept': '*/*',
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then(async(response)=>{
        console.log(response);
        if (response.status === 403) {
            console.log('Unauthorized');
        }
        if (response.status === 401) {
            console.log('You need to log in first');
        }
        const result = await response.json()
        console.log(result);
        if (response.status === 302) {
            showIt(result)
        }
    }).catch((err)=>{
        console.log(err);
    })
}

