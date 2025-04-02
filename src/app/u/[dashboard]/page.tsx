'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';




import { useCompletion } from 'ai/react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { messageSchema } from '@/schemas/messageSchema';
import { usePathname } from 'next/navigation';

const specialChar = '||';

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const pathname = usePathname();
  const username = pathname.split('/').pop(); // Extracts username from "/u/username"
  

  const [suggestedMessages, setSuggestedMessages] = useState<string[]>(parseStringMessages(initialMessageString));
  const [isMessageComing, setIsMessageComing] = useState(false);




  const {toast} = useToast();

  const {
    // complete,
    // completion,
    // isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: '/api/suggest-messages',
    initialCompletion: initialMessageString,
  });

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch('content');

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  const [isLoading, setIsLoading] = useState(false);


  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);

    


    // Get the message content explicitly
    const content = form.getValues("content");

    if (!content.trim()) {
      toast({
        title: 'Error',
        description: 'Message content cannot be empty!',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        ...data,
        username,
        content
      });

      toast({
        title: response.data.message,
        variant: 'default',
      });
      form.reset({ ...form.getValues(), content: '' });


    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to sent message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };



  const fetchSuggestedMessages = async () => {
    setIsMessageComing(true);
    try {
      // const response = await axios.post<ApiResponse>('/api/suggest-message');
      // if (response.data.message) {
      //   const suggestedMessages = parseStringMessages(response.data.message);
      //   setSuggestedMessages(suggestedMessages);
      // }

      const response = await axios.post<ApiResponse>('/api/suggest-message');
      if (response.data.message) {
        const newMessages = parseStringMessages(response.data.message);
        setSuggestedMessages(newMessages); // Replace default messages with fetched ones
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch suggested messages',
        variant: 'destructive',
      });
    } finally {
      setIsMessageComing(false);
    }
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Public Profile Link
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading || !messageContent}>
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="space-y-4 my-8">
        <div className="space-y-2">
        <Button
          onClick={fetchSuggestedMessages}
          className="my-4"
          disabled={isMessageComing}
        >
          {isMessageComing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Messages Fetching...
            </>
          ) : (
            'Suggest Messages (AI)'
          )}
        </Button>

          <p>Click on any message below to select it.</p>
        </div>


<Card className="shadow-lg border rounded-xl">
  <CardHeader className="bg-gray-100 rounded-t-xl px-4 py-3">
    <h3 className="text-xl font-semibold text-gray-800">Messages</h3>
  </CardHeader>
  <CardContent className="flex flex-col space-y-3 max-h-[250px] overflow-y-auto p-4">
    {error ? (
      <p className="text-red-500 text-center">⚠️ {error.message}</p>
    ) : suggestedMessages.length > 0 ? (
      suggestedMessages.map((message, index) => (
        <Button
          key={index}
          variant="outline"
          className="break-words whitespace-normal text-left w-full h-auto 
                      px-4 py-2 border border-gray-300 rounded-lg bg-white 
                      hover:bg-gray-100 transition duration-300"
          onClick={() => handleMessageClick(message)}
        >
          {message}
        </Button>
      ))
    ) : (
      <p className="text-gray-500 text-center">No messages yet.</p>
    )}
  </CardContent>
</Card>



      </div>
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href={'/sign-up'}>
          <Button>Create Your Account</Button>
        </Link>
      </div>
    </div>
  );
}
