
export function downloadSession(bytes) {
    const url = URL.createObjectURL(new Blob([bytes], {type:'application/octet-stream'}));

    const a = document.createElement('a'); a.href=url; a.download='session.session';
    document.body.append(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),10000);
}
export function chooseSession() {
    return new Promise((resolve,reject)=> {
        const input=document.createElement('input'); input.type='file'; input.accept='.session';
        input.oncancel=()=>resolve(null);
        input.onchange=async()=>{try {const file=input.files[0]; if(!file){resolve(null);return;}
            if(file.size>512*1024*1024)throw Error('Session exceeds the 512 MiB file limit');
            resolve(new Uint8Array(await file.arrayBuffer()));}catch(e){reject(e);}};
        input.click();
    });
}
