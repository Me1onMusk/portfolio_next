
import type { Metadata } from "next";
import LogoutButton from "@/components/instagram/logout-button";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
    title: "인스타그램",
    description: "Generated by create next app",
};

export default async function Page() {

    const supabase = await createServerSupabaseClient();
    const { data: {session} } = await supabase.auth.getSession();

    return (
        <main className="flex flex-col items-center justify-center gap-5 w-full"> 
            <h1 className="font-bold text-xl">
                반갑습니다, { session.user.email?.split('@')?.[0] }님
            </h1>
            <LogoutButton />
        </main>
    );
};