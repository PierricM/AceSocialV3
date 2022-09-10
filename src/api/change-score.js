import { useWorkspace } from '@/composables'
//import { Connection } from '@solana/web3.js'
import { web3 } from '@project-serum/anchor'

//const clusterUrl = process.env.VUE_APP_CLUSTER_URL
//const commitment = 'confirmed'

export const changeScore = async (tweet) => {


//    const connection = new Connection(clusterUrl, 'confirmed');


    const {  connection, program, wallet } = useWorkspace()

    const to3 = new web3.PublicKey("H7MgKYSy53fmM9L6wGGsnK1Hiqz6CJ3SbZbhaFSPzdpr");

        const tx = await program.value.transaction.changeScore( {
        accounts: {
            tweet: tweet.publicKey,
            from: wallet.value.publicKey,
            to: to3,
            systemProgram: web3.SystemProgram.programId,
                    },
            signers: [wallet.value]


    })

    tx.feePayer = wallet.value.publicKey
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
    const signedTx = await wallet.value.signTransaction(tx)
    const txId = await connection.sendRawTransaction(signedTx.serialize())
    await connection.confirmTransaction(txId)


    console.log(typeof tweet.score);

    console.log('def');

    const new_sc = parseInt(tweet.score)+1;

    tweet.score = new_sc;

    console.log(typeof tweet.score);


//    const to3 = new web3.PublicKey("BKTStFYc813Drfj7h3LovRPEkQGWpPaRZK19qKfLsuie");
//
//
//    const transaction = new web3.Transaction().add(
//      web3.SystemProgram.transfer({
//        fromPubkey: wallet.value.publicKey,
//        toPubkey: to3,
//        lamports: 1000000000*0.0001,
//      }),
//    );



//    let { blockhash } = await connection.getLatestBlockhash();
//    transaction.recentBlockhash = blockhash;
//    transaction.feePayer = wallet.value.publicKey;
//    let signed = await wallet.value.signTransaction(transaction);
//    let txid = await connection.sendRawTransaction(signed.serialize());
//    await connection.confirmTransaction(txid);


}

export const decreaseScore = async (tweet) => {
    const {  connection, program, wallet } = useWorkspace()

//    await program.value.rpc.decreaseScore({
//        accounts: {
//            tweet: tweet.publicKey,
//                    },
//
//    })



    const to3 = new web3.PublicKey("H7MgKYSy53fmM9L6wGGsnK1Hiqz6CJ3SbZbhaFSPzdpr");

        const tx = await program.value.transaction.decreaseScore( {
        accounts: {
            tweet: tweet.publicKey,
            from: wallet.value.publicKey,
            to: to3,
            systemProgram: web3.SystemProgram.programId,
                    },
            signers: [wallet.value]


    })

    tx.feePayer = wallet.value.publicKey
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
    const signedTx = await wallet.value.signTransaction(tx)
    const txId = await connection.sendRawTransaction(signedTx.serialize())
    await connection.confirmTransaction(txId)


    console.log(typeof tweet.score);

    console.log('def');

    const new_sc = parseInt(tweet.score)-1;

    tweet.score = new_sc;

    console.log(typeof tweet.score);


}
