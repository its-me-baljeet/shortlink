"use client";

import { useState } from 'react';
import { Check, Copy } from "lucide-react";
import { Button } from './ui/button';
import { toast } from 'sonner';

export default function CopyButton({ textToCopy }: {
    textToCopy:string;
}) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      toast.success("Link copied!");
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      disabled={isCopied}
      className='w-fit cursor-pointer'
    >
      {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      <span className="sr-only">{isCopied ? 'Copied!' : 'Copy'}</span>
    </Button>
  );
}