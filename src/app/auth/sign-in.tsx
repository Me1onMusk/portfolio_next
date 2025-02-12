
'use client';

import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

interface SignInProps {
    setView: React.Dispatch<React.SetStateAction<string>>;
    path?: string;
};

// 로그인 //
export default function SignIn({ setView, path }: SignInProps) {

    const supabase = createBrowserSupabaseClient(); 
    const [ email, setEmail ] = useState(''); 
    const [ password, setPassword ] = useState(''); 
    const [session, setSession] = useState(null);
    const router = useRouter();
    
    // 카카오 로그인 인증 // 
    const signInWithKakao = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'kakao',
            options: {  //로그인 성공 후 리다이렉트될 URL
                redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL && (path === 'insta') ?
                    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/project/instagram` : 
                    `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/`
            }
        });
    }; 

    // 이메일 로그인 // 
    const signInMutation = useMutation({    
        mutationFn: (
            async () => {
                const { data, error } = await supabase
                    .auth
                    .signInWithPassword(
                        {
                            email,
                            password
                        }
                    )

                if(data) console.log(data);
                if(error) alert(error.message);
            }
        )
    });

    return (
        <div className="flex flex-col">
            <div 
                className="pt-10 pb-6 mb-5 px-10 w-full flex flex-col items-center  max-w-lg 
                    justify-center border rounded-lg border-gray-400 bg-white dark:bg-slate-800 gap-5">
                {
                    (path === 'insta') ? 
                    (
                        <>
                            <img 
                                className="w-60 mb-6 dark:hidden"
                                src={ '/logo/logo.png' } /> 
                            <img 
                                className="w-60 mb-6 hidden dark:block"
                                src={ '/logo/logo_white.png' } /> 
                            <input
                                value={email}
                                type="email" 
                                name="email"
                                onChange={ e => setEmail(e.target.value) }
                                placeholder="이메일"
                                className="w-full p-1 rounded-lg dark:bg-white border-black border text-black dark:text-black pl-2"/>
                            <input
                                value={password}
                                type="password" 
                                name="password"
                                onChange={ e => setPassword(e.target.value) }
                                placeholder="비밀번호"
                                className="w-full p-1 rounded-lg dark:bg-white border-black border text-black dark:text-black pl-2" />
                            <Link
                                className="w-full"
                                href={'/project/instagram'} >
                                <button 
                                    className="w-full text-md text-white py-1 bg-blue-500 hover:bg-blue-600 rounded-lg" 
                                    color="light-blue" 
                                    onClick={ () => signInMutation.mutate() } >
                                    로그인
                                </button>
                            </Link>
                            <img
                                className='rounded-md '
                                src={'/logo/kakao_login.png'} 
                                onClick={ () => signInWithKakao() } />
                            <div className="py-4 w-full text-center max-w-lg bg-white  dark:bg-slate-800 gap-5 rounded-lg">
                                아직 계정이 없으신가요? 
                                <button 
                                    className="text-light-blue-600 font-bold pl-2"
                                    onClick={ () => setView('SIGNUP') } >
                                    <span className="hover:text-green-600 dark:hover:text-green-600 text-green-500">가입하기</span>
                                </button>
                            </div>
                        </>
                    ) :
                    (   
                        <div className="flex flex-col items-center justify-center gap-2">
                            <p className="w-60 mb-6 justify-center items-center flex text-3xl font-bold">
                                로그인
                            </p>
                            <Auth
                                onlyThirdPartyProviders
                                redirectTo="http://localhost:3000/" 
                                supabaseClient={ supabase }
                                appearance={{
                                    // theme: customTheme,
                                    theme: ThemeSupa,
                                    variables: {
                                        default: {
                                            colors: {
                                                brand: 'rgb(33, 150, 243)',
                                                brandAccent: 'rgb(30, 136, 229)',
                                            }
                                        }
                                    },
                                    style: { 
                                        container: { width: "300px" },
                                        button: { borderRadius: "15px", border:'none' },
                                        anchor: { color: 'gray', textDecoration: 'none' },
                                        // label: { color: 'white' }
                                        divider: { color: 'red' },
                                        loader: { color: 'red' },
                                        message: { color: 'red'}
                                    },
                                }} 
                                providers={["kakao"]} 
                                localization={{
                                    variables: {
                                        sign_in: {
                                            email_label: '이메일',
                                            password_label: '비밀번호',
                                            button_label: '로그인',
                                            social_provider_text: '카카오 로그인',
                                            link_text: '이미 계정이 존재하나요? 로그인'
                                        },
                                        sign_up: {
                                            email_label: '이메일',
                                            password_label: '비밀번호',
                                            button_label: '회원가입',
                                            social_provider_text: '카카오 회원가입',
                                            link_text: '아직 계정이 없나요? 회원가입'
                                        },
                                        forgotten_password: {
                                            email_label: '이메일',
                                            link_text: '비밀번호를 잊으셨나요?'
                                        }
                                    }
                                }} />
                            <form className="flex flex-col items-center justify-center gap-2">
                                <input
                                    value={ email }
                                    type="email" 
                                    name="email"
                                    required
                                    onChange={ e => setEmail(e.target.value) }
                                    placeholder="이메일"
                                    className="w-full p-1 rounded-lg dark:bg-white border-black border text-black dark:text-black pl-2"/>
                                <input
                                    value={ password }
                                    type="password" 
                                    name="password"
                                    required
                                    onChange={ e => setPassword(e.target.value) }
                                    placeholder="비밀번호"
                                    className="w-full p-1 rounded-lg dark:bg-white border-black border text-black dark:text-black pl-2" />
                                <Link
                                    className="w-full"
                                    href={'/'}>
                                    <button 
                                        className="w-full text-md text-white py-1 bg-blue-500 hover:bg-blue-600 rounded-lg mt-5" 
                                        color="light-blue" 
                                        onClick={ () => signInMutation.mutate() }>
                                        로그인
                                    </button>
                                </Link>
                                <div className="py-4 w-full text-center max-w-lg bg-white  dark:bg-slate-800 gap-5 rounded-lg">
                                    아직 계정이 없으신가요? 
                                    <button 
                                        className="text-light-blue-600 font-bold pl-2"
                                        onClick={ () => setView('SIGNUP') } >
                                        <span className="hover:text-green-600 dark:hover:text-green-600 text-green-500">가입하기</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )
                }
            </div>
        </div>
    );
};