// import { SignIn } from '@clerk/nextjs';
import { Sign } from 'crypto';

// const Signin = () => {
//   console.log('SIGN IN PAGE RENDERED');
//   return <Signin />;
//   // return <SignIn afterSignInUrl="/callback" />;
// };
// export default Signin;

// export default function SignInPage() {
//   return (
//     <div className="text-center">
//       <h1 className="text-2xl font-bold mb-4">Sign In</h1>
//       <p>Login to continue</p>
//     </div>
//   );
// }

import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex items-center justify-center w-full">
      <SignIn afterSignInUrl="/callback" />
    </div>
  );
}
