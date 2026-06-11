import { Client as WebClient, Databases as WebDatabases, Account as WebAccount } from 'appwrite';

const client = new WebClient();
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6a23c3cd000955db35ad');

const databases = new WebDatabases(client);
const account = new WebAccount(client);

async function run() {
    try {
        console.log("Logging in...");
        try {
            await account.createEmailPasswordSession('test@test.com', '12345678');
            console.log("Logged in successfully!");
        } catch (loginErr) {
            console.log("Login failed (already logged in or invalid):", loginErr.message);
        }

        console.log("Fetching post 'test-image-upload'...");
        const post = await databases.getDocument(
            '6a23c6a7003a98857bd8', // database ID
            'articles', // collection ID
            'test-image-upload' // document ID
        );
        console.log("Post details:", JSON.stringify(post, null, 2));
    } catch (e) {
        console.error("Error:", e);
    }
}

run();
