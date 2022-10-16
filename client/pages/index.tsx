import type { NextPage } from 'next'
import Login from './login'
import bkd from '../styles/space.jpg'

const mystyle= {
    backgroundImage: `url(${bkd.src})`,
    backgroundSize:'130%',
    width: '100%',
    height: '100%',
    Animation:'backgroundAnimation',
  }

const Home: NextPage = () => {
  return (
    <body style={mystyle}>
      <Login/>
    </body>
  )
}

export default Home
