import React, { useState } from 'react'
import { useLocation,useHistory } from 'react-router';
import styles from './styles.module.css';
import { useClipboard } from 'use-clipboard-copy';

const MemeGenerated=()=>{

    const [copid,setCopid]=useState(false)

    const location=useLocation();
    const history=useHistory();
    const clipboard=useClipboard();
    const url=new URLSearchParams(location.search).get('url');

    const copyLink=()=>{
        clipboard.copy(url);
        setCopid(true)
    }
    return (
        <div className={styles.container}>
            <button onClick={()=>history.push('/')} className={styles.home}>
                Make More Memes
            </button>
            { url && <img src={url} alt="meme"/>}

            <button onClick={copyLink} className={styles.copy}>
                {
                    copid ? 'Link copid!' : 'Copy Link'
                }
            </button>
        </div>
    )
}

export default MemeGenerated
