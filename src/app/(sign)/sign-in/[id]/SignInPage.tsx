import SignInForm from '../components/SignInForm'

const SignInPage: React.FC<{ inviteToken: string }> = ({ inviteToken }) => {  
  return <SignInForm inviteToken={inviteToken} />
}

export default SignInPage
