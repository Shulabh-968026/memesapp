import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import styles from './styles.module.css';
const Meme=()=> {

    const [memes,setMemes]=useState([])
    const [memeIndex,setMemeIndex]=useState(0)
    const [caption,setCaption]=useState([])

    const history=useHistory();

    const updateCaption=(e,index)=>{
        const text=e.target.value || '';
        setCaption(
            caption.map((c,i)=>{
                if(index===i){
                    return text;
                }else{
                    return c;
                }
            })
        )
    }

    const generateMemes=()=>{
        const currentMeme=memes[memeIndex];
        const formData=new FormData();
        formData.append('username','shulabh');
        formData.append('password','V3Sk#i7&kS6#NE.');
        formData.append('template_id',currentMeme.id);
        caption.forEach((c,index)=>formData.append(`boxes[${index}][text]`,c));
        fetch('https://api.imgflip.com/caption_image',{
            method:"POST",
            body:formData
        }).then((res)=>{
            res.json().then(res=>{
                history.push(`/generated?url=${res.data.url}`);
            })
        });

    }

    useEffect(()=>{
        fetch('https://api.imgflip.com/get_memes').then((res)=>
        res.json().then(res=>{
            console.log(res)
            const _memes=res.data.memes;
            shuffleMemes(_memes)
            setMemes(_memes)
        }))
    },[])

    const shuffleMemes = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * i);
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      };

    useEffect(()=>{
        if(memes.length){
            setCaption(Array(memes[memeIndex].box_count).fill(''));
        }
    },[memeIndex,memes])

    useEffect(()=>{
        console.log(caption)
    },[caption])

    return (
        <div>
            {
                memes.length ?
                    <div className={styles.container}>
                        <button onClick={generateMemes} className={styles.generate}>Generate</button>
                        <button onClick={()=>setMemeIndex(memeIndex+1)} className={styles.skip}>Skip</button>
                        {
                            caption.map((c,index)=>(
                                <input onChange={(e)=>updateCaption(e,index)} key={index}/>
                            ))
                        }
                        <img src={memes[memeIndex].url} alt="memes"/>
                    </div>                     
                    : <></>
            }
        </div>
    )
}

export default Meme
