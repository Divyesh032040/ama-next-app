    'use client';

    import { useState, useRef, KeyboardEvent } from 'react';
    import { useRouter } from 'next/navigation';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { useToast } from "@/hooks/use-toast"
    import axios , {AxiosError} from 'axios'
    import { useParams } from 'next/navigation';
    import { ApiResponse } from '@/types/ApiResponse';

    export default function VerifyAccount() {


    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();
    const params = useParams();
    const {toast} = useToast();


    const handleChange = (index: number, value: string) => {

        if (/[^0-9]/.test(value)) return; // Only allow numbers
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        
        // Move to next input field
        if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
        }
    };


    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        }
    };

    
    const handleSubmit = async () => {
        // Ensure code is fully entered
        if (code.some((digit) => digit === '')) {
            toast({
                title: 'Verify Fail',
                description: 'Please enter the full verification code.',
                variant: 'destructive',
            });
            setCode(['', '', '', '', '', '']); // Reset the code
            return;
        }
    
        // Ensure username is available
        if (!params?.username) {
            toast({
                title: 'Error',
                description: 'Username is missing. Please try again.',
                variant: 'destructive',
            });
            return;
        }
    
        setLoading(true);
        try {
            // Convert array of digits into a single string
            const verificationCode = code.join('');
    
            console.log('Sending:', params.username, verificationCode);
    
            const response = await axios.post<ApiResponse>('/api/verify-code', {
                username: params.username,
                code: verificationCode, // Send as string
            });
    
            toast({
                title: 'Success',
                description: response.data.message,
                variant: 'default',
            });
    
            router.replace('/dashboard'); // Redirect user after success
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            console.error('Error verifying code:', error);
    
            toast({
                title: 'Verify Fail',
                description:
                    axiosError.response?.data.message ?? 'An error occurred. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    
    return (
        <div className="flex flex-col items-center justify-center h-screen px-4 bg-gray-800">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4">Enter Verification Code</h2>
            <p className="text-gray-500 mb-6">We sent a 6-digit code to your email.</p>
            
            <div className="flex justify-center gap-2 mb-6">
            {code.map((digit, index) => (
                <Input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
            ))}
            </div>

            <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? 'Verifying...' : 'Verify'}
            </Button>
        </div>
        </div>
    );
    }

