import {surpriseMePrompts} from '../Constants'
import Filesaver from 'file-saver';

export function getRandomPrompt(prompt){
    const randomIndex=Math.floor(Math.random()*surpriseMePrompts.length);

    const randomPrompt=surpriseMePrompts[randomIndex];

    if(randomPrompt===prompt) return getRandomPrompt(prompt); 
    {/*this is to avoid the same prompt agin and again*/ }
    {/*recalling the random prompt function again*/ }
    
    return randomPrompt;
}


export async function downloadImage(_id,photo){
    Filesaver.saveAs(photo,`download-${_id}.jpg`)
}
