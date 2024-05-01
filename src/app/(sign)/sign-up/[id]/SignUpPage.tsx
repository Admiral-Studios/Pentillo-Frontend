import SignUpForm from "../components/SignUpForm"

const SignUpPage: React.FC<{ inviteToken: string }> = ({ inviteToken }) => {
  return <SignUpForm inviteToken={inviteToken}/>
}

export default SignUpPage
