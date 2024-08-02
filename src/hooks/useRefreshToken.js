import {signIn, useSession} from "next-auth/react";
import {post} from "@/core/httpClient";
import {storageKey} from "@/core/storageKey";

export const useRefreshToken = () => {
    const { data: session, update } = useSession();

    const headers = {
        Authorization: `Bearer ${session?.user?.refreshToken}`,
    };

    const refreshToken = async () => {
        const response = await post("/auth/refresh-token", {}, {headers});

        if (session && response && response.status === 200 && response.data)  {
            await update({
                ...session,
                user: {
                    ...session?.user,
                    token: response.data.token,
                    refreshToken: response.data.refreshToken
                },
            });

            sessionStorage.setItem(storageKey.TOKEN, response.data.token);
            sessionStorage.setItem(storageKey.REFRESH_TOKEN, response.data.refreshToken);

            return {token: response.data.token};
        }
        else {
            sessionStorage.removeItem(storageKey.TOKEN);
            sessionStorage.removeItem(storageKey.REFRESH_TOKEN);
            await signIn();
        }
    }
    return refreshToken;
}