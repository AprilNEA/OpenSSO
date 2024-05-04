'use client'

// import { Icons } from '@/components/icons'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/utils/trpc'

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { trigger } = api.user.createUser.useSWRMutation()

  const register = async () => {
    await trigger({ email, password })
    router.push('/')
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>Enter your email below to sign in</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">
              Or continue with
            </span>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline">
              {/*<Icons.gitHub className="mr-2 h-4 w-4" />*/}
              Github
            </Button>
            <Button variant="outline">
              {/*<Icons.google className="mr-2 h-4 w-4" />*/}
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={register} className="w-full">
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
