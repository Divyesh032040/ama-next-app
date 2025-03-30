
"use client"


import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import axios, { AxiosError } from 'axios';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { signupSchema } from '@/schemas/signUpSchema';


function SignUpForm() {

const router = useRouter()

  //different states for signup form
const [username, setUsername] = useState('');
const [usernameMessage, setUsernameMessage] = useState('');
const [isCheckingUsername, setIsCheckingUsername] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);



const { toast } = useToast();


const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
    username: '',
    email: '',
    password: '',
    },
});


  //function to check username availability 

    // useEffect(() => {
    // const checkUsernameUnique = async () => {
    //   // if (debouncedUsername.length === 0) return; 


    // setIsCheckingUsername(true);
    // setUsernameMessage('');

    // try {
    //     const response = await axios.get<ApiResponse>(`/api/check-username-unique?username=${username}`);
    //     setUsernameMessage(response.data.message);
    //     } catch (error) {
    //         const axiosError = error as AxiosError<ApiResponse>;
    //         setUsernameMessage(axiosError.response?.data.message ?? 'Error checking username');
    //     } finally {
    //         setIsCheckingUsername(false);
    //     }
    //     };
    
    //     checkUsernameUnique();
    // }, [username]);
    
        useEffect(() => {
            const handler = setTimeout(async () => {
            if (username.trim().length === 0) return;
        
            setIsCheckingUsername(true);
            setUsernameMessage('');
        
            try {
                const response = await axios.get<ApiResponse>(`/api/check-username-unique?username=${username}`);
                setUsernameMessage(response.data.message);
            } catch (error) {
                const axiosError = error as AxiosError<ApiResponse>;
                setUsernameMessage(axiosError.response?.data.message ?? 'Error checking username');
            } finally {
                setIsCheckingUsername(false);
            }
            }, 500); // Debounce of 500ms
        
            return () => clearTimeout(handler); // Cleanup function
        }, [username]);


    //function will handle onSubmit event
    const onSubmit = async (data: z.infer<typeof signupSchema>) => {
        setIsSubmitting(true);
        try {
        const response = await axios.post<ApiResponse>('/api/sign-up', data);
    
        toast({ title: 'Success', description: response.data.message });
    
        router.replace(`/verify/${data.username}`);
        } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
            title: 'Sign Up Failed',
            description: axiosError.response?.data.message || 'There was a problem with your sign-up. Please try again.',
            variant: 'destructive',
        });
        } finally {
        setIsSubmitting(false);
        }
    };
    

    return (

    <div className="flex justify-center items-center h-screen bg-gray-800 p-4">
    <div className="w-full max-w-sm p-6 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight mb-4">
            Join True Feedback
        </h1>
        <p className="text-sm text-gray-600">Sign up to start your anonymous adventure</p>
        </div>

        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
                <FormItem>
                <FormLabel>Username</FormLabel>
                <Input
                    placeholder='Username'
                    {...field}
                    onChange={(e) => {
                    field.onChange(e);
                    setUsername(e.target.value);
                    }}
                />
                {isCheckingUsername && <Loader2 className="animate-spin" />}
                {!isCheckingUsername && usernameMessage && (
                    <p className={`text-sm ${usernameMessage === 'Username is unique' ? 'text-green-500' : 'text-red-500'}`}>
                    {usernameMessage}
                    </p>
                )}
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <Input {...field} placeholder='Email'/>
                <p className='text-xs text-gray-400'>We will send you a verification code</p>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
                <FormItem>
                <FormLabel>Password</FormLabel>
                <Input type="password" {...field} placeholder='Password' />
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" className='w-full' disabled={isSubmitting}>
            {isSubmitting ? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
                </>
            ) : (
                'Sign Up'
            )}
            </Button>
        </form>
        </Form>

        

        <div className="text-center text-sm">
        <p>
            Already a member?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
            Sign in
            </Link>
        </p>
        </div>
    </div>
    </div>
    );
    
    }

export default SignUpForm










