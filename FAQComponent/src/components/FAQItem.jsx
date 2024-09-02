import { useEffect, useState } from "react";

const FAQItem = ({faq,index}) => {

    const [show,setShow] = useState(false); 

    useEffect(()=>{
        if(index===0) {
            setShow(true);
        }
    },[]);

    const handleClick = () => {
        setShow((show) => !show);
    };

    return (
        <>
            <div className="faq-box">
                <div className="que">
                    <button className={show ? 'arrow' : ''} onClick={handleClick}>Q</button>
                    <div>{faq.question}</div>
                </div>
               {show && <div className="ans">{faq.answer}</div>} 
            </div>
        </>
    );
}


export default FAQItem; 