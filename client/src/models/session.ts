import { useMessages } from './messages';
import { reactive } from "vue";
import router from "../router";

import * as users from "../models/user";


const session = reactive({
    user: null as users.User | null,
})

export async function Login(handle: string, password: string) {
    const user = users.list.find(u => u.handle === handle);
    try{
    if (!user) {
        throw { message: "User not found" };
    }
    if(user.password !== password) {
        throw { message: "Incorrect password" };
    }

    messages.notifications.push({
        type: "success",
        message: 'welcome back $(user,firstname)!',
      });

    session.user = user;
    router.push('/messages');
} catch (error: any){
    const messages = useMessages();
    messages.notifications.push({
      type: "error",
      message: error.message,
    });
}
}
export function Logout() {
    session.user = null;
}
    
export default session;