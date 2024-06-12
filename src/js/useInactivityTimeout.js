import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const useInactivityTimeout = (timeout = 3 * 60 * 1000) => {
    const navigate = useNavigate();
    let timeoutID;

    const clearLocalStorage = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/signin');
    };

    const startTimer = () => {
        timeoutID = setTimeout(clearLocalStorage, timeout);
    };

    const resetTimer = () => {
        clearTimeout(timeoutID);
        startTimer();
    };

    useEffect(() => {
        const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
        events.forEach(event => {
            document.addEventListener(event, resetTimer);
        });

        startTimer();

        return () => {
            events.forEach(event => {
                document.removeEventListener(event, resetTimer);
            });
            clearTimeout(timeoutID);
        };
    }, []); 

    return resetTimer;
};

export default useInactivityTimeout;
