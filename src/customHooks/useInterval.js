import { useEffect, useRef } from "react";
export function useInterval(callback, delay){
    //Remember the latest callback.
    const savedCallback = useRef();

    useEffect(()=>{
        savedCallback.current = callback;
    },[callback]);

    //Set up the interval.
    useEffect(()=>{
        function tick(){
            savedCallback.current();
        }
        if(delay === null){
            const id = setInterval(tick, delay);
            return ()=>{
                clearInterval(id)
            }
        }
    },[callback, delay])
}