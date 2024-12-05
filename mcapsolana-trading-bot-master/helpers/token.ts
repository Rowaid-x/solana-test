import { Token } from '@raydium-io/raydium-sdk';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey, Connection } from '@solana/web3.js';

export function getToken(token: string) {
  switch (token) {
    case 'WSOL': {
      return Token.WSOL;
    }
    case 'USDC': {
      return new Token(
        TOKEN_PROGRAM_ID,
        new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
        6,
        'USDC',
        'USDC',
      );
    }
    default: {
      throw new Error(`Unsupported quote mint "${token}". Supported values are USDC and WSOL`);
    }
  }
}

// Helper function to fetch token supply
export async function getTokenSupply(tokenMint: PublicKey): Promise<number> {
  const connection = new Connection('https://api.mainnet-beta.solana.com');
  const supplyInfo = await connection.getTokenSupply(tokenMint);
  return supplyInfo.value.uiAmount || 0;
}

// Helper function to fetch token price
export async function getTokenPrice(tokenMint: PublicKey): Promise<number> {
  // Replace with actual API call or blockchain logic to get token price
  if (tokenMint.toBase58() === 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v') {
    return 1.0; // USDC price is $1.0
  }
  if (tokenMint.toBase58() === 'So11111111111111111111111111111111111111112') {
    return 20.0; // Example price for WSOL
  }
  throw new Error(`Price not available for token mint ${tokenMint.toBase58()}`);
}
