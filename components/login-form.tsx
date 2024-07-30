import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";

interface LoginFormProps {
  loginClick: (name: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ loginClick }) => {
  const [name, setName] = useState("");
  return (
    <div className="w-full space-y-4 px-16 md:px-0 md:max-w-md content-center align-middle">
      <div className="space-y-2 py-8">
        <h2 className="text-2xl font-bold text-center py-8">🎶 Oh na na, what&rsquo;s your name? 🎶</h2>
        <Input id="name" placeholder="Your Initials"
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              console.log(name);
              loginClick(name);
            }
          }}        />
      </div>
      <Button className="w-full" onClick={() => loginClick(name)}>
        <span className="flex-1 text-center">Let&apos;s Go!</span>
      </Button>
    </div>
  )
}
