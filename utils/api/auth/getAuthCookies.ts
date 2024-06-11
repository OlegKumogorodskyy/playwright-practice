import { correctEmail, correctPassword } from "../../../test-data/credentials";
import createAuthCookies from "./createAuthCookies";



export default async function getAuthCookies(email: string, password: string) {

    const sid = await createAuthCookies(email, password);
    return { 'Cookie': `sid=${sid}` };

}