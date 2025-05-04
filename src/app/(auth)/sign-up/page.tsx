import { signUpAction } from "@/app/actions/actions";
import { FormMessage} from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthHeader from "@/components/layout/auth-header";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function Signup({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const resolvedParams = await searchParams;
  if ('message' in resolvedParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={{ message: resolvedParams.message || '' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-lg shadow-lg">
        <AuthHeader />
        <form className="flex flex-col items-center w-full max-w-sm mx-auto">
          <h1 className="text-2xl font-medium">Sign up</h1>
          <p className="text-sm text text-foreground">
            Already have an account?{' '}
            <Link className="text-primary font-medium underline" href="/sign-in">
              Sign in
            </Link>
          </p>
          <div className="flex flex-col gap-2 w-full text-left mt-8">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="you@example.com" required />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              minLength={6}
              required
            />
            <SubmitButton formAction={signUpAction} pendingText="Signing up...">
              Sign up
            </SubmitButton>
            <FormMessage message={{ message: resolvedParams.message || '' }} />
          </div>
        </form>
        <SmtpMessage />
      </div>
    </div>
  );
}
