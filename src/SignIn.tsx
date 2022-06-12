import React from 'react'
import { useMoralis } from "react-moralis";
import { Web3Auth } from "@web3auth/web3auth";
const SignIn = () => {
    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout,Moralis } = useMoralis();
   // const provider = await web3auth.connect();
    const SignIn = async() => {
  console.log("Clicked")
  const logg = await Moralis.authenticate({
    provider: "web3Auth",
    clientId: "BGy-blr5UvpSoHAIeKQkPG-wcpmOy-zMAAyk5FM_AY2ruKImUCHojWASwY5tqh7FYmASnJ5iVS-EFPX9HVRAO20",
})
console.log(logg)
//    Moralis.authenticate({
// 	provider: "web3Auth",
// 	clientId: "BGy-blr5UvpSoHAIeKQkPG-wcpmOy-zMAAyk5FM_AY2ruKImUCHojWASwY5tqh7FYmASnJ5iVS-EFPX9HVRAO20",
//     loginMethodsOrder:["google", "facebook", "twitter", "reddit", "discord", "twitch", "apple", "line", "github", "kakao", "linkedin", "weibo", "wechat", "email_passwordless"],
//     theme:"dark"
// })
    }  
   
  return (
    <div><button onClick ={SignIn}>SignIn</button></div>
  )
}

export default SignIn