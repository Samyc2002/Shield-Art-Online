import type { NextPage } from 'next'

const Login: NextPage = () => {
  return (
    <div className={'box'}>
        <div className={'form'}>
            <h2>Sign-in</h2>
            <div className={'inputBox'}>
                <input type={'text'} required/>
                <span>Username</span>
                <i/>
            </div>
            <div className={'inputBox'}>
                <input type={'password'} required/>
                <span>Password</span>
                <i/>
            </div>
            <div className={'links'}>
                <a href="#">Forgot password?</a>
                <a href="#">Sign-up</a>
            </div>
            <input type={"submit"} value={"Login"}/>
        </div>
        
    </div>
  )
}

export default Login
