'use client';

import { Button } from '@/components/ui/Button';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/Input';
import { useLogin } from '@/features/admin/login/hooks/useLogin';
import { IMAGES } from '@/lib/constants';
import Image from 'next/image';

export default function LoginPage() {
  const {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    handleSubmit,
  } = useLogin();

  return (
    <>
      <header className="flex h-[10vh] w-screen items-center gap-5 bg-[#01161E] text-white">
        <div className="relative aspect-square h-20">
          <Image priority fill src={IMAGES.LOGO_WHITE} alt={''} />
        </div>
        <p className="text-4xl font-bold italic">DASHBOARD</p>
      </header>
      <section className="grid h-[90vh] w-full items-center justify-items-center bg-white">
        <form
          className="h-[40%] w-[30%] rounded-2xl bg-[#102F41] p-10 text-white"
          onSubmit={handleSubmit}
        >
          <FieldSet className="flex h-full flex-col items-center justify-around">
            <FieldLegend className="text-center">
              <span className="text-4xl font-bold italic">LOGIN</span>
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                  {error}
                </div>
              )}
            </FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username" className="text-2xl font-bold">
                  Email
                </FieldLabel>
                <Input
                  className="bg-white text-black"
                  id="username"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password" className="text-2xl font-bold">
                  Password
                </FieldLabel>
                <Input
                  className="bg-white text-black"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
            </FieldGroup>
            <Button type="submit" className="bg-[#FFB024] px-8 py-2 text-2xl">
              {loading ? 'Wait a second' : 'Login'}
            </Button>
          </FieldSet>
        </form>
      </section>
    </>
  );
}
