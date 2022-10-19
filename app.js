const songs = [   // This array stores the song details
    {   
        id:0,
        title:"On My Way",
        subtitle:"Alan Walker",
        cover:"images/singerProfile/1.jpg",
        location:"images/singerProfile/singerSongs/1.mp3"
    },
    {   
        id:1,
        title:"Faded",
        subtitle:"Alan Walker",
        cover:"images/singerProfile/2.jpg",
        location:"images/singerProfile/singerSongs/2.mp3"
    },
    {
        id:2,
        title:"Alone",
        subtitle:"Alan Walker",
        cover:"images/singerProfile/3.jpg",
        location:"images/singerProfile/singerSongs/3.mp3"
    },
    {
        id:3,
        title:"Ignite",
        subtitle:"Alan Walker",
        cover:"images/singerProfile/4.jpg",
        location:"images/singerProfile/singerSongs/4.mp3"
    },
    {
        id:4,
        title:"Darkside",
        subtitle:"Alan Walker",
        cover:"images/singerProfile/5.jpg",
        location:"images/singerProfile/singerSongs/5.mp3"
    },
    {
        id:5,
        title:"Shape Of You",
        subtitle:"Ed Sheeran",
        cover:"images/singerProfile/6.jpg",
        location:"images/singerProfile/singerSongs/6.mp3"
    },
    {
        id:6,
        title:"Dope Sope",
        subtitle:"Ed Sheeran",
        cover:"images/singerProfile/7.jpg",
        location:"images/singerProfile/singerSongs/6.mp3"
    },
    {
        id:7,
        title:"Attention",
        subtitle:"Charlie Puth",
        cover:"images/singerProfile/8.jpg",
        location:"images/singerProfile/singerSongs/8.mp3"
    },
    {
        id:8,
        title:"We don't talk!",
        subtitle:"Charlie Puth",
        cover:"images/singerProfile/9.jpg",
        location:"images/singerProfile/singerSongs/9.mp3"
    },
    {
        id:9,
        title:"Together",
        subtitle:"Marsh Mello",
        cover:"images/singerProfile/10.jpg",
        location:"images/singerProfile/singerSongs/10.mp3"
    },
]


// To add song items in side bar queue
const queue = Array.from(document.getElementsByClassName('songItems'));
queue.forEach((e,i)=>{
    // let child = e.children;
    // // child[0].textContent=songs[i]['id'];
    // child[1].firstChild.src=songs[i]['cover'];
    // child[2].textContent=songs[i]['title'];

    e.getElementsByClassName('queueSongImage')[0].firstChild.src=songs[i]['cover'];
    e.getElementsByClassName('queueSongDetails')[0].textContent=songs[i]['title'];
    console.log(i);
});




let i = 0;  // To initialize the music queue!
let music = new Audio(songs[i]['location']); // new Audio('src'); create the audio object


function changeMasterPlayCurrentSongDetails(){    // This function is used to update the song detaile in master play
    document.getElementById('songLogo').src=songs[i]['cover'];
    let title = document.getElementById('title');
    title.getElementsByTagName('h4')[0].textContent=songs[i]['title'];
    document.getElementById('subtitle').firstElementChild.textContent=songs[i]['subtitle'];
    highLightCurrentSong();
}

let queueSongs = Array.from(document.getElementsByClassName('songItems'));

function highLightCurrentSong(){
    queueSongs[i].style.backgroundColor='#0c0c2b';
}
function restorePrevSongToDefault(){
    queueSongs[i].style.backgroundColor='#01012e'
}

changeMasterPlayCurrentSongDetails();  // Making initial call to the function to set the song details in master play

let playButton = document.getElementById('playButton');
let wave = document.getElementById('wave');

let prevSong = document.getElementById('prevSong');
prevSong.addEventListener('click',()=>{     // Event Listener for prev button
    music.pause();
    restorePrevSongToDefault();
    if(i>0){   
        i--;
    } else if(i==0) {
        i=songs.length-1;
    }
    music.src=songs[i]['location'];
        
        changeMasterPlayCurrentSongDetails();
        music.play();
})

let nextSong = document.getElementById('nextSong');
nextSong.addEventListener('click',()=>{    // Event listener for next button
    music.pause();
    restorePrevSongToDefault();
    if(i<=songs.length-2){
        i++;
    } else {
        i=0;      
    }
    music.src=songs[i]['location'];
    changeMasterPlayCurrentSongDetails();
    music.play();   
})

playButton.addEventListener('click',()=>{    // Event listener for play and pause button
    if( music.paused || music.currentTime<=0){
        music.play();
        playButton.className="bi bi-pause-fill";
        wave.classList.add("active1");
        changeMasterPlayCurrentSongDetails();
    } else {
        music.pause();
        // playButton.style.color="white";
        playButton.className="bi bi-play-fill";
        wave.classList.remove("active1");
        
    }
});


let queueSongClicked = Array.from(document.getElementsByClassName('queueSongDetails'));
queueSongClicked.forEach((e)=>{
    
    e.addEventListener('click',(e)=>{
        restorePrevSongToDefault();  
        j=(e.target.previousElementSibling.previousElementSibling.textContent);
        j=JSON.stringify(j);
        
        
        if(j.charAt(1)==0){
            // i=JSON.parse(j.charAt[1]);
            j=JSON.parse(j);
            i=j%10;
            
        } else {
            j=JSON.parse(j);
            i=j;
        }
        i--;
        
        // console.log(songs[i]);
        music.pause();
            
        music.src=songs[i]['location'];   
        changeMasterPlayCurrentSongDetails();
        music.play();
        wave.classList.add("active1");
        playButton.className="bi bi-pause-fill";
    })
})

let startTime = document.getElementById('startTime');
let endTime = document.getElementById('endTime');
// Event Listener to update the end time whenever the new song is played
music.addEventListener('playing',()=>{
    let musicDuration = music.duration;
    
    let min = Math.floor(musicDuration/60);
    let sec = Math.floor(musicDuration%60);
    console.log(min,sec);
    endTime.textContent=`${min}:${sec}`;
})

// Event Listener to update the current time
music.addEventListener("timeupdate",()=>{
    let currTime = music.currentTime;
    let min = Math.floor(currTime/60);
    let sec = Math.floor(currTime%60);
    if(sec<10 ){
        sec=`${sec}0`
    }
    
    startTime.textContent=`${min}:${sec}`;
})


let seek = document.getElementById('seek');

let seekBarLine = document.getElementById('seekBarLine');
let seekBarDot = document.getElementById('seekBarDot');

music.addEventListener('timeupdate',()=>{
    let musicLength = music.duration;
    let currLength = music.currentTime;
    let currPercentage = parseInt(currLength/musicLength*100);
    // seek.value=currPercentage;
    seekBarLine.style.width=`${currPercentage}%`;
    seekBarDot.style.left=`${currPercentage}%`;
})


seek.addEventListener('click',()=>{
    console.log(seek.value);
    let musicDuration = music.duration;
    let currentTimeO = (musicDuration*seek.value)/100;
    console.log(currentTimeO);
    music.currentTime=currentTimeO;
});
seek.addEventListener('drop',()=>{
    console.log(seek.value);
    let musicDuration = music.duration;
    let currentTimeO = (musicDuration*seek.value)/100;
    console.log(currentTimeO);
    music.currentTime=currentTimeO;
});

