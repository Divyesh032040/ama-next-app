"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Loader2 } from "lucide-react";

import dayjs from 'dayjs';

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

import { Button } from './ui/button';

import { X } from "lucide-react";

import { Message } from "@/modal/User";

import { useToast } from "@/hooks/use-toast";

import axios, { AxiosError } from "axios";

import { ApiResponse } from "@/types/ApiResponse";
import { useState } from "react";


type MessageCardProps = {
    message: Message;
    onMessageDelete: (messageId: string) => void;
};



function MessageCard({message , onMessageDelete}: MessageCardProps) {

  const [isDeleteLoading , isSetDeleteLoading] = useState(false);

  const messageId = message?._id;

    const {toast} = useToast()
    
    const handleDeleteConfirm = async () => {
        try {
            isSetDeleteLoading(true);
            const response = await axios.delete<ApiResponse>(`/api/delete-message`, {
                params: { messageId },
            });
            toast({
                title: response.data.message,
            });
            onMessageDelete(message._id);
            isSetDeleteLoading(false);
        
            } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: 'Error',
                description:
                axiosError.response?.data.message ?? 'Failed to delete message',
                variant: 'destructive',
            });
            } 
        };

    return (
    <div>
      <Card className="card-bordered">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{message.content}</CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive'>
                {isDeleteLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
                ) : (<X className="w-5 h-5" />)}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="text-sm">
          {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
        </div>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
    </div>
  )
}

export default MessageCard