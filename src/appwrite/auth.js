import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client;
    account;


    constructor(){  // to avoid any dependency injection issues, we are using a singleton pattern.
        // constructor is used for initializing the client and account 
        // whenever we create a new instance of this class.

        // We are setting the endpoint and project id for the client.
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        // We are creating a new account and setting the client for it.
        this.account = new Account(this.client);
    }

    // to avoid any dependency injection issues, we are using a singleton pattern.
    // This is done by creating a function/method that returns the same instance every time.

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                // Automatically log the user in after registration
                return this.login({email, password});
            } else {
                return userAccount;
            }
            
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession({email, password});
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
    

}

const authService = new AuthService();


export default authService