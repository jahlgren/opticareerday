'use client';

import Button from "@/ui/button";
import packageJson from '@/../package.json';
import Input from "@/ui/input";
import { useForm } from "react-hook-form";
import SignInSchema, { SignInSchemaValidator } from "./sign-in-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import useSignIn from "./use-sign-in";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInView() {
  
  const [success, setSuccess] = useState(false);
  const [signInError, setSignInError] = useState('');
  const {handleSubmit, register, formState} = useForm<SignInSchema>({ resolver: yupResolver(SignInSchemaValidator) });
  const {trigger, isMutating} = useSignIn();
  const router = useRouter();

  const onSubmit = (data: SignInSchema) => {
    trigger(data, {
      onSuccess: (data) => {
        if(!data?.ok) {
          setSignInError('Fel användarnamn och/eller lösenord');
          return;
        }
        setSuccess(true);
        router.push('/');
      },
      onError: (error) => {
        console.log('error', error);
        setSignInError('Något gick fel, försök igen');
      }
    });
  }

  return (
    <div className="bg-gray-50 flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-6xl font-bold leading-9 tracking-tight text-gray-400">
          Quiz
        </h1>
        <h2 className="mt-6 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
          OptiCareer Day
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

            <Input id="username" label="Användarnamn" {...register("username")}
              error={!!formState.errors.username}
              helpText={formState.errors.username?.message}
              disabled={isMutating || success}
            />

            <Input type="password" id="password" label="Lösenord" {...register("password")}
              error={!!formState.errors.password}
              helpText={formState.errors.password?.message}
              disabled={isMutating || success}
            />

            <div className="pt-2">
              <Button type="submit" variant="primary" fullWidth loading={isMutating || success}>Logga in</Button>
            </div>
            
          </form>
        </div>
        
        <p className="mt-10 text-center text-sm text-gray-500">
          version {packageJson.version}
        </p>
      </div>
    </div>
  );
}
