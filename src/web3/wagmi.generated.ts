import {
  useContractWrite,
  Address,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
} from 'wagmi'
import { WriteContractMode, PrepareWriteContractResult } from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Faucet
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x12F77eeA8119940CDB33f4F28C3E0302929B10D7)
 */
export const faucetABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'requestEther',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x12F77eeA8119940CDB33f4F28C3E0302929B10D7)
 */
export const faucetAddress = {
  11155111: '0x12F77eeA8119940CDB33f4F28C3E0302929B10D7',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x12F77eeA8119940CDB33f4F28C3E0302929B10D7)
 */
export const faucetConfig = { address: faucetAddress, abi: faucetABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link faucetABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x12F77eeA8119940CDB33f4F28C3E0302929B10D7)
 */
export function useFaucetWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof faucetAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof faucetABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof faucetABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof faucetABI, TFunctionName, TMode>({
    abi: faucetABI,
    address: faucetAddress[11155111],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link faucetABI}__ and `functionName` set to `"requestEther"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x12F77eeA8119940CDB33f4F28C3E0302929B10D7)
 */
export function useFaucetRequestEther<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof faucetAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof faucetABI,
          'requestEther'
        >['request']['abi'],
        'requestEther',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'requestEther'
      }
    : UseContractWriteConfig<typeof faucetABI, 'requestEther', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'requestEther'
      } = {} as any,
) {
  return useContractWrite<typeof faucetABI, 'requestEther', TMode>({
    abi: faucetABI,
    address: faucetAddress[11155111],
    functionName: 'requestEther',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link faucetABI}__ and `functionName` set to `"withdraw"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x12F77eeA8119940CDB33f4F28C3E0302929B10D7)
 */
export function useFaucetWithdraw<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof faucetAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof faucetABI,
          'withdraw'
        >['request']['abi'],
        'withdraw',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'withdraw' }
    : UseContractWriteConfig<typeof faucetABI, 'withdraw', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'withdraw'
      } = {} as any,
) {
  return useContractWrite<typeof faucetABI, 'withdraw', TMode>({
    abi: faucetABI,
    address: faucetAddress[11155111],
    functionName: 'withdraw',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link faucetABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x12F77eeA8119940CDB33f4F28C3E0302929B10D7)
 */
export function usePrepareFaucetWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof faucetABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof faucetAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: faucetABI,
    address: faucetAddress[11155111],
    ...config,
  } as UsePrepareContractWriteConfig<typeof faucetABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link faucetABI}__ and `functionName` set to `"requestEther"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x12F77eeA8119940CDB33f4F28C3E0302929B10D7)
 */
export function usePrepareFaucetRequestEther(
  config: Omit<
    UsePrepareContractWriteConfig<typeof faucetABI, 'requestEther'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof faucetAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: faucetABI,
    address: faucetAddress[11155111],
    functionName: 'requestEther',
    ...config,
  } as UsePrepareContractWriteConfig<typeof faucetABI, 'requestEther'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link faucetABI}__ and `functionName` set to `"withdraw"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x12F77eeA8119940CDB33f4F28C3E0302929B10D7)
 */
export function usePrepareFaucetWithdraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof faucetABI, 'withdraw'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof faucetAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: faucetABI,
    address: faucetAddress[11155111],
    functionName: 'withdraw',
    ...config,
  } as UsePrepareContractWriteConfig<typeof faucetABI, 'withdraw'>)
}
