/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useCallback, useEffect, useState } from "react";
import { Message as UserMessage } from "@/modal/User";
import { useToast } from "@/hooks/use-toast";
import {useSession} from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod";
import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { User } from "next-auth";
import { Button } from '@/components/ui/button';
import MessageCard from "@/components/MessageCard";
import { Info, Loader2, RefreshCcw } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"



function Dashboard() {

  const [messages , setMessages] = useState<UserMessage[]>([]);
  const [isLoading , setIsLoading] = useState(false);
  const [isSwitchLoading , setIsSwitchLoading] = useState(false);
  
  const {toast} = useToast();

  const handleDeleteMessage = async (messageId: string) => {
    setMessages((message) => message.filter((msg)=>msg._id !== messageId))
  }

  const {data: session} = useSession();    //get session

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema)
  })

  const {watch , register , setValue } = form; //destructure the form methods

  const acceptMessages = watch("acceptMessages"); //watch the acceptMessages field


  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>('/api/accept-message');
      if (response.data && response.data.isAcceptingMessages !== undefined) {
        setValue('acceptMessages', response.data.isAcceptingMessages);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data?.message || "Failed to fetch message settings";
  
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]); 


  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<ApiResponse>('/api/get-message');
        setMessages(response.data.messages || []);
        if (refresh) {
          toast({
            title: 'Refreshed Messages',
            description: 'Showing latest messages',
          });
        }
      } catch (error) {
      
        const axiosError = error as AxiosError<ApiResponse>;
        console.log(axiosError)
        toast({
          title: 'Error',
          description:
            axiosError.response?.data.message ?? 'Failed to fetch messages',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages, toast]
  );



   // Fetch initial state from the server
  useEffect(() => {
    if (!session || !session.user) return;

    fetchMessages();

    fetchAcceptMessages();
  }, [session, setValue, fetchAcceptMessages, fetchMessages]);
  

  //handle switch change

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accept-message', {
        acceptMessages: !acceptMessages,
      });
      setValue('acceptMessages', !acceptMessages);
      toast({
        title: response.data.message,
        variant: 'default',
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ??
          'Failed to update message settings',
        variant: 'destructive',
      });
    }
  };


  if (!session || !session.user) {
    return <div></div>;
  }

  const { username } = session.user as User;

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: 'URL Copied!',
      description: 'Profile URL has been copied to clipboard.',
    });
  };




  return (


    <div className="my-8 mx-auto px-4 sm:px-6 lg:px-8 p-6 bg-whit shadow-lg rounded-xl w-full max-w-6xl">
  <h1 className="text-4xl font-bold mb-6 mt-4">Dashboard</h1>

  <div className="mb-6">
    <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>
    <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
      <input
        type="text"
        value={profileUrl}
        disabled
        className="input input-bordered w-full p-2"
      />
      <Button className="px-4 py-2" onClick={copyToClipboard}>Copy</Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost">
            <Info className="h-5 w-5" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Public Messaging App Guide</AlertDialogTitle>
            <AlertDialogDescription>
              Sign up, get your public link, and share it. Control messaging preferences, check inbox, and reply if allowed. Send messages by clicking a user’s link, typing, and sending. Manage privacy by blocking users or enabling/disabling anonymous messages. Enjoy safe and controlled messaging!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Explore</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>

  <div className="mb-4 flex items-center gap-2">
    <Switch
      {...register('acceptMessages')}
      checked={acceptMessages}
      onCheckedChange={handleSwitchChange}
      disabled={isSwitchLoading}
    />
    <span className="text-gray-700">Accept Messages: {acceptMessages ? 'On' : 'Off'}</span>
  </div>

  <Separator />

  <Button className="mt-4" variant="outline" onClick={(e) => {
    e.preventDefault();
    fetchMessages(true);
  }}>
    {isLoading ? (
      <Loader2 className="h-4 w-4 animate-spin" />
    ) : (
      <RefreshCcw className="h-4 w-4" />
    )}
  </Button>

  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {messages.length > 0 ? (
      messages.map((message) => (
        <MessageCard
          key={message._id as string}
          message={message}
          onMessageDelete={handleDeleteMessage}
        />
      ))
    ) : (
      <div className="col-span-full text-center text-gray-500">
        No messages to display.
      </div>
    )}
  </div>
</div>

    
  )
}

export default Dashboard


