// useAmountStore.ts
import { create } from 'zustand';

interface AmountState {
    amount: number;
    wallet: number;
    balance: number;
    setAmount: (newAmount: number) => void;
    setWallet: (newAmount: number) => void;
    setBalance: (newAmount: number) => void;
    increaseAmount: (value: number) => void;
    decreaseAmount: (value: number) => void;
}

export const useAmountStore = create<AmountState>((set) => ({
    amount: 0, // Initial value
    wallet: 5000000, //Initial wallet
    balance: 1000000, // Initial Balance
    setAmount: (newAmount) => set({ amount: newAmount }),
    setWallet: (newWallet) => set({ wallet: newWallet }),
    setBalance: (newBalance) => set({ balance: newBalance }),
    increaseAmount: (value) =>
        set((state) => ({ amount: state.amount + value })),

    decreaseAmount: (value) =>
        set((state) => ({ amount: Math.max(0, state.amount - value) })), // Prevent negative values
}));
