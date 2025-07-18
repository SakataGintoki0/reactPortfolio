'use client';

import { Button } from '@/components/ui/button';
import { useState, FormEvent, ChangeEvent } from 'react';

export default function BrowserApp() {
  const [input, setInput] = useState<string>('https://wikipedia.com');
  const [url, setUrl] = useState<string>('https://wikipedia.com');
  const [error, setError] = useState<string | null>(null);

  const isProbablyURL = (text: string): boolean => {
    try {
      new URL(text.startsWith('http') ? text : 'https://' + text);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalInput = input.trim();

    if (isProbablyURL(finalInput)) {
      const fixedUrl = finalInput.startsWith('http')
        ? finalInput
        : 'https://' + finalInput;
      setUrl(fixedUrl);
      setError(null); // clear any previous error
    } else {
      setError('Please enter a valid URL like "example.com" or "https://..."');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setError(null); // clear error while typing
  };

  return (
    <div className='h-[75vh] w-[80vw] flex flex-col bg-[var(--window-bg)] text-white'>
      <form
        onSubmit={handleSubmit}
        className='p-2 bg-[var(--widnow-bg)] flex gap-2 items-center'
      >
        <input
          value={input}
          onChange={handleInputChange}
          placeholder='Enter a valid URL (e.g., example.com)'
          className='flex-grow p-2 rounded border border-[var(--border)] bg-[var(--panel-bg)] text-[var(--text-primary)] placeholder:text-[var(--text-primary)]'
        />
        <Button
          size='lg'
          type='submit'
          className='bg-blue-600 hover:bg-blue-500 text-white'
        >
          Go
        </Button>
      </form>

      {error && (
        <div className='text-red-500 text-sm px-4 py-1 bg-zinc-800 border-t border-zinc-700'>
          {error}
        </div>
      )}

      <iframe
        src={url}
        title='Smart Browser'
        className='flex-grow w-full border-0'
        sandbox='allow-scripts allow-same-origin allow-forms allow-popups'
      />
    </div>
  );
}
