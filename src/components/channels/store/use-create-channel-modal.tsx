
// modalAtom.js
import { atom, useAtom } from 'jotai';

// Atom to manage the modal's open/close state

const modalState = atom(false);

export const useCreateChannelModal = () => {
    return useAtom(modalState);
}
