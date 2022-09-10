import { web3 } from '@project-serum/anchor'
import { Connection } from '@solana/web3.js'
import { useWorkspace } from '@/composables'
//import bs58 from 'bs58'


const clusterUrl = process.env.VUE_APP_CLUSTER_URL
const commitment = 'confirmed'

export const sendDonation = async (amount) => {

    console.log('amount');
    console.log(amount);

    const { wallet } = useWorkspace()

    console.log('this was called');
    const connection = new Connection(clusterUrl, commitment);

//    const to = wallet.value;
//    const to2 = bs58.decode("BKTStFYc813Drfj7h3LovRPEkQGWpPaRZK19qKfLsuie");
    const to3 = new web3.PublicKey("BKTStFYc813Drfj7h3LovRPEkQGWpPaRZK19qKfLsuie");

    const transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: wallet.value.publicKey,
        toPubkey: to3,
        lamports: amount,
      }),
    );
  


    let { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet.value.publicKey;
    let signed = await wallet.value.signTransaction(transaction);
    let txid = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(txid);

}
