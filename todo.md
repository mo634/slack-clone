1.copy create modal for channel 
2.create new component folder  
 -> create new component "create-channel-modal"
        1.call hook for create modal 
        2.retrun dialog 
            -> pass open and onOpenChange as props to link with hook 
            -> dialog content 
                -> dialog header 
                    -> dialog title "add channel"
            
    
3.add component to modal.tsx for prevent hydration err then link set open to aside