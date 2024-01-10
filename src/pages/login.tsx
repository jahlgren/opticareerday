import { FormEvent, useState } from "react";
import { useRouter } from 'next/router';
import Button from "../core/ui/client/components/Button";
import Input from "../core/ui/client/components/Input";
import Logo from "../core/ui/client/components/Logo";
import { toast } from 'react-toastify';
import { signIn } from "next-auth/react";

const LoginPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const router = useRouter();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if(username.length < 1 || password.length < 1) {
      toast('Användarnamnet eller lösenordet för kort', { type: 'error' });
      return;
    }

    setIsLoading(true);
    const res = await signIn('credentials', { username, password, redirect: false });
    
    if(!res || res.status === 401 || !res.ok) {
      setIsLoading(false);
      toast('Fel användarnamn eller lösenord', { type: 'error' });
      return;
    }

    router.push((router.query.callbackUrl as string) || '/admin');
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <div className="flex flex-col bg-white p-4 sm:p-6 rounded shadow w-full max-w-[400px]">
        <div className="mx-auto"><Logo title="admin" /></div>

        <h1 className="text-4xl font-light mt-8">Login</h1>

        <form onSubmit={submit}>
          <Input type="text" label="Användarnamn" className="mt-8" disabled={isLoading}
            value={username} onChange={e => setUsername(e.target.value)} />
          <Input type="password" label="Lösenord" className="mt-4" disabled={isLoading}
            value={password} onChange={e => setPassword(e.target.value)} />

          <Button type="submit" className="ml-auto mr-0 mt-8" loading={isLoading}>Logga in</Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;