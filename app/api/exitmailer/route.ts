import { EmailTemplate } from "@/components/EmailTemplate";
import { getAuth } from "@clerk/nextjs/server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const user = await getAuth(req);
        const data = await req.json();

        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/withdraw`, {
            ext_id: user.userId,
        });

        console.log(res.data);

        // await resend.emails.send({
        //     to: res.data.emails[i],
        //     subject: "Profit Deposit Confirmation",
        //     react: await EmailTemplate({ firstName: res.data.first[i], startupName: res.data.startup_name[i] }),
        // });

        return NextResponse.json({ status: 201 });
    }
    catch (error) {
        console.error("Stripe session creation failed:", error);
        return NextResponse.json(
            {
                message: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}