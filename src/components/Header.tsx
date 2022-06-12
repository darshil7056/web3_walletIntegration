import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useMoralis } from 'react-moralis'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import magicLink from '../images/magicLink.jpg'
import metmask from '../images/MetaMask.png'
import torus from '../images/torus.png'
import walletConnect from '../images/walletConnect.png'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaCopy } from 'react-icons/fa'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  p: 4,
}

export const Header = () => {
  const [email, setEmail] = useState('')
  const [copy, setCopy] = useState(false)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [openSub, setOpenSub] = React.useState(false)
  const handleOpenSub = () => setOpenSub(true)
  const handleCloseSub = () => setOpenSub(false)
  const [iframeData, setIframe] = useState('')

  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    logout,
    Moralis,
  } = useMoralis()
  const buyCrypto = async () => {
    // await Moralis.initPlugins();
    //  await Moralis.Plugins.fiat.buy();
    const response = Moralis.Plugins.fiat.buy({}, { disableTriggers: true })
    response.then(function (result: any) {
      console.log(result.data)
      setIframe(result.data)
    })
  }

  const loginMetaMask = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: 'Log in using Moralis' })
        .then(function (user) {
          console.log('logged in user:', user)
          console.log(user!.get('ethAddress'))
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    handleClose()
  }

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({
        provider: 'magicLink',
        email: email,
        apiKey: 'pk_live_5BEA007082EC1A52',
        network: 'rinkeby',
      })
        .then(function (user) {
          console.log('logged in user:', user)
          console.log(user!.get('ethAddress'))
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    handleClose()
  }

  const loginAuthIO = async () => {
    try {
      if (!isAuthenticating) {
        const user = await authenticate({
          provider: 'web3Auth',
          clientId:
            'BDAyPVpKwurkZuxuMJEMu2krYK9N2dWYVPoO-ea7r4asfO3GUpDqVMXejGq7zPVUYM2nI1U3fdWKWX-KYNRGmNI',
        })
        console.log(user, 'user')
      }
    } catch (error) {
      console.log(error, 'err')
    }
    handleClose()
  }

  const loginWC = async () => {
    try {
      if (!isAuthenticating) {
        const user = await authenticate({
          provider: 'walletconnect',
          mobileLinks: [
            'rainbow',
            'metamask',
            'argent',
            'trust',
            'imtoken',
            'pillar',
          ],
        })
        console.log(user, 'user')
      }
    } catch (error) {
      console.log(error, 'err')
    }
    handleClose()
  }

  const logOut = async () => {
    await logout()
    window.location.reload()
    console.log('logged out')
  }
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <AppBar>
          <Toolbar>
            <Tabs textColor="inherit">
              <Tab label="Wallet" onClick={handleOpen} />
              <Tab label="Buy Crypto" onClick={buyCrypto} />
            </Tabs>
            {user ? (
              <><Typography sx={{ marginLeft: 'auto' }}>
                              Wallet Address :{' '}
                              {user.get('ethAddress').substring(0, 4) +
                                  '...' +
                                  user.get('ethAddress').substring(39)}
                          </Typography><CopyToClipboard
                              onCopy={() => {
                                  setCopy(true)
                                  window.alert('Wallet Address Copied!!')
                              } }
                              text={user?.get('ethAddress')}
                          >
                                  <FaCopy
                                      style={{
                                          marginLeft: '10px',
                                          fontSize: '17px',
                                          cursor: 'pointer',
                                      }} />
                              </CopyToClipboard></>
            ) : (
              ''
            )}
           
            <Button
              variant="contained"
              sx={{ marginLeft: 'auto' }}
              onClick={logOut}
              disabled={isAuthenticating}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          marginTop: '100px',
        }}
      >
        {iframeData && (
          <>
            <Button
              variant="contained"
              sx={{ marginRight: 1 }}
              onClick={() => window.location.reload()}
              disabled={isAuthenticating}
            >
              Close
            </Button>
            <iframe src={iframeData} width="350" height="650"></iframe>
          </>
        )}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modalDiv">
            <div className="modalsubDiv" onClick={loginMetaMask}>
              <img src={metmask} alt="metamask"></img>
              <Typography>MetaMask</Typography>
            </div>
            <div className="modalsubDiv" onClick={loginWC}>
              <img src={walletConnect} alt="walletConnect"></img>
              <Typography>WalletConnect</Typography>
            </div>
          </div>
          <div className="modalDiv">
            <div className="modalsubDiv" onClick={handleOpenSub}>
              <img src={magicLink} alt="magicLink"></img>
              <Typography>Moralis Magic Link</Typography>
            </div>
            <div className="modalsubDiv" onClick={loginAuthIO}>
              <img src={torus} alt="torus"></img>
              <Typography>Login AuthIO</Typography>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openSub}
        onClose={handleCloseSub}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modalSubDiv">
            <div className="modalsubDiv">
              <img src={magicLink} alt="magicLink"></img>
              <Typography>Moralis Magic Link</Typography>
            </div>
            <div
              style={{
                marginTop: '50px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ marginBottom: 1 }}
              />
              <Button variant="contained" onClick={login}>
                Login
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}
